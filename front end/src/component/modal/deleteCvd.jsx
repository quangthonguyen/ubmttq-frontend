import React from 'react';
import { Modal, Button, Tooltip } from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';

const { confirm } = Modal;

function DeleteCvd(props) {
  const dispatch = useDispatch();
  const showDeleteConfirm = () => {
    confirm({
      centered: true,
      title: 'Bạn có chắc chắn muốn xóa công văn này?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        dispatch({ type: 'REMOVE_CVD', payload: { _id: props.id } });
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  return (
    <Tooltip title="Delete" placement="bottom">
      <Button
        type="link"
        icon={<DeleteOutlined />}
        size="small"
        onClick={showDeleteConfirm}
      />
    </Tooltip>
  );
}

export default DeleteCvd;
