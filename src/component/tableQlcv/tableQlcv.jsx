import React from 'react';
import { Table, Tag, Button } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import moment from 'moment';
import CreateCvd from '../modal/createCvd';
import DeleteModal from '../modal/deleteCvd';
import DetailCvd from '../modal/detailCvd';
import UpdateModal from '../modal/updataCvd';
import FinishModal from '../modal/finish';
import style from './tableCvd.module.scss';
import ExportExcel from '../exportExcel/exportExcel';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

const loaiCv = [
  'Thông tư',
  'Chỉ thị',
  'Quyết định',
  'Quy định',
  'Kết luận',
  'Kế hoạch',
  'Báo cáo',
  'Thông báo',
  'Công văn',
  'Thông tin',
  'Nghi quyết',
  'Thư mời',
  'Chương trình',
  'Hướng dẫn',
];
const trangThai = [
  'Mới',
  'Đã xem',
  'Đề xuất hoàn tất',
  'Từ chối đề xuất',
  'Hoàn thành',
  'Hết hạn',
];
const colorTrangthai = [
  'default',
  'default',
  'processing',
  'warning',
  'success',
  'error',
];

function TableCVD() {
  const [load, setload] = useState(true);
  const cvd = useSelector((state) => state.cvdList);
  const usersList = useSelector((state) => state.usersList);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch({ type: 'LOAD_QLCV_LIST', payload: { page: 1, limit: 15 } });
    setload(false);
  }, []);
  // for modal detail
  const [Open, setOpen] = React.useState(false);
  const closeModal = () => {
    setOpen(false);
  };
  //
  const filterNth = usersList.map((e, i) => {
    return { text: `${e.lastname} ${e.firstname}`, value: e._id };
  });
  const filterLoai = loaiCv.map((e, i) => {
    return { text: e, value: i };
  });
  const filterTrangThai = trangThai.map((e, i) => {
    return { text: e, value: i };
  });
  const columns = [
    // {
    //   title: 'id',
    //   dataIndex: '_id',
    //   key: '_id',
    //   width: '0px',
    //   className: style.hiddenID,
    //   ellipsis: true,
    //   render: () => {
    //     return '';
    //   },
    // },
    {
      title: 'Stt',
      dataIndex: 'stt',
      key: 'stt',
      width: '4em',
      ellipsis: true,
      sorter: true,
    },
    {
      title: 'Số',
      dataIndex: 'sovb',
      key: 'sovb',
      width: '4em',
      ellipsis: true,
      sorter: true,
    },
    {
      title: 'Loại',
      dataIndex: 'loaivb',
      key: 'loaivb',
      width: '6.5em',
      ellipsis: true,
      render: (text, record, index) => {
        return loaiCv[text];
      },
      filters: filterLoai,
      onFilter: (value, record) => record.loaivb === value,
      filterMultiple: false,
    },
    {
      title: 'Đơn vị gửi',
      dataIndex: 'donvigui',
      key: 'donvigui',
      ellipsis: true,
    },
    {
      title: 'Ngày đến',
      dataIndex: 'ngayden',
      key: 'ngayden',
      ellipsis: true,
      render: (text, record, index) => {
        return moment(text).format('DD/MM/YYYY');
      },
      sorter: true,
      width: '6.5em',
    },
    {
      title: 'Nội dung',
      dataIndex: 'noidungvb',
      key: 'noidungvb',
      ellipsis: true,
    },
    {
      title: 'Nội dung bút phê',
      dataIndex: 'noidungbutphe',
      key: 'noidungbutphe',
      ellipsis: true,
    },
    {
      title: 'Người thực hiện',
      dataIndex: 'nguoithuchien',
      key: 'nguoithuchien',
      ellipsis: true,
      width: '9.75em',
      filters: filterNth,
      onFilter: (value, record) => true,
      filterMultiple: false,
      render: (text, record, index) => {
        if (usersList.length === 0) {
          return '';
        }
        let arrayNth = [];
        record.nguoithuchien.forEach((element) => {
          const nth = usersList.filter((v) => v._id === element);
          if (nth.length === 1) {
            arrayNth.push(`${nth[0].lastname} ${nth[0].firstname}`);
          }
        });
        return arrayNth.toString();
      },
    },
    {
      title: 'Người thực hiện chính',
      dataIndex: 'nguoithuchienchinh',
      key: 'nguoithuchienchinh',
      ellipsis: true,
      width: '12.5em',
      filters: filterNth,
      onFilter: (value, record) => true,
      filterMultiple: false,
      render: (text, record, index) => {
        if (usersList.length === 0) {
          return '';
        }
        const nthc = usersList.filter(
          (v) => v._id === record.nguoithuchienchinh
        );
        return nthc[0].lastname + ' ' + nthc[0].firstname;
      },
    },
    {
      title: 'Thời hạn',
      dataIndex: 'thoihan',
      key: 'thoihan',
      ellipsis: true,
      width: '6.5em',
      render: (text, record, index) => {
        return text ? moment(text).format('DD/MM/YYYY') : '';
      },
      sorter: true,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'trangthai',
      key: 'trangthai',
      ellipsis: true,
      width: '8.5em',
      render: (text, record, index) => {
        return <Tag color={colorTrangthai[text]}>{trangThai[text]}</Tag>;
      },
      filters: filterTrangThai,
      onFilter: (value, record) => record.trangthai === value,
      filterMultiple: false,
    },
    {
      title: 'Action',
      key: 'action',
      ellipsis: true,
      width: '6.5em',
      render: (text, record, index) => {
        return (
          <>
            {record.trangthai < 2 ? (
              <>
                <UpdateModal id={record._id} />
                <DeleteModal id={record._id} />
              </>
            ) : (
              <>
                <Button
                  type="link"
                  icon={<EditOutlined />}
                  size="small"
                  disabled={true}
                />
                <Button
                  type="link"
                  icon={<DeleteOutlined />}
                  size="small"
                  disabled={true}
                />
              </>
            )}
            {record.trangthai === 2 || record.trangthai === 3 ? (
              <>
                <FinishModal id={record._id} />
              </>
            ) : (
              <>
                <Button
                  type="link"
                  icon={<CheckCircleOutlined />}
                  size="small"
                  disabled={true}
                />
              </>
            )}
          </>
        );
      },
    },
  ];

  return (
    <>
      <div className={style.title}>
        Quản lý công việc
        <div>
          {/* <CreateCvd /> */}
          <ExportExcel list={cvd.data} style={{ marginLeft: '10px' }} />
        </div>
      </div>
      <DetailCvd id={Open} Open={Open} closeModal={closeModal} />
      <Table
        rowClassName={(record, index) => {
          return record.notification && record.notification === 3
            ? style.noti
            : '';
        }}
        onRow={(record, rowIndex) => {
          return {
            onDoubleClick: (event) => {
              setOpen(record._id);
            },
            onClick: (event) => {
              dispatch({
                type: 'UPDATE_CVD',
                payload: { id: record._id, data: { notification: 2 } },
              });
              if (record.notification === 3) {
                dispatch({
                  type: 'NOTI_QLCV_REMOVE_ONE',
                });
              }
            },
          };
        }}
        loading={load}
        dataSource={cvd.data}
        columns={columns}
        size="small"
        scroll={{ y: 'calc(100vh - 245px)' }}
        bordered
        rowKey="_id"
        onChange={(pagination, filters, sorter) => {
          const Filters = `${
            filters.trangthai ? '&trangthai=' + filters.trangthai : ''
          }${filters.loaivb ? '&loaivb=' + filters.loaivb : ''}${
            filters.nguoithuchien
              ? '&nguoithuchien=' + filters.nguoithuchien
              : ''
          }${
            filters.nguoithuchienchinh
              ? '&nguoithuchienchinh=' + filters.nguoithuchienchinh
              : ''
          }`;
          const Sorter = `${
            sorter
              ? '&' +
                sorter.field +
                '=' +
                (sorter.order === 'ascend' ? 'asc' : 'desc')
              : ''
          }`;
          dispatch({
            type: 'LOAD_QLCV_LIST',
            payload: {
              page: pagination.current,
              limit: pagination.pageSize,
              filters: Filters,
              sorter: Sorter,
            },
          });
        }}
        pagination={{
          defaultPageSize: 15,
          position: ['bottomCenter'],
          total: cvd.pagination ? cvd.pagination.total : 0,
          pageSizeOptions: [5, 10, 15, 50, 100, Infinity],
          showLessItems: true,
          showSizeChanger: true,
          onChange: (page, pageSize) => {
            // console.log('page: ', page, ' pageSize: ', pageSize);
            // dispatch({
            //   type: 'LOAD_QLCV_LIST',
            //   payload: { page: page, limit: pageSize },
            // });
          },
          onShowSizeChange: (current, size) => {
            // console.log('current: ', current, ' size: ', size);
            // dispatch({
            //   type: 'LOAD_QLCV_LIST',
            //   payload: { page: 1, limit: size },
            // });
          },
        }}
      />
    </>
  );
}

export default TableCVD;
