import React from 'react';
import ReactExport from 'react-export-excel';
import { Button } from 'antd';
import { FilePdfOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useSelector } from 'react-redux';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

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
];

const Download = (props) => {
  const usersList = useSelector((state) => state.usersList);
  return (
    <ExcelFile
      element={
        <Button
          icon={<FilePdfOutlined />}
          size={'small'}
          style={{ marginLeft: '10px' }}
        >
          Export excel
        </Button>
      }
    >
      <ExcelSheet data={props.list} name=" ">
        <ExcelColumn label="Số văn bảng" value="sovb" />
        <ExcelColumn label="Loại văn bản" value={(col) => loaiCv[col.loaivb]} />

        <ExcelColumn
          label="Ngày tháng"
          value={(col) => moment(col.ngaythang).format('DD/MM/YYYY')}
        />
        <ExcelColumn label="Nôi dung" value="noidungvb" />

        <ExcelColumn
          label="Người thực hiện"
          value={(col) => {
            let arrayNth = [];
            col.nguoithuchien.forEach((element) => {
              const nth = usersList.filter((v) => v._id === element);
              if (nth.length === 1) {
                arrayNth.push(`${nth[0].lastname} ${nth[0].firstname}`);
              }
            });
            return arrayNth.toString();
          }}
        />
        <ExcelColumn
          label="Người nhận"
          value={(col) => {
            let arrayNth = [];
            col.nguoinhan.forEach((element) => {
              const nth = usersList.filter((v) => v._id === element);
              if (nth.length === 1) {
                arrayNth.push(`${nth[0].lastname} ${nth[0].firstname}`);
              }
            });
            return arrayNth.toString();
          }}
        />
        <ExcelColumn
          label="Tác giả"
          value={(col) => {
            const nthc = usersList.filter((v) => v._id === col.tacgia);
            return nthc[0].lastname + ' ' + nthc[0].firstname;
          }}
        />
        <ExcelColumn label="File name" value="filename" />
      </ExcelSheet>
    </ExcelFile>
  );
};

export default Download;
