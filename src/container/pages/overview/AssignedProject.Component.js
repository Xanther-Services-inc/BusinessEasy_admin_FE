import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Row, Col, Card} from 'antd'
import {Link} from 'react-router-dom'

const AssignedProject = ({email}) => {
    const [orders, setOrders] = useState([])

    useEffect(() => {
      const fetchOrders = async () => {
        const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/orders`)
        console.log(data);
        setOrders(data.filter((order) => (order.emp_assigned === email)))
      }
      fetchOrders()
    },[])
    console.log(orders);

    return (
        <>
            <h3 style={{textAlign: 'center'}}>Assigned Orders</h3>
          <hr />
          <div className="site-card-wrapper">
          <Row gutter={16}>
          {orders.length != 0 ? 
            orders.map(order => (  
              <Col key={order.id} md={8} lg={8} xl={8} sm={12} xs={24}>
                <Link to={`/admin/assigned-orders/${order.id}`}>
                <Card title={order.product_id} bordered={true}>
                  <p>Order Id: {order.id}</p>
                  <p>Order Date: {order.startDate}</p>
                  <p>Due Date: {order.dueDate ? order.dueDate : 'NA'}</p>
                  <p>Status: {order.status}</p>
                </Card>
                </Link>
              </Col>
            )) : <h1>No Assigned Order Found!</h1>
          }
            </Row>
          </div>
        </>
    )
}

export default AssignedProject;