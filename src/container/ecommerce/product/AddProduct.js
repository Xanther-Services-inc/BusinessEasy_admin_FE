import React, { useState } from 'react';
import { Row, Col, Form, Input, InputNumber} from 'antd';
import FeatherIcon from 'feather-icons-react';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Main, BasicFormWrapper } from '../../styled';
import { Button } from '../../../components/buttons/buttons';
import { AddProductForm } from '../Style';
import Axios from 'axios';
import swal from 'sweetalert';

const AddProduct = () => {
  const [form] = Form.useForm();

  const [fileName, setFileName] = useState('')


  const onChangeFile = (e) => {
    setFileName(e.target.files[0])
    console.log(e);
}

  const handleSubmit = async (values) => {
    var fd = new FormData();
    fd.append('title',values.title);
    fd.append('price',values.price);
    fd.append('desc',values.desc);
    fd.append('image', fileName)
 
    
  
  const config = {
    headers: {'content-type': 'multipart/form-data'}
}
  const url = `${process.env.REACT_APP_API}/api/v1/product/create`;

  const proData = await Axios.post(url, fd, config).then((response) =>
        console.log(response)
    ).catch((error) => console.log(error))
    swal("Congratulation!", "Product Added Successfully", "success")

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
                                <Cards title="Add Product">
                                  <Form.Item name="title" label="Product Name">
                                    <Input />
                                  </Form.Item>
                               

                                  <Form.Item name="price" label="Price">
                                    <div className="input-prepend-wrap">
                                      <span className="input-prepend">
                                        <FeatherIcon icon="dollar-sign" size={14} />
                                      </span>
                                      <InputNumber style={{ width: '100%' }} />
                                    </div>
                                  </Form.Item>

                                  

                                  <Form.Item name="desc" label="Product Description">
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
                                  fileName='image' name='image' onChange={onChangeFile} type='file'
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
                              Save Product
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

export default AddProduct;