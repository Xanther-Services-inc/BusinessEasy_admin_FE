import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import axios from 'axios';
import { Row, Col, DatePicker } from 'antd';
import ExportToCSV from './ExportToCSV';

const { RangePicker } = DatePicker;

const OrderGraph = () => {
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

    let sDate = month1 + '/' + day1 + '/' + year1;
    let eDate = month2 + '/' + day2 + '/' + year2;
    setDateOne(sDate);
    setDateTwo(eDate);
  };

  console.log(dateOne);
  console.log(dateTwo);

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const defaultData = async () => {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/orders`);
      setOrders(data);
    };
    defaultData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/order/get-orders-btn-dates?startDate=${dateOne}&endDate=${dateTwo}`,
      );
      setOrders(data);
    };
    fetchData();
  }, [dateOne, dateTwo]);
  console.log(orders);

  var counts = {};
  orders.forEach(function(x) {
    counts[x.startDate] = (counts[x.startDate] || 0) + 1;
  });

  console.log(counts);

  const dates = [];
  const values = [];

  for (const [key, value] of Object.entries(counts)) {
    dates.push(key);
    values.push(value);
  }

  console.log(dates);
  console.log(values);

  // for total order

  const orderData = {
    labels: dates,
    datasets: [
      {
        label: 'Order Count',
        data: values,
        borderColor: ['#ff6f00', '#ff6f00', '#ff6f00', '#ff6f00', '#ff6f00', '#ff6f00', '#ff6f00'],
        backgroundColor: ['#00ad06', '#00ad06', '#00ad06', '#00ad06', '#00ad06', '#00ad06', '#00ad06'],
      },
    ],
  };
  const orderOptions = {
    title: {
      display: true,
      text: 'Total Orders',
    },
    scales: {
      yAxes: [
        {
          ticks: {
            min: 0,
            max: 20,
            stepSize: 2,
          },
        },
      ],
    },
  };

  //   For total amount
  var totalSell = {};
  orders.forEach(function(x) {
    totalSell[x.startDate] = (totalSell[x.startDate] || 0) + parseInt(x.price);
  });

  console.log(totalSell);
  const totalPrice = [];
  for (const [key, value] of Object.entries(totalSell)) {
    totalPrice.push(value);
  }

  console.log(totalPrice);

  const totalPaid = {};
  orders.forEach(function(x) {
    if (x.payment === 'Paid') {
      totalPaid[x.startDate] = (totalPaid[x.startDate] || 0) + parseInt(x.price);
    }
  });

  const totalPaidSell = [];
  for (const [key, value] of Object.entries(totalPaid)) {
    totalPaidSell.push(value);
  }

  console.log(totalPaid);

  const priceData = {
    labels: dates,
    datasets: [
      {
        label: 'Total Amount',
        data: totalPrice,
        borderColor: ['#ff6f00', '#ff6f00', '#ff6f00', '#ff6f00', '#ff6f00', '#ff6f00', '#ff6f00'],
        backgroundColor: ['#00ad06', '#00ad06', '#00ad06', '#00ad06', '#00ad06', '#00ad06', '#00ad06'],
      },
      {
        label: 'Paid Amount',
        data: totalPaidSell,
        borderColor: ['#ff6f00', '#ff6f00', '#ff6f00', '#ff6f00', '#ff6f00', '#ff6f00', '#ff6f00'],
        backgroundColor: ['#0300ad', '#0300ad', '#0300ad', '#0300ad', '#0300ad', '#0300ad', '#0300ad'],
      },
    ],
  };
  const priceOptions = {
    title: {
      display: true,
      text: 'Revenue',
    },
  };

  //   Pie chart details
  let totalRevenue = 0;
  let paid = 0;
  orders.forEach(order => {
    totalRevenue += parseInt(order.price);
    if (order.payment === 'Paid') {
      paid += parseInt(order.price);
    }
  });

  const pieData = {
    labels: ['Paid', 'Yet To Be Paid'],
    datasets: [
      {
        data: [paid, totalRevenue - paid],
        backgroundColor: ['#fff200', '#ff0000'],
        borderColor: '#fff',
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <RangePicker style={{ margin: ' 1rem 32vw' }} onChange={handleChange} />
      <br />
      <Row gutter={16}>
        <Col className="gutter-row" span={12} style={{ border: '1px dashed #b8b8b8' }}>
          {/* <h1 style={{textAlign: 'center', textDecoration: 'underline', paddingTop: '5px', fontSize: '2rem'}}>Order Graph</h1> */}
          <Bar height={200} data={orderData} options={orderOptions} />
        </Col>
        <Col className="gutter-row" span={12} style={{ border: '1px dashed #b8b8b8' }}>
          {/* <h1 style={{textAlign: 'center', textDecoration: 'underline', paddingTop: '5px', fontSize: '2rem'}}>Revenue Graph</h1> */}
          <Bar height={200} data={priceData} options={priceOptions} />
        </Col>
        <Col className="gutter-row" span={24} style={{ border: '1px dashed #b8b8b8' }}>
          {/* <h1 style={{textAlign: 'center', textDecoration: 'underline', paddingTop: '5px', fontSize: '2rem'}}>Revenue Chart</h1> */}
          <Pie height={200} data={pieData} height="100%" />
          <br />
        </Col>
      </Row>
      <br />

      <ExportToCSV />
    </>
  );
};

export default OrderGraph;
