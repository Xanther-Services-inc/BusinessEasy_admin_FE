import React, { useEffect, useState } from 'react';
import {Row, Col, Image} from 'antd';
import PropTypes from 'prop-types';
import Heading from '../../components/heading/heading';
import Axios from 'axios';


const TestimonialDetails = ({match}) => {
 
    const [testiDetails, setTestidetails] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            const {data} = await Axios.get(`${process.env.REACT_APP_API}/api/v1/testimonial?id=${match.params.id}`)
            console.log(data);
            setTestidetails(data)
        }
        fetchData()
    }, [])

  const { id, name, message, doc_key } = testiDetails;

  return (

    <div className="product-details-box__right pdbr">
        <br />
      <Row>
          
        <Col md={10} sm={24} lg={8} xl={8}>
            <Image style={{cursor: 'pointer'}} width={200} src={`https://testi-monial.s3.us-east-2.amazonaws.com/${doc_key}`} /> 
          </Col>
          <Col offset={2} />
        <Col md={12} sm={24} lg={14} xl={14}>
        <Heading className="pdbr__title" as="h2">
        {name}
      </Heading> 
     
      <p className="pdbr__desc">Id: {id}</p>
      <p className="pdbr__desc">Message: {message}</p>
     
        </Col>

      </Row>
    </div>
  );
};

TestimonialDetails.propTypes = {
  product: PropTypes.object,
};

export default TestimonialDetails;
