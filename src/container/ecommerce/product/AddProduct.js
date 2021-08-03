import React, { useState } from 'react';
import { Row, Col, Form, Input, InputNumber, Select, Upload, message, Space, Typography } from 'antd';
import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import FeatherIcon from 'feather-icons-react';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Main, BasicFormWrapper } from '../../styled';
import { Button } from '../../../components/buttons/buttons';
import { AddProductForm } from '../Style';
import axios from 'axios';
import swal from 'sweetalert';

const { Option } = Select;
const { Text } = Typography;

const AddProduct = () => {
  const [fields, setFields] = useState([]);

  console.log(fields);
  const props = {
    name: 'image',
    action: `${process.env.REACT_APP_API}/api/v1/blog/upload`,
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        console.log(info.file.response.Location);
        setFields({ ...fields, image: info.file.response.Location });
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const [selectEl, setSelectEl] = useState(false);

  const handleSelect = value => {
    if (value === 'select') {
      setSelectEl(true);
    } else {
      setSelectEl(false);
    }
  };

  const onFinish = async values => {
    console.log(values);
    // setFields({ ...fields, values });
    const postData = await axios
      .post(`${process.env.REACT_APP_API}/api/v1/product/create`, {
        image: fields,
        values,
      })
      .then(response => console.log(response))
      .catch(error => console.log(error));
    swal('Congratulation!', 'Product Added Successfully', 'success');
    window.location.reload();
  };

  return (
    <>
      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <Cards headless>
              <Row gutter={25} justify="center">
                <Col xxl={18} md={18} sm={18} xs={24}>
                  <AddProductForm>
                    <Form style={{ width: '100%' }} name="addProduct" onFinish={onFinish}>
                      <BasicFormWrapper>
                        <div className="add-product-block">
                          <Row gutter={15}>
                            <Col xs={24}>
                              <div className="add-product-content">
                                <Cards title="Add Product">
                                  <Form.Item
                                    name="title"
                                    label="Product Name"
                                    rules={[{ required: true, message: 'Missing Product Name' }]}
                                  >
                                    <Input />
                                  </Form.Item>
                                  <Form.Item
                                    name="price"
                                    label="Price"
                                    rules={[{ required: true, message: 'Missing Price' }]}
                                  >
                                    {/* <div className="input-prepend-wrap"> */}
                                    <InputNumber style={{ width: '100%' }} />
                                    {/* </div> */}
                                  </Form.Item>
                                  <Form.Item
                                    name="desc"
                                    label="Product Description"
                                    rules={[{ required: true, message: 'Missing Description' }]}
                                  >
                                    <Input.TextArea rows={5} />
                                  </Form.Item>
                                  <Upload {...props}>
                                    <span>Product Image: </span>
                                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                  </Upload>{' '}
                                  {/* test  */}
                                  <Cards title="Add Form Fields">
                                    <Form.List name="users">
                                      {(fields, { add, remove }) => (
                                        <>
                                          {fields.map(({ key, name, fieldKey, ...restField }) => (
                                            <Space
                                              key={key}
                                              style={{ display: 'flex', marginBottom: 8 }}
                                              align="baseline"
                                            >
                                              <Form.Item
                                                {...restField}
                                                name={[name, 'formType']}
                                                fieldKey={[fieldKey, 'formType']}
                                                rules={[{ required: true, message: 'Missing Options' }]}
                                              >
                                                {/* <Input placeholder="First Name" /> */}
                                                <Select style={{ width: 120 }} onChange={handleSelect}>
                                                  <Option value="textInp">Text Input</Option>
                                                  <Option value="imgField">Document Uploader</Option>
                                                  <Option value="numberInp">Number Input</Option>
                                                  <Option value="select">Dropdown</Option>
                                                  <Option value="date">Date Picker</Option>
                                                </Select>
                                              </Form.Item>
                                              <Form.Item
                                                {...restField}
                                                name={[name, 'label']}
                                                fieldKey={[fieldKey, 'label']}
                                                rules={[{ required: true, message: 'Missing Label' }]}
                                              >
                                                <Input placeholder="label" />
                                              </Form.Item>
                                              {/* test */}
                                              {selectEl ? (
                                                <Form.Item
                                                  {...restField}
                                                  name={[name, 'options']}
                                                  fieldKey={[fieldKey, 'options']}
                                                >
                                                  {/* <Text disabled>Type the Options with comma (,) separated..</Text> */}
                                                  <Input placeholder="Options" />
                                                </Form.Item>
                                              ) : null}
                                              {/* test */}
                                              <MinusCircleOutlined onClick={() => remove(name)} />
                                            </Space>
                                          ))}
                                          <Form.Item>
                                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                              Add field
                                            </Button>
                                          </Form.Item>
                                        </>
                                      )}
                                    </Form.List>
                                  </Cards>
                                  <Form.Item>
                                    <Button type="primary" htmlType="submit">
                                      Submit
                                    </Button>
                                  </Form.Item>
                                </Cards>
                              </div>
                            </Col>
                          </Row>
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
};

export default AddProduct;
