import React, { useState } from 'react';
import { Row, Col, Form, Input, InputNumber} from 'antd';
import FeatherIcon from 'feather-icons-react';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Main, BasicFormWrapper } from '../styled';
import { Button } from '../../components/buttons/buttons';
import { AddProductForm } from '../ecommerce/Style';
import Axios from 'axios';
import swal from 'sweetalert';

const AddFAQ = () => {
  const [form] = Form.useForm();


  const handleSubmit = async (values) => {
    
  const url = `${process.env.REACT_APP_API}/api/v1/faq/create`;

  const proData = await Axios.post(url, values).then((response) =>
        console.log(response)
    ).catch((error) => console.log(error))
    swal("Congratulation!", "FAQ Added Successfully.", "success")

    window.location.reload()
  }


  return (
    <>
      
      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <Cards headless>
              <Row gutter={25} justify="center">
                <Col xxl={12} md={14} sm={18} xs={24}>
                  <AddProductForm>
                    <Form style={{ width: '100%' }} form={form} name="addProduct" onFinish={handleSubmit}>
                      <BasicFormWrapper>
                        <div className="add-product-block">
                          <Row gutter={15}>
                            <Col xs={24}>
                              <div className="add-product-content">
                                <Cards title="Add Testimonial">
                                  <Form.Item name="ques" label="Question">
                                    <Input />
                                  </Form.Item>
                               
                                  <Form.Item name="ans" label="Answer">
                                    <Input.TextArea rows={5} />
                                  </Form.Item>
                                 
                                </Cards>
                              </div>
                            </Col>
                          </Row>
                        </div>

                        <div className="add-form-action">
                          <Form.Item>
                            <Button
                              className="btn-cancel"
                              size="large"
                              onClick={() => {
                                return form.resetFields();
                              }}
                            >
                              Cancel
                            </Button>
                            <Button size="large" htmlType="submit" type="primary" raised>
                              Save
                            </Button>
                          </Form.Item>
                        </div>
                      </BasicFormWrapper>
                    </Form>
                  </AddProductForm>
                </Col>
              </Row>
            </Cards>
          </Col>
        </Row>
      </Main>
    </>
  );
} 

export default AddFAQ;