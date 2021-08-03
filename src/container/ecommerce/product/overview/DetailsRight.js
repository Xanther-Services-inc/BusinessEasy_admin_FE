import React, { useState } from 'react';
import { Row, Col, Image } from 'antd';
import PropTypes from 'prop-types';
import Heading from '../../../../components/heading/heading';
var _ = require('lodash');

const DetailsRight = ({ product }) => {
  console.log(product);
  const { id } = product;
  const image = _.get(product, 'image.image');
  const title = _.get(product, 'values.title');
  const price = _.get(product, 'values.price');
  const desc = _.get(product, 'values.desc');
  const steps = _.get(product, 'values.steps');
  const new_steps = steps.replace(/ /g, '').split(',');
  console.log(new_steps);

  return (
    <div className="product-details-box__right pdbr">
      <Row>
        <Col md={10} sm={24} lg={8} xl={8}>
          <Image style={{ cursor: 'pointer' }} width={200} src={image} />
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

          <p className="pdbr__desc">
            <u>Product Id:</u> {id}
          </p>
          <p className="pdbr__desc">
            <u>Description:</u> {desc}
          </p>
        </Col>
      </Row>
    </div>
  );
};

DetailsRight.propTypes = {
  product: PropTypes.object,
};

export default DetailsRight;
