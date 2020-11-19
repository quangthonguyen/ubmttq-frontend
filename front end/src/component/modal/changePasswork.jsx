import React from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

function UpdateCvd(props) {
  const [Open, setOpen] = React.useState(false);

  const UserInfo = useSelector((state) => state.userInfo);
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const closeModal = () => {
    setOpen(false);
  };
  const openModal = async () => {
    setOpen(true);
  };
  const reg = UserInfo.password ? `/${UserInfo.password}/` : '';
  return (
    <>
      <Button type="link" onClick={openModal}>
        Thay đổi mật khẩu
      </Button>

      <Modal
        title="Thay đổi mật khẩu"
        visible={Open}
        onOk={() => {
          form
            .validateFields()
            .then((data) => {
              const dataUser = {
                ...data,
              };
              return dataUser;
            })
            .then((data) => {
              console.log({ input: data });
              dispatch({
                type: 'UPDATE_USER_LIST',
                payload: { id: props.id, data: data },
              });
            })
            .then(() => {
              setOpen(false);
              localStorage.removeItem('username');
              localStorage.removeItem('password');
            })
            .catch((err) => console.log(err));
        }}
        onCancel={() => {
          form.resetFields();
          closeModal();
        }}
        okText="Cập nhập"
        cancelText="Hủy"
      >
        <Form form={form} labelAlign={'left'}>
          <Form.Item
            name="password"
            label="Mật khẩu mới:"
            rules={[
              {
                required: true,
                message: 'Please input the value!',
              },
            ]}
          >
            <Input type="password" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default UpdateCvd;
