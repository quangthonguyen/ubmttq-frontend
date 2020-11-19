import React, { Component } from 'react';
import ReactExport from 'react-export-excel';
import { Button } from 'antd';
import { FilePdfOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useSelector } from 'react-redux';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

// const multiDataSet = [
//   {
//     columns: ['Headings', 'Text Style', 'Colors'],
//     data: [
//       [
//         { value: 'H1', style: { font: { sz: '24', bold: true } } },
//         { value: 'Bold', style: { font: { bold: true } } },
//         {
//           value: 'Red',
//           style: {
//             fill: { patternType: 'solid', fgColor: { rgb: 'FFFF0000' } },
//           },
//         },
//       ],
//       [
//         { value: 'H2', style: { font: { sz: '18', bold: true } } },
//         { value: 'underline', style: { font: { underline: true } } },
//         {
//           value: 'Blue',
//           style: {
//             fill: { patternType: 'solid', fgColor: { rgb: 'FF0000FF' } },
//           },
//         },
//       ],
//       [
//         { value: 'H3', style: { font: { sz: '14', bold: true } } },
//         { value: 'italic', style: { font: { italic: true } } },
//         {
//           value: 'Green',
//           style: {
//             fill: { patternType: 'solid', fgColor: { rgb: 'FF00FF00' } },
//           },
//         },
//       ],
//       [
//         { value: 'H4', style: { font: { sz: '12', bold: true } } },
//         { value: 'strike', style: { font: { strike: true } } },
//         {
//           value: 'Orange',
//           style: {
//             fill: { patternType: 'solid', fgColor: { rgb: 'FFF86B00' } },
//           },
//         },
//       ],
//       [
//         { value: 'H5', style: { font: { sz: '10.5', bold: true } } },
//         { value: 'outline', style: { font: { outline: true } } },
//         {
//           value: 'Yellow',
//           style: {
//             fill: { patternType: 'solid', fgColor: { rgb: 'FFFFFF00' } },
//           },
//         },
//       ],
//       [
//         { value: 'H6', style: { font: { sz: '7.5', bold: true } } },
//         { value: 'shadow', style: { font: { shadow: true } } },
//         {
//           value: 'Light Blue',
//           style: {
//             fill: { patternType: 'solid', fgColor: { rgb: 'FFCCEEFF' } },
//           },
//         },
//       ],
//     ],
//   },
// ];

const CvdExcel = (props) => {
  const usersList = useSelector((state) => state.usersList);
  let multiDataSet = [
    {
      columns: [
        'Stt',
        'Số CV',
        // 'Loại',
        // 'Đơn vị gửi',
        // 'Ngày đến',
        // 'Nội dung',
        // 'Nội dung bút phê',
        // 'Người thực hiện',
        // 'Người thực hiện chính',
        // 'Thời hạn',
      ],
      data: [[{ value: 'das' }, { value: 'das' }]],
    },
  ];
  if (props.list && props.list.length > 0) {
    let temp = props.list.map((e, i) => [{ value: e.stt }, { value: e.sovb }]);
    // multiDataSet[0].data = temp;
    console.log({ excel2: multiDataSet[0].data });
    console.log({ excel: temp });
  }

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
      <ExcelSheet dataSet={multiDataSet} name="Organization" />
    </ExcelFile>
  );
};
export default CvdExcel;
