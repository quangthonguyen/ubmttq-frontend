import React from 'react';
import { Table } from 'antd';
import moment from 'moment';
import CreateCvdi from '../modal/createCvdi';
import DeleteModal from '../modal/deleteCvdi';
import DetailCvdi from '../modal/detailCvdi';
import UpdateModal from '../modal/updateCvdi';
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
const trangThai = ['Đã gửi', 'Đã xem', 'Hoàn thành'];

function TableCVDI() {
  const cvdi = useSelector((state) => state.cvdiList);
  const usersList = useSelector((state) => state.usersList);
  const userInfo = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();
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
  React.useEffect(() => {
    dispatch({
      type: 'GUEST_LOAD_CVDI_LIST',
      payload: {
        page: 1,
        limit: 15,
        id: userInfo._id,
        filters: '',
        sorter: '',
      },
    });
  }, []);

  const columns = [
    // {
    //   title: 'id',
    //   dataIndex: '_id',
    //   key: '_id',
    //   ellipsis: true,
    //   width: '0px',
    //   render: () => {
    //     return '';
    //   },
    // },
    // {
    //   title: 'Stt',
    //   dataIndex: 'stt',
    //   key: 'stt',
    //   width: '4em',
    //   ellipsis: true,
    //   sorter: true,
    // },
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
      ellipsis: true,
      width: '8em',
      filters: filterLoai,
      onFilter: (value, record) => record.loaivb === value,
      filterMultiple: false,
      render: (text, record, index) => {
        return loaiCv[text];
      },
    },
    {
      title: 'Ngày tháng',
      dataIndex: 'ngaythang',
      key: 'ngaythang',
      ellipsis: true,
      render: (text, record, index) => {
        return moment(text).format('DD/MM/YYYY');
      },
      sorter: true,
      width: '8em',
    },
    {
      title: 'Nội dung',
      dataIndex: 'noidungvb',
      key: 'noidungvb',
      ellipsis: true,
    },
    {
      title: 'Người thực hiện',
      dataIndex: 'nguoithuchien',
      key: 'nguoithuchien',
      ellipsis: true,
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
      filters: filterNth,
      onFilter: (value, record) => true,
      filterMultiple: false,
    },
    {
      title: 'Người nhận',
      dataIndex: 'nguoinhan',
      key: 'nguoinhan',
      ellipsis: true,
      render: (text, record, index) => {
        if (usersList.length === 0) {
          return '';
        }
        let arrayNth = [];
        record.nguoinhan.forEach((element) => {
          const nth = usersList.filter((v) => v._id === element);
          if (nth.length === 1) {
            arrayNth.push(`${nth[0].lastname} ${nth[0].firstname}`);
          }
        });
        return arrayNth.toString();
      },
      filters: filterNth,
      onFilter: (value, record) => true,
      filterMultiple: false,
    },
    {
      title: 'Tác giả',
      dataIndex: 'tacgia',
      key: 'tacgia',
      ellipsis: true,
      render: (text, record, index) => {
        if (usersList.length === 0) {
          return '';
        }
        const nthc = usersList.filter((v) => v._id === record.tacgia);
        return nthc[0].lastname + ' ' + nthc[0].firstname;
      },
      filters: filterNth,
      onFilter: (value, record) => true,
      filterMultiple: false,
      width: '12em',
    },
    // {
    //   title: 'Action',
    //   key: 'trangthai',
    //   ellipsis: true,
    //   render: (text, record, index) => {
    //     return (
    //       <>
    //         <DetailCvdi id={record._id} />
    //       </>
    //     );
    //   },
    // },
  ];

  return (
    <>
      <div className={style.title}>Quản lý công văn đi</div>
      <DetailCvdi id={Open} Open={Open} closeModal={closeModal} />
      <Table
        rowClassName={(record, index) => {
          return record.notification ? style.notification : '';
        }}
        onRow={(record, rowIndex) => {
          return {
            onDoubleClick: (event) => {
              setOpen(record._id);
            },
            onClick: (event) => {
              if (record.notification) {
                dispatch({
                  type: 'UPDATE_CVDI',
                  payload: { id: record._id, data: { notification: 'false' } },
                });
                // dispatch({
                //   type: 'LOAD_NOTIFICATION',
                // });
              }
            },
          };
        }}
        dataSource={cvdi.data}
        columns={columns}
        size="small"
        scroll={{ y: 'calc(100vh - 245px)' }}
        bordered
        rowKey="_id"
        onChange={(pagination, filters, sorter) => {
          const Filters = `${
            filters.loaivb ? '&loaivb=' + filters.loaivb : ''
          }${
            filters.nguoithuchien
              ? '&nguoithuchien=' + filters.nguoithuchien
              : ''
          }${filters.nguoinhan ? '&nguoinhan=' + filters.nguoinhan : ''}${
            filters.tacgia ? '&tacgia=' + filters.tacgia : ''
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
            type: 'GUEST_LOAD_CVDI_LIST',
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
          total: cvdi.pagination ? cvdi.pagination.total : 0,
          pageSizeOptions: [5, 10, 15, 50, 100],
          showLessItems: true,
          showSizeChanger: true,
          // onChange: (page, pageSize) => {
          //   console.log('page: ', page, ' pageSize: ', pageSize);
          //   dispatch({
          //     type: 'GUEST_LOAD_CVDI_LIST',
          //     payload: { page: page, limit: pageSize, id: userInfo._id },
          //   });
          // },
          // onShowSizeChange: (current, size) => {
          //   console.log('current: ', current, ' size: ', size);
          //   dispatch({
          //     type: 'GUEST_LOAD_CVDI_LIST',
          //     payload: { page: 1, limit: size, id: userInfo._id },
          //   });
          // },
        }}
      />
    </>
  );
}

export default React.memo(TableCVDI);
