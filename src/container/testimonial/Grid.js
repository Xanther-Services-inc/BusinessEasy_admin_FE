import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import Testimonials from './AllTestimonials'
import { Row, Col, Pagination, Spin } from 'antd';


const Grid = () => {

    const [testi, setTesti] = useState([])
    useEffect(() => {
        const fetchData = async() => {
            const {data} = await Axios.get(`${process.env.REACT_APP_API}/api/v1/testimonials`)
            console.log(data);
            setTesti(data)

        }
        fetchData()
    }, [])
    console.log(testi);

    return (
        <div style={{margin: "1rem"}}>
            <Row gutter={24}>
            
            {testi.length != 0 ? testi.map(testimonial => (
                <Col key={testimonial.id} md={8} lg={6} xl={6} xs={24} lg={8}>
                    
                <Testimonials values={testimonial} />
            </Col>
            )) : "No data found"}
        </Row>
        </div>
    )
}

export default Grid;