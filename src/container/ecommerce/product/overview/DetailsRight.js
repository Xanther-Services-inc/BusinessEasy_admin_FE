import React, { useState } from 'react';
import {Row, Col, Image} from 'antd';
import PropTypes from 'prop-types';
import Heading from '../../../../components/heading/heading';


const DetailsRight = ({ product }) => {
 
  const { id, price, title, desc, doc_key } = product;

  return (

    <div className="product-details-box__right pdbr">
      <Row>
        <Col md={10} sm={24} lg={8} xl={8}>
            <Image style={{cursor: 'pointer'}} width={200} src={`https://products-imgs.s3.us-east-2.amazonaws.com/${doc_key}`} /> 
          </Col>
          <Col offset={2} />
        <Col md={12} sm={24} lg={14} xl={14}>
        <Heading className="pdbr__title" as="h2">
        {title}
      </Heading>     
      <Heading className="pdbr__new-price" as="h3">
        <u className="pdbr__currency">Price:</u>
        <span className="pdbr__price"> {price} Rs.</span>
      </Heading>
     
      <p className="pdbr__desc"><u>Product Id:</u> {id}</p>
      <p className="pdbr__desc"><u>Description:</u> {desc}</p>
     
        </Col>

      </Row>
    </div>
  );
};

DetailsRight.propTypes = {
  product: PropTypes.object,
};

export default DetailsRight;
