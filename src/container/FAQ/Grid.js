import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import Faq from './AllFaq'
import { Row, Col, Pagination, Spin } from 'antd';


const Grid = () => {

    const [faqs, setFaqs] = useState([])
    useEffect(() => {
        const fetchData = async() => {
            const {data} = await Axios.get(`${process.env.REACT_APP_API}/api/v1/faqs`)
            console.log(data);
            setFaqs(data)

        }
        fetchData()
    }, [])
  

    return (
        <div style={{margin: "1rem"}}>
            <Row gutter={24}>
            
            {faqs.length != 0 ? faqs.map(faq => (
                <Col key={faq.id} md={8} lg={6} xl={6} xs={24} lg={8}>
                    
                <Faq values={faq} />
            </Col>
            )) : "No data found"}
        </Row>
        </div>
    )
}

export default Grid;