import React, { useState } from 'react';
import { Row, Col, Form, Input, InputNumber} from 'antd';
import FeatherIcon from 'feather-icons-react';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Main, BasicFormWrapper } from '../styled';
import { Button } from '../../components/buttons/buttons';
import { AddProductForm } from '../ecommerce/Style';
import Axios from 'axios';
import swal from 'sweetalert';

const AddTestimonial = () => {
  const [form] = Form.useForm();

  const [fileName, setFileName] = useState('')


  const onChangeFile = (e) => {
    setFileName(e.target.files[0])
    console.log(e);
}

  const handleSubmit = async (values) => {
    var fd = new FormData();
    fd.append('name',values.name);
    fd.append('message',values.message);
    fd.append('img', fileName)
 
    
  
  const config = {
    headers: {'content-type': 'multipart/form-data'}
}
  const url = `${process.env.REACT_APP_API}/api/v1/testimonial/create`;

  const proData = await Axios.post(url, fd, config).then((response) =>
        console.log(response)
    ).catch((error) => console.log(error))
    swal("Congratulation!", "Testimonial Added Successfully.", "success")

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
                                  <Form.Item name="name" label="Name">
                                    <Input />
                                  </Form.Item>
                               
                                  <Form.Item name="message" label="Message">
                                    <Input.TextArea rows={5} />
                                  </Form.Item>
                                 
                                </Cards>
                              </div>
                            </Col>
                          </Row>
                        </div>

                        <div className="add-product-block">
                          <Row gutter={15}>
                            <Col xs={24}>
                              <div className="add-product-content">
                                  <input
                                  fileName='image' name='img' onChange={onChangeFile} type='file'
                                  />
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

export default AddTestimonial;