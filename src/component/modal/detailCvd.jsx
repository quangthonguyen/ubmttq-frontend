import React from 'react';
import { Modal, Button, Tooltip, Row, Col, Typography } from 'antd';
import { DashOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useSelector } from 'react-redux';
import Axios from '../../axios/configAxios';

const { Text } = Typography;
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

function DetailCvd(props) {
  const [Cvd, setCvd] = React.useState({});

  const usersList = useSelector((state) => state.usersList);

  React.useEffect(() => {
    if (props.Open) {
      Axios.get(`/cvd/${props.id}`)
        .then((data) => {
          setCvd(data.data);
          console.log(data.data);
        })
        .catch((error) => console.log(error));
    }
  }, [props.Open]);

  const {
    stt,
    sovb,
    loaivb,
    ngayden,
    thoihan,
    nguoithuchien,
    nguoithuchienchinh,
    donvigui,
    noidungvb,
    noidungbutphe,
    filepatch,
    filename,
  } = Cvd;
  const arraynth = () => {
    let arrayNth = [];
    nguoithuchien.forEach((element) => {
      const nth = usersList.filter((v) => v._id === element);
      if (nth.length === 1) {
        arrayNth.push(`${nth[0].lastname} ${nth[0].firstname}`);
      }
    });
    return arrayNth;
  };
  const namenthc = () => {
    const nthc = usersList.filter((v) => v._id === nguoithuchienchinh);
    return nthc[0].lastname + ' ' + nthc[0].firstname;
  };
  return (
    <>
      {/* <Tooltip title="Detail" placement="bottom">
        <Button
          type="link"
          icon={<DashOutlined />}
          size="small"
          onClick={openModal}
        />
      </Tooltip> */}
      <Modal
        width={'800px'}
        centered={true}
        visible={Boolean(props.Open)}
        title="Chi tiết văn bản"
        onOk={props.closeModal}
        onCancel={props.closeModal}
        footer={[]}
      >
        <Row gutter={[5, 5]}>
          <Col span={12}>
            <Text strong={true}>STT : </Text>
            {stt}
          </Col>
          <Col span={12}>
            <Text strong={true}>Số VB : </Text>
            {sovb}
          </Col>
        </Row>

        <Row gutter={[5, 5]}>
          <Col span={12}>
            <Text strong={true}>Loại VB : </Text>
            {loaiCv[loaivb]}
          </Col>
          <Col span={12}>
            <Text strong={true}>Đơn vị gửi : </Text>
            {donvigui}
          </Col>
        </Row>

        <Row gutter={[5, 5]}>
          <Col span={12}>
            <Text strong={true}>Ngày đến : </Text>
            {moment(ngayden).format('DD/MM/YYYY')}
          </Col>
          <Col span={12}>
            <Text strong={true}>Thời hạn : </Text>
            {thoihan ? moment(thoihan).format('DD/MM/YYYY') : ''}
          </Col>
        </Row>

        <Row gutter={[5, 5]}>
          <Col span={24}>
            <Text strong={true}>Người thực hiện : </Text>
            {nguoithuchien ? arraynth().toString() : ''}
          </Col>
        </Row>

        <Row gutter={[5, 5]}>
          <Col span={24}>
            <Text strong={true}>Người thực hiện chính : </Text>
            {nguoithuchienchinh ? namenthc() : ''}
          </Col>
        </Row>

        <Row gutter={[5, 5]}>
          <Col span={24}>
            <Text strong={true}>Nội dung : </Text>
            {noidungvb}
          </Col>
        </Row>

        <Row gutter={[5, 5]}>
          <Col span={24}>
            <Text strong={true}>Nội dung bút phê : </Text>
            {noidungbutphe}
          </Col>
        </Row>
        <iframe
          src={filepatch}
          title={filename}
          style={{ width: '100%', height: '70vh' }}
        ></iframe>
      </Modal>
    </>
  );
}

export default DetailCvd;
