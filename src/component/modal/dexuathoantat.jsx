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
      title: 'Công văn này đã hoàn tất?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Đề xuất hoàn thành',
      okType: 'success',
      cancelText: 'Hủy',
      onOk() {
        dispatch({
          type: 'UPDATE_CVD',
          payload: {
            id: props.id,
            data: { trangthai: 2, notification2: 'true' },
          },
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
