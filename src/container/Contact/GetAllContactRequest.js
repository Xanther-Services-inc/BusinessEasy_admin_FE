import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import Axios from 'axios';

const GetAllContactRequest = () => {

    const columns = [
      {
        title: 'First Name',
        dataIndex: 'firstName',
        render: (text, record) => <a href={`contact-message/${record.id}`}>{text}</a>,
      },
      {
        title: 'Last Name',
        dataIndex: 'lastName',
        render: (text, record) => <a href={`contact-message/${record.id}`}>{text}</a>,
      },
      {
        title: 'Phone',
        className: 'column-money',
        dataIndex: 'phone',
        align: 'right',
        render: (text, record) => <a href={`contact-message/${record.id}`}>{text}</a>,
      },
      {
        title: 'Email',
        dataIndex: 'email',
        render: (text, record) => <a href={`contact-message/${record.id}`}>{text}</a>,
      },
    ];
    
    // const data = []
    const [data, setData] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const {data} = await Axios.get(`${process.env.REACT_APP_API}/api/v1/contact/all`)
            console.log(data);
            setData(data)
        }
        fetchData()
    }, [])
    console.log(data);
    //   {
    //     key: '1',
    //     name: 'John Brown',
    //     money: '￥300,000.00',
    //     address: 'New York No. 1 Lake Park',
    //   },
    //   {
    //     key: '2',
    //     name: 'Jim Green',
    //     money: '￥1,256,000.00',
    //     address: 'London No. 1 Lake Park',
    //   },
    //   {
    //     key: '3',
    //     name: 'Joe Black',
    //     money: '￥120,000.00',
    //     address: 'Sidney No. 1 Lake Park',
    //   },
    // ];
    
   
    return (
        <div>
            <Table
        columns={columns}
        dataSource={data}
        bordered
      
      />
        </div>
    )
}

export default GetAllContactRequest
