import React from 'react';
import { Table, Tag, Button } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import DeXuatHoanTat from '../modal/dexuathoantat';
import DetailCvd from '../modal/detailCvd';
import style from './tableCvd.module.scss';
import { useSelector, useDispatch } from 'react-redux';

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
  const cvd = useSelector((state) => state.cvdList);
  const usersList = useSelector((state) => state.usersList);
  const userInfo = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch({
      type: 'GUEST_LOAD_CVD_LIST',
      payload: {
        page: 1,
        limit: 15,
        id: userInfo._id,
        filters: '',
        sorter: '',
      },
    });
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
    //   ellipsis: true,
    //   className: style.hiddenID,
    //   width: '0px',
    //   render: () => {
    //     return '';
    //   },
    // },
    // {
    //   title: 'Stt',
    //   dataIndex: 'stt',
    //   key: 'stt',
    //   ellipsis: true,
    //   width: '4em',
    //   sorter: true,
    // },
    {
      title: 'Số',
      dataIndex: 'sovb',
      key: 'sovb',
      ellipsis: true,
      width: '4em',
      sorter: true,
    },
    {
      title: 'Loại',
      dataIndex: 'loaivb',
      key: 'loaivb',
      ellipsis: true,
      width: '6.5em',
      filters: filterLoai,
      filterMultiple: false,
      render: (text, record, index) => {
        return loaiCv[text];
      },
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
      filterMultiple: false,
      onFilter: (value, record) => true,
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
      sorter: true,
      render: (text, record, index) => {
        return text ? moment(text).format('DD/MM/YYYY') : '';
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'trangthai',
      key: 'trangthai',
      ellipsis: true,
      render: (text, record, index) => {
        return <Tag color={colorTrangthai[text]}>{trangThai[text]}</Tag>;
      },
      width: '8.5em',
      filters: filterTrangThai,
      onFilter: (value, record) => record.trangthai === value,
      filterMultiple: false,
    },
    {
      title: 'Action',
      key: 'trangthai',
      ellipsis: true,
      width: '4.25em',
      render: (text, record, index) => {
        return (
          <>
            {(record.trangthai < 2 || record.trangthai === 3) &&
            record.thoihan &&
            record.nguoithuchienchinh === userInfo._id ? (
              <DeXuatHoanTat id={record._id} />
            ) : (
              <Button
                type="link"
                icon={<CheckCircleOutlined />}
                size="small"
                disabled={true}
              />
            )}
          </>
        );
      },
    },
  ];

  return (
    <>
      <div className={style.title}>Quản lý công văn đến</div>
      <DetailCvd id={Open} Open={Open} closeModal={closeModal} />
      <Table
        rowClassName={(record, index) => {
          return record.notification ? style.noti : '';
        }}
        onRow={(record, rowIndex) => {
          return {
            onDoubleClick: (event) => {
              setOpen(record._id);
            },
            onClick: (event) => {
              if (record.notification) {
                dispatch({
                  type: 'UPDATE_CVD',
                  payload: {
                    id: record._id,
                    data: { notification: 'false' },
                  },
                });
                // dispatch({
                //   type: 'NOTI_GUEST_REMOVE_ONE',
                // });
              }
            },
          };
        }}
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
            type: 'GUEST_LOAD_CVD_LIST',
            payload: {
              page: pagination.current,
              limit: pagination.pageSize,
              id: userInfo._id,
              filters: Filters,
              sorter: Sorter,
            },
          });
        }}
        pagination={{
          defaultPageSize: 15,
          position: ['bottomCenter'],
          total: cvd.pagination ? cvd.pagination.total : 0,
          pageSizeOptions: [5, 10, 15, 50, 100],
          showLessItems: true,
          showSizeChanger: true,
          onChange: (page, pageSize) => {
            // console.log('page: ', page, ' pageSize: ', pageSize);
            // dispatch({
            //   type: 'GUEST_LOAD_CVD_LIST',
            //   payload: { page: page, limit: pageSize, id: userInfo._id },
            // });
          },
          onShowSizeChange: (current, size) => {
            // console.log('current: ', current, ' size: ', size);
            // dispatch({
            //   type: 'GUEST_LOAD_CVD_LIST',
            //   payload: { page: 1, limit: size, id: userInfo._id },
            // });
          },
        }}
      />
    </>
  );
}

export default React.memo(TableCVD);
