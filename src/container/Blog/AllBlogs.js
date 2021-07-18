import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import BlogCard from './BlogCard';
import { Row, Col } from 'antd';

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await Axios.get(`${process.env.REACT_APP_API}/api/v1/blogs`);
      setBlogs(data);
    };
    fetchData();
  }, []);
  console.log(blogs);

  return (
    <>
      <Row gutter={24}>
        {blogs.length &&
          blogs.map(({ title, desc, doc_key, slug, id, author }) => {
            return (
              <Col style={{ paddingLeft: '2rem' }} md={8} sm={24} xl={6} lg={8}>
                <BlogCard title={title} desc={desc} doc_key={doc_key} slug={slug} id={id} author={author} />
              </Col>
            );
          })}
      </Row>
    </>
  );
};

export default AllBlogs;
