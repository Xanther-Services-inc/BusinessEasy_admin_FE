import React from 'react';
import { Card, Avatar } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import swal from 'sweetalert';
const { Meta } = Card;

const BlogCard = ({ title, desc, doc_key, id, author, slug }) => {
  const handleDelete = async slug => {
    const { data } = await Axios.delete(`${process.env.REACT_APP_API}/api/v1/blog/delete/${slug}`);
    swal('success', 'Blog deleted Successfully');
    window.location.reload();
  };
  return (
    <>
      <Link to={`blog/${slug}`}>
        <Card
          style={{ width: 300 }}
          cover={
            <img
              alt={title}
              style={{ height: 280 }}
              src={`https://business-easy-bucket.s3.us-east-2.amazonaws.com/${doc_key}`}
            />
          }
          // actions={[<DeleteOutlined onClick={() => handleDelete(slug)} key="delete" style={{ color: '#a84832' }} />]}
        >
          <Meta
            //   avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
            title={title}
            // description={desc}
          />
        </Card>
      </Link>
      <DeleteOutlined onClick={() => handleDelete(slug)} style={{ color: '#a84832', marginLeft: '9rem' }} />
    </>
  );
};

export default BlogCard;
