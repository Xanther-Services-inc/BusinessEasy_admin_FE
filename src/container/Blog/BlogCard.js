import React from 'react';
import { Card, Avatar } from 'antd';
import { DeleteOutlined,EditOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import swal from 'sweetalert';
import EditBlog from './EditBlog';
const { Meta } = Card;
import { Route } from 'react-router';
const BlogCard = ({ title, desc, doc_key, id, author, slug }) => {
  const handleDelete = async slug => {
    const { data } = await Axios.delete(`${process.env.REACT_APP_API}/api/v1/blog/delete/${slug}`);
    swal('success', 'Blog deleted Successfully');
    window.location.reload();
  };
  // const editBlog =({title, desc, doc_key, id, author, slug})=>{
  //   console.log(title, desc, doc_key, id, author, slug);
  //   window.open('/')
  // }
  return (
    <>
      <Link exact to={`blog/${slug}`}>
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
      <div style={{flexDirection:'column'}}>
        <DeleteOutlined onClick={() => handleDelete(slug)} style={{ color: '#a84832', marginLeft: '9rem' }} />
        <Link to={{
          pathname:`edit-blog/${slug}`,
          state:({title, desc, doc_key, id, author, slug})
        }}>
        <EditOutlined style={{ color: '#a84832', marginLeft: '9rem' }} />
        </Link>
      </div>
      <Route exact path={`edit-blog/${slug}`} component={EditBlog} />
    </>
  );
};

export default BlogCard;
