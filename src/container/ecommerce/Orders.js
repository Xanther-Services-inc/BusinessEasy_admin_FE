import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Radio, Table } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { TopToolBox } from './Style';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main, TableWrapper } from '../styled';
import { AutoComplete } from '../../components/autoComplete/autoComplete';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { orderFilter, orderStatusUpdate } from '../../redux/orders/actionCreator';

import { ShareButtonPageHeader } from '../../components/buttons/share-button/share-button';
import { ExportButtonPageHeader } from '../../components/buttons/export-button/export-button';
import { CalendarButtonPageHeader } from '../../components/buttons/calendar-button/calendar-button';
import updateOrderStatus from './updateOrderStatus';
import Axios from 'axios';
import swal from 'sweetalert';



const Orders = () => {
  const dispatch = useDispatch();

const orderList = useSelector((state) => state.orders);


  
const { loading, error, data } = orderList;

console.log(data);

useEffect(() => {
  dispatch(orderFilter());
  dispatch(orderStatusUpdate())
}, [dispatch]);



const [empList, setEmpList] = useState(null)

useEffect(() => {
  async function empData() {
    let response = await fetch(`${process.env.REACT_APP_API}/api/v1/employee`)
    response = await response.json()
    setEmpList(response)
  }
  empData()
  
}, [])

console.log(empList);

const deleteOrder = (id) => {
  try {
    const del = Axios.delete(`${process.env.REACT_APP_API}/api/v1/order/delete?id=${id}`)
  } catch(err){
    console.log(err);
  }
}

const orderEmpAssign = async (e) => {
    
  const {value} = e.target
  

  try{
      const data = await axios.patch(`${process.env.REACT_APP_API}/api/v1/b_manager/emp-assign`, {id: id, startDate: startDate, employee: value})
      swal("Congrates!", "Successfully Assigned Employee", "success")
      window.location.reload()
      console.log(id);
  console.log(value);
  console.log(startDate);
  } catch(err) {
      console.log(err);
  }

}
  const dataSource = [];
  if (data.length) {
    data.map((value, key) => {
      const { id, product_id, firstName, lastName, email, phone, gender, country, dob, pan, status, emp_assigned, doc_key } = value;
      return dataSource.push({
        key: key + 1,
        id: <span className="order-id">{id}</span>,
        product_id: <span className="order-id">{product_id}</span>,
        firstName: <span className="customer-name">{firstName}</span>,
        lastName: <span className="customer-name">{lastName}</span>,
        status: (
          <span onClick={updateOrderStatus}>
            <select id={id}>
              <option value={status}>{status}</option>
              <option value='Pending'>Pending</option>
              <option value='In Progress'>In Progress</option>
              <option value='Completed'>Completed</option>
            </select>
          
          </span>
        ),
        phone: <span className="customer-name">{phone}</span>,

        dob: <span className="customer-name">{dob}</span>,
        country: <span className="customer-name">{country}</span>,
        gender: <span className="customer-name">{gender}</span>,
        pan: <span className="customer-name">{pan}</span>,
        // status: <span className="customer-name">{status}</span>,

        // amount: <span className="ordered-amount">0</span>,
        email: <span className="ordered-date">{email}</span>,
        emp_assigned: <span className="ordered-date" onClick={orderEmpAssign}>
        <select>
          {
            empList ? empList.map((emp) => {
              return (
                <option key={emp.email} value={emp.email}>{emp.email}</option>
              )
            }) : null
          }
        </select>
        </span>,

        action: <Button onClick={() => deleteOrder(id)} size="small" type="primary">
        Delete
      </Button>
      });
    });
  }

  const columns = [
    {
      title: 'Order Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Product Id',
      dataIndex: 'product_id',
      key: 'productId',
    },
    {
      title: 'FirstName',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'LastName',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'DOB',
      dataIndex: 'dob',
      key: 'dob',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'PAN',
      dataIndex: 'pan',
      key: 'pan',
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
    },
    
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    
    {
      title: 'Emp_assigned',
      dataIndex: 'emp_assigned',
      key: 'emp_assigned',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
    },
  ];



  return (
    <>
      <PageHeader
        ghost
        title="Orders"
        buttons={[
          <div key="1" className="page-header-actions">
            <CalendarButtonPageHeader key="1" />
            <ExportButtonPageHeader key="2" />
            <ShareButtonPageHeader key="3" />
            <Button size="small" key="4" type="primary">
              <FeatherIcon icon="plus" size={14} />
              Add New
            </Button>
          </div>,
        ]}
      />
      <Main>
        <Cards headless>
          <Row gutter={15}>
            <Col xs={24}>
              <TopToolBox>
                <Row gutter={15} className="justify-content-center">
                  <Col lg={6} xs={24}>
                    <div className="table-search-box">
                      <AutoComplete dataSource={dataSource} width="100%" patterns />
                    </div>
                  </Col>
                  
                  <Col xxl={4} xs={24}>
                    <div className="table-toolbox-actions">
                      <Button size="small" type="secondary" transparented>
                        Export
                      </Button>
                      <Button size="small" type="primary">
                        <FeatherIcon icon="plus" size={12} /> Add Order
                      </Button>
                    </div>
                  </Col>
                </Row>
              </TopToolBox>
            </Col>
          </Row>
          <Row gutter={15}>
            <Col md={24}>
              <TableWrapper className="table-order table-responsive">
                <Table
                  
                  dataSource={dataSource}
                  columns={columns}
                  pagination={{ pageSize: 7, showSizeChanger: true, total: data.length }}
                />
                
              </TableWrapper>
            </Col>
          </Row>
        </Cards>
      
      </Main>
    </>
  );
};

export default Orders;
