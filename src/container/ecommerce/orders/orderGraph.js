import React, {useEffect} from 'react';
import {Bar} from 'react-chartjs-2'
import {useSelector, useDispatch} from 'react-redux'
import { orderFilter } from '../../../redux/orders/actionCreator';


const OrderGraph = () => {
    const dispatch = useDispatch()
  const orderList = useSelector((state) => state.orders)

  const {loading, data, err} = orderList

  useEffect(() => {
    dispatch(orderFilter());
  
  }, [dispatch]);


  var counts = {};
  data.forEach(function(x) { counts[x.startDate] = (counts[x.startDate] || 0)+1; });

 
  const dates = []
  const values = []

  for (const [key, value] of Object.entries(counts)) {
    dates.push(key)
    values.push(value)
}


  const finalOrderNumber = []
  const finalOrderDates = []
for(let i=0; i<7; i++) {
    finalOrderNumber.push(values[i])
    finalOrderDates.push(dates[i])
    
}

const orderData = {
    labels: finalOrderDates,
    datasets: [
      {
        label: "Order Count",
        data: finalOrderNumber,
        borderColor: ['#ff6f00','#ff6f00','#ff6f00','#ff6f00','#ff6f00','#ff6f00','#ff6f00'],
        backgroundColor: ['#51ff00','#51ff00','#51ff00','#51ff00','#51ff00','#51ff00','#51ff00']
      }
    ]

  }
  const options = {
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
        }
      ]
    }
  }

    return (
        <>
        <h1 style={{textAlign: 'center', textDecoration: 'underline', paddingTop: '5px', fontSize: '2rem'}}>Order Graph</h1>
        <Bar data={orderData} options={options} />
        </>
    )
}

export default OrderGraph;