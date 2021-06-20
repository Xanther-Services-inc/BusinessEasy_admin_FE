import React, {useEffect} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';
import {useSelector, useDispatch} from 'react-redux';
import { orderFilter } from '../../../redux/orders/actionCreator';
import {Row, Col} from 'antd';


const OrderGraph = () => {
    const dispatch = useDispatch()
  const orderList = useSelector((state) => state.orders)

  const {loading, data, err} = orderList

  useEffect(() => {
    dispatch(orderFilter());
  
  }, [dispatch]);


  var counts = {};
  data.forEach(function(x) { 
    counts[x.startDate] = (counts[x.startDate] || 0)+1;
    
  });



 
  const dates = []
  const values = []

  for (const [key, value] of Object.entries(counts)) {
    dates.push(key)
    values.push(value)
}
let priceList = []
let price = 0;
let paidPriceList = []
let paidPrice = 0
dates.forEach(date => {
  data.forEach(item => {
    if(item.startDate === date) {
      price += parseInt(item.price)
    }
    if(item.startDate === date && item.payment === 'Paid') {
      paidPrice += parseInt(item.price)
    }
  })
  paidPriceList.push(paidPrice)
  paidPrice = 0
  priceList.push(price)
  price = 0
})

console.log(paidPrice);
console.log(paidPriceList);
console.log(priceList);

  const finalOrderNumber = []
  const finalOrderDates = []
for(let i=0; i<7; i++) {
    finalOrderNumber.push(values[i])
    finalOrderDates.push(dates[i])
    
}

// const finalOrderNumber = [4,5,8,4,7,12,10]
// const finalOrderDates = ["06/12/2021","06/11/2021","06/10/2021","06/09/2021","06/08/2021","06/07/2021","06/06/2021"]
// data: [42000, 55000, 96000, 51500, 79000, 120000, 94000],
// data: [40000, 35000, 75000, 21000, 70000, 52000, 34000],
  // for total order

const orderData = {
    labels: ["06/12/2021","06/11/2021","06/10/2021","06/09/2021","06/08/2021","06/07/2021","06/06/2021"],
    datasets: [
      {
        label: "Order Count",
        data: [4,5,8,4,7,12,10],
        borderColor: ['#ff6f00','#ff6f00','#ff6f00','#ff6f00','#ff6f00','#ff6f00','#ff6f00'],
        backgroundColor: ['#00ad06','#00ad06','#00ad06','#00ad06','#00ad06','#00ad06','#00ad06']
      }
    ]

  }
  const orderOptions = {
    title: {
      display: true,
      text: 'Last 7 Days Order'
    },
    scales: {
      yAxes: [
        {
          ticks: {
            min: 0,
            max: 20,
            stepSize: 2
          }
        },
      ]
    }
  }

  // for total revenue & paid graph

  const priceData = {
    labels: ["06/12/2021","06/11/2021","06/10/2021","06/09/2021","06/08/2021","06/07/2021","06/06/2021"],
    datasets: [
      
      {
        label: "Total Amount",
        data: [42000, 55000, 96000, 51500, 79000, 120000, 94000],
        borderColor: ['#ff6f00','#ff6f00','#ff6f00','#ff6f00','#ff6f00','#ff6f00','#ff6f00'],
        backgroundColor: ['#00ad06','#00ad06','#00ad06','#00ad06','#00ad06','#00ad06','#00ad06']
      },
      {
        label: "Paid Amount",
        data: [40000, 35000, 75000, 21000, 70000, 52000, 34000],
        borderColor: ['#ff6f00','#ff6f00','#ff6f00','#ff6f00','#ff6f00','#ff6f00','#ff6f00'],
        backgroundColor: ['#0300ad','#0300ad','#0300ad','#0300ad','#0300ad','#0300ad','#0300ad']
      }
    ]

  }
  const priceOptions = {
    title: {
      display: true,
      text: 'Last 7 Days Revenue'
    },

  }

  // for pie chart

  let totalRevenue = 0
  let paid = 0
  data.forEach(order => {
    totalRevenue += parseInt(order.price)
    if(order.payment === 'Paid') {
      paid += parseInt(order.price)
    }
  })

  const pieData = {
    labels:["Paid", "Yet To Be Paid"],
    datasets:[{
     data: [paid, (totalRevenue-paid)],
     backgroundColor: ["#fff200", "#ff0000"],
     borderColor:'#fff',
     borderWidth: 1
    }]
  };

    return (
        <>
        <Row gutter={16}>
          <Col className="gutter-row" span={12} style={{border: "1px dashed #b8b8b8"}}>
            {/* <h1 style={{textAlign: 'center', textDecoration: 'underline', paddingTop: '5px', fontSize: '2rem'}}>Order Graph</h1> */}
            <Bar height={200} data={orderData} options={orderOptions} />
          </Col>
          <Col className="gutter-row" span={12} style={{border: "1px dashed #b8b8b8"}}>
          {/* <h1 style={{textAlign: 'center', textDecoration: 'underline', paddingTop: '5px', fontSize: '2rem'}}>Revenue Graph</h1> */}
        <Bar height={200} data={priceData} options={priceOptions} />
          </Col>
          <Col className="gutter-row" span={24} style={{border: "1px dashed #b8b8b8"}}>
          {/* <h1 style={{textAlign: 'center', textDecoration: 'underline', paddingTop: '5px', fontSize: '2rem'}}>Revenue Chart</h1> */}
        <Pie height={200} data={pieData} height="100%" />
          </Col>
        </Row>
        </>
    )
}

export default OrderGraph;