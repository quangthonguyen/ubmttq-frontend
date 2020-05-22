import React from 'react';
import { Modal, Button, Tooltip } from 'antd';
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';

const { confirm } = Modal;

function DeleteCvd(props) {
  const dispatch = useDispatch();
  const showDeleteConfirm = () => {
    confirm({
      centered: true,
      title: 'Xác nhận công văn này đã hoàn thành?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes',
      okType: 'success',
      cancelText: 'No',
      onOk() {
        dispatch({
          type: 'UPDATE_CVD',
          payload: { id: props.id, data: { trangthai: 2 } },
        });
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  return (
    <Tooltip title="Finish" placement="bottom">
      <Button
        type="link"
        icon={<CheckCircleOutlined />}
        size="small"
        onClick={showDeleteConfirm}
      />
    </Tooltip>
  );
}

export default DeleteCvd;
