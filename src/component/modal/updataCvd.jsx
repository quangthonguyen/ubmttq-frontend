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
  Tooltip,
} from 'antd';
import { EditOutlined } from '@ant-design/icons';
import Axios from '../../axios/configAxios';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

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

function UpdateCvd(props) {
  const [Open, setOpen] = React.useState(false);
  const [file, setfile] = React.useState({ filepatch: '', filename: '' });
  const [precentUpload, setprecentUpload] = React.useState(0);
  const [Cvd, setCvd] = React.useState({});
  const [form] = Form.useForm();
  const usersList = useSelector((state) => state.usersList);
  const dispatch = useDispatch();
  let dataCvd;
  const closeModal = () => {
    setOpen(false);
  };
  const openModal = async () => {
    await Axios.get(`/cvd/${props.id}`)
      .then((data) => {
        setCvd(data.data);
      })
      .catch((error) => console.log(error));
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
      <Tooltip title="Update" placement="bottom">
        <Button
          type="link"
          icon={<EditOutlined />}
          size="small"
          onClick={openModal}
        />
      </Tooltip>

      <Modal
        title="Cập nhập công văn đến"
        visible={Open}
        onOk={() => {
          form
            .validateFields()
            .then((data) => {
              const temp =
                file.filepatch === '' && file.filename === ''
                  ? {}
                  : { ...file };
              data.thoihan
                ? (dataCvd = {
                    ...data,
                    thoihan: data.thoihan._d.toString(),
                    ngayden: data.ngayden._d.toString(),
                    ...temp,
                  })
                : (dataCvd = {
                    ...data,
                    ngayden: data.ngayden._d.toString(),
                    ...temp,
                  });
              return dataCvd;
            })
            .then((data) => {
              console.log({ input: data });
              dispatch({
                type: 'UPDATE_CVD',
                payload: { id: props.id, data: data },
              });
            })
            .then(() => {
              setOpen(false);
              setfile({ filepatch: '', filename: '' });
            })
            .catch((err) => console.log(err));
        }}
        onCancel={() => {
          setprecentUpload(0);
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
            stt: Cvd.stt,
            sovb: Cvd.sovb,
            loaivb: Cvd.loaivb,
            ngayden: moment(Cvd.ngayden),
            thoihan: moment(Cvd.thoihan),
            nguoithuchien: Cvd.nguoithuchien,
            nguoithuchienchinh: Cvd.nguoithuchienchinh,
            donvigui: Cvd.donvigui,
            noidungvb: Cvd.noidungvb,
            noidungbutphe: Cvd.noidungbutphe,
          }}
        >
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

          <Form.Item name="pdf">
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

export default UpdateCvd;
