import React, { useState } from 'react';
import axios from 'axios';
import { Input, DatePicker, Button, Typography } from 'antd';

const { Title } = Typography;

const ExportToCSV = () => {
  const [dateOne, setDateOne] = useState();
  const [dateTwo, setDateTwo] = useState();

  const handleChange = e => {
    // const date = new Date()
    const data1 = new Date(e[0]._d);

    const data2 = new Date(e[1]._d);
    let day1 = String(data1.getDate()).padStart(2, '0');
    let day2 = String(data2.getDate()).padStart(2, '0');
    let month1 = String(data1.getMonth() + 1).padStart(2, '0');
    let month2 = String(data2.getMonth() + 1).padStart(2, '0');
    let year1 = data1.getFullYear();
    let year2 = data2.getFullYear();

    let sDate = day1 + '/' + month1 + '/' + year1;
    let eDate = day2 + '/' + month1 + '/' + year2;
    setDateOne(sDate);
    setDateTwo(eDate);
    // console.log(sDate);
    // console.log(eDate);
  };

  // console.log(dateOne);
  // console.log(dateTwo);

  const [orderData, setOrderData] = useState();
  const handleSubmit = async () => {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/api/v1/order/create-csv?startDate=${dateOne}&endDate=${dateTwo}`,
    );
    setOrderData(data);
    // axios({
    //   url: `${process.env.REACT_APP_API}/api/v1/order/create-csv?startDate=${dateOne}&endDate=${dateTwo}`,
    //   method: 'GET',
    //   responseType: 'blob',
    // }).then(response => {
    //   FileDownload(response.data, 'data.csv');
    //   console.log(response.data);
    // });
  };

  // console.log(orderData ? orderData.message : 'asd');
  const downloadFile = () => {
    window.location.href = orderData ? orderData.message : '';
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '1rem' }}>
      <Title>Export Orders To CSV</Title>
      <Input.Group compact>
        <DatePicker.RangePicker onChange={handleChange} style={{ width: '70%' }} />
        <Button onClick={handleSubmit} type="primary" size="large" style={{ marginLeft: '1rem', marginTop: 4 }}>
          Export
        </Button>
      </Input.Group>
      <div style={{ textAlign: 'center', marginTop: '2rem', marginBottom: '1rem' }}>
        {orderData !== undefined ? (
          <Button onClick={downloadFile} type={'primary'} size="large">
            Download
          </Button>
        ) : (
          <Button type={'primary'} disabled size="large">
            Download
          </Button>
        )}
      </div>
    </div>
  );
};

export default ExportToCSV;
