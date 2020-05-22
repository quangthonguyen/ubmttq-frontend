import React from 'react';
import { Modal, Form, Input, Button, Select, Tooltip } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import Axios from '../../axios/configAxios';
import { useSelector, useDispatch } from 'react-redux';

const { Option } = Select;
const quyen = ['Guest', 'Admin'];

function UpdateCvd(props) {
  const [Open, setOpen] = React.useState(false);

  //   const [Cvd, setCvd] = React.useState({});
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const closeModal = () => {
    setOpen(false);
  };
  const openModal = async () => {
    // await Axios.get(`/cvd/${props.id}`)
    //   .then((data) => {
    //     setCvd(data.data);
    //   })
    //   .catch((error) => console.log(error));
    setOpen(true);
  };

  return (
    <>
      <Tooltip title="Update" placement="bottom">
        <Button
          type="link"
          icon={<EditOutlined />}
          size="small"
          onClick={openModal}
        />
      </Tooltip>

      <Modal
        title="Cập nhập thông tin người dùng"
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
              const dataUser = {
                ...props,
                ...data,
                username: createUn,
              };
              return dataUser;
            })
            .then((data) => {
              console.log({ input: data });
              dispatch({
                type: 'UPDATE_USER_LIST',
                payload: { id: props.data._id, data: data },
              });
            })
            .then(() => {
              setOpen(false);
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
        <Form
          form={form}
          labelAlign={'left'}
          initialValues={{
            lastname: props.data.lastname,
            firstname: props.data.firstname,
            access: props.data.access,
          }}
        >
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

export default UpdateCvd;
