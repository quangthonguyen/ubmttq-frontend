import React from 'react';
import { Table } from 'antd';
import CreateUser from '../qlndModal/createNd';
import DeleteUser from '../qlndModal/deleteUserModal';
import UpdataUserModal from '../qlndModal/updataUser';
import style from './tableCvd.module.scss';
import { useSelector, useDispatch } from 'react-redux';

const quyen = ['Guest', 'Admin'];

function TableQlnd() {
  const cvd = useSelector((state) => state.cvdList);
  const usersList = useSelector((state) => state.usersList);
  //   const dispatch = useDispatch();
  //   React.useEffect(() => {
  //     dispatch({ type: 'LOAD_CVD_LIST', payload: { page: 1, limit: 15 } });
  //   }, []);

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
    {
      title: 'Họ',
      dataIndex: 'lastname',
      key: 'lastname',
      ellipsis: true,
    },
    {
      title: 'Tên',
      dataIndex: 'firstname',
      key: 'firstname',
      ellipsis: true,
    },
    {
      title: 'User name',
      dataIndex: 'username',
      key: 'username',
      ellipsis: true,
    },
    {
      title: 'Quyền',
      dataIndex: 'access',
      key: 'access',
      ellipsis: true,
      render: (text, record, index) => {
        return quyen[text];
      },
    },
    {
      title: 'Action',
      key: 'trangthai',
      ellipsis: true,
      render: (text, record, index) => {
        const arr = usersList.filter((e) => e._id === record._id);
        console.log({ updatae: arr[0] });
        return (
          <>
            <UpdataUserModal data={arr[0]} />
            <DeleteUser id={record._id} />
          </>
        );
      },
    },
  ];

  return (
    <>
      {console.log('table cvd')}
      <div className={style.title}>
        Quản lý người dùng
        <CreateUser />
      </div>

      <Table
        dataSource={usersList}
        columns={columns}
        size="small"
        scroll={{ y: 'calc(100vh - 245px)' }}
        bordered
        rowKey="_id"
        pagination={{
          defaultPageSize: 15,
          position: ['bottomCenter'],
          total: usersList ? usersList.length : 0,
          pageSizeOptions: [5, 10, 15, 50, 100],
          showLessItems: true,
          showSizeChanger: true,
          onChange: (page, pageSize) => {
            console.log('page: ', page, ' pageSize: ', pageSize);
            // dispatch({
            //   type: 'LOAD_CVD_LIST',
            //   payload: { page: page, limit: pageSize },
            // });
          },
          onShowSizeChange: (current, size) => {
            console.log('current: ', current, ' size: ', size);
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

export default TableQlnd;
