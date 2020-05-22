import React from 'react';
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Button,
  DatePicker,
  Select,
  Progress,
  Row,
  Col,
  notification,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Axios from '../../axios/configAxios';
import { useSelector, useDispatch } from 'react-redux';
const { Option } = Select;
const { TextArea } = Input;
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

function CreateCvd() {
  const [Open, setOpen] = React.useState(false);
  const [file, setfile] = React.useState({ filepatch: '', filename: '' });
  const [precentUpload, setprecentUpload] = React.useState(0);
  const [form] = Form.useForm();
  const usersList = useSelector((state) => state.usersList);
  const dispatch = useDispatch();
  let dataCvd;
  const closeModal = () => {
    setOpen(false);
  };
  const openModal = () => {
    setOpen(true);
  };
  const changePdf = (e) => {
    setprecentUpload(0);
    // append new form
    const form = new FormData();
    form.append('pdfFile', e.target.files[0]);
    // upload
    Axios.post('/upload', form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        setprecentUpload(
          parseInt(
            Math.round((progressEvent.loaded * 100) / progressEvent.total)
          )
        );
      },
    })
      .then((res) => {
        setfile({ filepatch: res.data.filepatch, filename: res.data.filename });
        console.log(res.data);
      })
      .catch((error) => console.log(error));
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
              data.thoihan
                ? (dataCvd = {
                    ...data,
                    thoihan: data.thoihan._d.toString(),
                    ngayden: data.ngayden._d.toString(),
                    ...file,
                    trangthai: 0,
                  })
                : (dataCvd = {
                    ...data,
                    ngayden: data.ngayden._d.toString(),
                    ...file,
                    trangthai: 0,
                  });
              return dataCvd;
            })
            .then((data) => {
              console.log(data);
              dispatch({ type: 'ADD_CVD', payload: data });
              return data;
            })
            .then((data) => {
              setOpen(false);
              return data;
            })
            .then((data) => {
              notification.success({
                message: `Notification `,
                description: `Văn bản số :${data.sovb} tạo thành công`,
                placement: 'bottomRight',
              });
            })
            .then(() => form.resetFields())
            .then(() => setfile({ filepatch: '', filename: '' }))
            .then(() => setprecentUpload(0))
            .catch((err) => console.log(err));
        }}
        onCancel={() => {
          setprecentUpload(0);
          form.resetFields();
          closeModal();
        }}
        okText="Tạo"
        cancelText="Hủy"
      >
        <Form form={form} labelAlign={'left'}>
          <Row gutter={10}>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 8 }}
                name="stt"
                label="STT"
                rules={[
                  {
                    required: true,
                    message: 'Bắt buộc!',
                  },
                ]}
              >
                <InputNumber style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 8 }}
                name="sovb"
                label="Số VB"
                rules={[
                  {
                    required: true,
                    message: 'Bắt buộc!',
                  },
                ]}
              >
                <InputNumber style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={10}>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 8 }}
                name="loaivb"
                label="Loại"
                rules={[
                  {
                    required: true,
                    message: 'Bắt buộc!',
                  },
                ]}
              >
                <Select>
                  {loaiCv.map((value, index) => {
                    return (
                      <Option key={index} value={index}>
                        {value}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="donvigui"
                label="Đơn vị gửi"
                rules={[
                  {
                    required: true,
                    message: 'Please input the value!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={10}>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 8 }}
                name="ngayden"
                label="Ngày đến"
                rules={[
                  {
                    required: true,
                    message: 'Bắt buộc!',
                  },
                ]}
              >
                <DatePicker format={'DD/MM/YYYY'} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item labelCol={{ span: 8 }} name="thoihan" label="Thời hạn">
                <DatePicker format={'DD/MM/YYYY'} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="nguoithuchien"
            label="Người thực hiện"
            rules={[
              {
                required: true,
                message: 'Please input the value!',
              },
            ]}
          >
            <Select mode="multiple">
              {usersList.map((value, index) => {
                return (
                  <Option
                    key={index}
                    value={value._id}
                  >{`${value.lastname} ${value.firstname}`}</Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item
            name="nguoithuchienchinh"
            label="Người thực hiện chính"
            rules={[
              {
                required: true,
                message: 'Please input the value!',
              },
            ]}
          >
            <Select>
              {usersList.map((value, index) => {
                return (
                  <Option
                    key={index}
                    value={value._id}
                  >{`${value.lastname} ${value.firstname}`}</Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item
            name="noidungvb"
            label="Nội dung"
            rules={[
              {
                required: true,
                message: 'Please input the value!',
              },
            ]}
          >
            <TextArea autoSize />
          </Form.Item>
          <Form.Item
            name="noidungbutphe"
            label="Nội dung bút phê"
            rules={[
              {
                required: true,
                message: 'Please input the value!',
              },
            ]}
          >
            <TextArea autoSize />
          </Form.Item>

          <Form.Item
            name="pdf"
            rules={[
              {
                required: true,
                message: 'Please choose the file!',
              },
            ]}
          >
            <Input type="file" onChange={changePdf} />
          </Form.Item>
          {precentUpload > 0 ? (
            <Progress percent={precentUpload} size="small" status="active" />
          ) : (
            ''
          )}
        </Form>
      </Modal>
    </>
  );
}

export default CreateCvd;
