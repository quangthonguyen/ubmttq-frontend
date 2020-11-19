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

function UpdateCvdi(props) {
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
    await Axios.get(`/cvdi/${props.id}`)
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
        title="Cập nhập công văn đi"
        visible={Open}
        onOk={() => {
          form
            .validateFields()
            .then((data) => {
              const temp =
                file.filepatch === '' && file.filename === ''
                  ? {}
                  : { ...file };
              dataCvd = {
                ...data,
                ngaythang: data.ngaythang._d.toString(),
                ...temp,
              };
              return dataCvd;
            })
            .then((data) => {
              console.log({ input: data });
              dispatch({
                type: 'UPDATE_CVDI',
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
            // stt: Cvd.stt,
            sovb: Cvd.sovb,
            loaivb: Cvd.loaivb,
            ngaythang: moment(Cvd.ngaythang),
            nguoithuchien: Cvd.nguoithuchien,
            nguoinhan: Cvd.nguoinhan,
            tacgia: Cvd.tacgia,
            noidungvb: Cvd.noidungvb,
          }}
        >
          <Row gutter={10}>
            {/* <Col span={12}>
              <Form.Item
                labelCol={{ span: 8 }}
                name="stt"
                label="Stt"
                rules={[
                  {
                    required: true,
                    message: 'Bắt buộc!',
                  },
                ]}
              >
                <InputNumber style={{ width: '100%' }} />
              </Form.Item>
            </Col> */}
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
            <Col span={12}>
              <Form.Item
                // labelCol={{ span: 8 }}
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
          </Row>
          <Row gutter={10}>
            <Col span={12}>
              <Form.Item
                // labelCol={{ span: 9 }}
                name="ngaythang"
                label="Ngày tháng"
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
              <Form.Item
                name="tacgia"
                label="Tác giả"
                rules={[
                  {
                    required: true,
                    message: 'Bắt buộc!',
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
            name="nguoinhan"
            label="Người nhận"
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

export default UpdateCvdi;
