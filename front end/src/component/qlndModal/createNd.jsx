import React from 'react';
import { Modal, Form, Input, Button, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
const { Option } = Select;

const quyen = ['Guest', 'Admin'];

function CreateCvd() {
  const [Open, setOpen] = React.useState(false);

  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const closeModal = () => {
    setOpen(false);
  };
  const openModal = () => {
    setOpen(true);
  };

  return (
    <>
      <Button icon={<PlusOutlined />} size={'small'} onClick={openModal}>
        Thêm
      </Button>
      <Modal
        title="Thêm công văn đến"
        visible={Open}
        onOk={() => {
          form
            .validateFields()
            .then((data) => {
              const createUn = (data.lastname + data.firstname)
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/đ/g, 'd')
                .replace(/Đ/g, 'D')
                .replace(/\s/g, '');
              const dataNd = {
                ...data,
                username: createUn,
                password: '123456789',
              };
              return dataNd;
            })
            .then((data) => {
              console.log(data);
              dispatch({ type: 'CREATE_USER', payload: data });
              return data;
            })
            .then((data) => {
              setOpen(false);
              return data;
            })
            .catch((err) => console.log(err));
        }}
        onCancel={() => {
          form.resetFields();
          closeModal();
        }}
        okText="Tạo"
        cancelText="Hủy"
      >
        <Form form={form} labelAlign={'left'}>
          <Form.Item
            name="lastname"
            label="Họ"
            rules={[
              {
                required: true,
                message: 'Please input the value!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="firstname"
            label="Tên"
            rules={[
              {
                required: true,
                message: 'Please input the value!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="access"
            label="Quyền"
            rules={[
              {
                required: true,
                message: 'Please input the value!',
              },
            ]}
          >
            <Select>
              {quyen.map((value, index) => {
                return (
                  <Option key={index} value={index}>
                    {value}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default CreateCvd;
