import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Bar} from 'react-chartjs-2'
import { Main } from "../styled";
import { Row, Col, Button } from 'antd';
import {Cards} from '../../components/cards/frame/cards-frame';
import axios from 'axios'
import jwt_decode from 'jwt-decode'


const EmpWorkHour = () => {
    
  const { isLoggedIn } = useSelector(state => {
    return {
       
      isLoggedIn: state.auth.login || localStorage.getItem('adminInfo')
    };
  });
  console.log(isLoggedIn)
  var isLoggedInJsonObject = {}
  try {

    isLoggedInJsonObject = JSON.parse(isLoggedIn); 
} catch (e) {

    isLoggedInJsonObject = isLoggedIn;
}   
 const decoded = jwt_decode(isLoggedInJsonObject.token)
    const email = decoded.email
  
    
    // test
    function Last7Days () {
      return '0123456'.split('').map(function(n) {
          var d = new Date();
          d.setDate(d.getDate() - n);
  
          return (function(month, day, year) {
              return [month<10 ? '0'+month : month, day<10 ? '0'+day : day, year].join('/');
          })(d.getMonth() + 1, d.getDate(), d.getFullYear());
      });
   }

   const last7Days = Last7Days()
   console.log(last7Days);
   const day0 = last7Days[0]
   const day1 = last7Days[1]
   const day2 = last7Days[2]
   const day3 = last7Days[3]
   const day4 = last7Days[4]
   const day5 = last7Days[5]
   const day6 = last7Days[6]
    // test

  const [sdata, setData] = useState('')
  const handleStartWork = async (e) => {
    const {data} = await axios.post(`${process.env.REACT_APP_API}/api/v1/work/start`, {email: email})
    setData(data)
    console.log(data);
  }
  const handleStopWork = async (e) => {
    const {data} = await axios.patch(`${process.env.REACT_APP_API}/api/v1/work/stop`, sdata)
    window.location.reload()
  }

    const [empWork, setEmpWork] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/works`, {params: {email: email}})    
      console.log(data);
      setEmpWork(data)
    }
    fetchData()
  }, [])

  function sortByDate(a, b) {
    if (a.date < b.date) {
        return 1;
    }
    if (a.date > b.date) {
        return -1;
    }
    return 0;
}
const sorted = empWork.sort(sortByDate);
console.log(sorted);




  const time = []
  const date = []
  sorted.map((work) => {
    time.push(work.duration.h + (work.duration.m)/60)
    date.push(work.date)
    
  })
  const nDate = []
  for(let i=0; i<7; i++) {
    nDate.push(date[i])
  }

  console.log(time);

  const data = {
    labels: nDate,
    datasets: [
      {
        label: "Work Hour",
        data: time,
        borderColor: ['#001737','#001737','#001737','#001737','#001737','#001737','#001737'],
        backgroundColor: ['#1ce1ac','#1ce1ac','#1ce1ac','#1ce1ac','#1ce1ac','#1ce1ac','#1ce1ac']
      }
    ]

  }
  const options = {
    title: {
      display: true,
      text: 'Last 7 Days Work Hour'
    },
    scales: {
      yAxes: [
        {
          ticks: {
            min: 0,
            max: 12,
            stepSize: 2
          }
        }
      ]
    }
  }

 

  return (
      <>
        <Row>
            <Col style={{top: '2rem', textAlign: 'center'}} md={8} sm={8} lg={8} xl={8}>
            <Button onClick={handleStartWork} type="primary" size='large'>
          Start Work
        </Button>
        
            </Col>
            <Col style={{top: '2rem', textAlign: 'center'}} md={8} sm={8} lg={8} xl={8}>
            <h4>Total Work Hour of last 7 Days: <strong></strong></h4> 
            </Col>
            <Col style={{top: '2rem', textAlign: 'center'}} md={8} sm={8} lg={8} xl={8}>
            <Button onClick={handleStopWork} type="primary" danger size='large'>
          Stop Work
        </Button>
        
            </Col>
        </Row>
          <Main style={{display: 'flex', justifyContent: 'center',width: '70vw', paddingTop: '4rem'}}>
            
            
            <Bar data={data} options={options} />
          </Main>
          
      </>
  )
}

export default EmpWorkHour