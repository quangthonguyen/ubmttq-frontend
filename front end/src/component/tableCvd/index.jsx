import React from 'react';
import { Table } from 'antd';
import moment from 'moment';
import CreateCvd from '../modal/createCvd';
import DeleteModal from '../modal/deleteCvd';
import DetailCvd from '../modal/detailCvd';
import UpdateModal from '../modal/updataCvd';
import style from './tableCvd.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import Test from '../exportExcel/exportExcel';

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
const trangThai = ['Đã gửi', 'Đã xem', 'Hoàn thành'];

function TableCVD() {
  const cvd = useSelector((state) => state.cvdList);
  const usersList = useSelector((state) => state.usersList);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch({ type: 'LOAD_CVD_LIST', payload: { page: 1, limit: 15 } });
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
      render: (text, record, index) => {
        return loaiCv[text];
      },
      filters: filterLoai,
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
      title: 'Action',
      key: 'trangthai',
      ellipsis: true,
      width: '5em',
      render: (text, record, index) => {
        return (
          <>
            <UpdateModal id={record._id} />
            <DeleteModal id={record._id} />
          </>
        );
      },
    },
  ];

  return (
    <>
      {console.log('table cvd')}
      <div className={style.title}>
        Quản lý công văn đến
        <div>
          <CreateCvd />
          <Test list={cvd.data} style={{ marginLeft: '10px' }} />
        </div>
      </div>
      <DetailCvd id={Open} Open={Open} closeModal={closeModal} />
      <Table
        onRow={(record, rowIndex) => {
          return {
            onDoubleClick: (event) => {
              setOpen(record._id);
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
            type: 'LOAD_CVD_LIST',
            payload: {
              page: pagination.current,
              limit: pagination.pageSize,
              filters: Filters,
              sorter: Sorter,
            },
          });
          console.log(sorter);
        }}
        pagination={{
          defaultPageSize: 15,
          position: ['bottomCenter'],
          total: cvd.pagination ? cvd.pagination.total : 0,
          pageSizeOptions: [5, 10, 15, 50, 100, 500, Infinity],
          showLessItems: true,
          showSizeChanger: true,
          onChange: (page, pageSize) => {
            // console.log('page: ', page, ' pageSize: ', pageSize);
            // dispatch({
            //   type: 'LOAD_CVD_LIST',
            //   payload: { page: page, limit: pageSize },
            // });
          },
          onShowSizeChange: (current, size) => {
            // console.log('current: ', current, ' size: ', size);
            // dispatch({
            //   type: 'LOAD_CVD_LIST',
            //   payload: { page: 1, limit: size },
            // });
          },
        }}
      />
    </>
  );
}

export default React.memo(TableCVD);
