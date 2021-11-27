import React, { useState } from 'react';
import { Row, Col, Image, Form, Input, InputNumber, DatePicker, Select, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
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
  const fields = _.get(product, 'values.users');
  const new_steps = steps.replace(/ /g, '').split(',');

  console.log(fields);

  return (
    <>
      <div className="product-details-box__right pdbr">
        <Row>
          <Col md={10} sm={24} lg={8} xl={8}>
            <Image style={{ cursor: 'pointer' }} width={400} src={image} />
          </Col>
          <Col offset={2} />
          <Col md={12} sm={24} lg={14} xl={14}>
            <Heading className="pdbr__title" as="h2">
              {title}
            </Heading>
            <Heading className="pdbr__new-price" as="h3">
              <u className="pdbr__currency">Price:</u>
              <span className="pdbr__price"> Rs. {price} </span>
            </Heading>

            <p className="pdbr__desc">
              <u>Product Id:</u> {id}
            </p>
            <p className="pdbr__desc">
              <u>Description:</u> {desc}
            </p>
          </Col>
        </Row>
        <br />
        <br />
        <br />
      </div>
      <Heading className="pdbr__new-price" as="h3">
        Order Creation Form
      </Heading>
      <br />
      <Row gutter={30}>
        {fields &&
          fields.map(field => {
            return field.formType === 'textInp' ? (
              <Col md={8} xs={24}>
                <Form.Item name={field.label} label={field.label}>
                  <Input />
                </Form.Item>
              </Col>
            ) : field.formType === 'imgField' ? (
              <Col md={8} xs={24}>
                <Upload>
                  <label>{field.label}: </label>

                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </Col>
            ) : field.formType === 'numberInp' ? (
              <Col md={8} xs={24}>
                <Form.Item name={field.label} label={field.label}>
                  <InputNumber />
                </Form.Item>
              </Col>
            ) : field.formType === 'select' ? (
              <Col md={8} xs={24}>
                <Form.Item name={field.label} label={field.label}>
                  <Select>
                    {console.log(field.options.split(','))}
                    {field.options.split(',').map(opt => (
                      <Option value={opt}>{opt}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            ) : field.formType === 'date' ? (
              <Col md={8} xs={24}>
                <Form.Item name={field.label} label={field.label}>
                  <DatePicker />
                </Form.Item>
              </Col>
            ) : (
              <Col md={8} xs={24}>
                <Form.Item name={field.label} label={field.label}>
                  <Input />
                </Form.Item>
              </Col>
            );
          })}
      </Row>
    </>
  );
};

DetailsRight.propTypes = {
  product: PropTypes.object,
};

export default DetailsRight;
