import React, { useState, useEffect } from 'react';
import { Row, Col, Image } from 'antd';
import Heading from '../../components/heading/heading';
import { Button } from '../../components/buttons/buttons';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import swal from 'sweetalert';
import './BlogDetails.css';

const BlogDetails = () => {
  const { slug } = useParams();
  console.log(slug);
  const [blog, setBlog] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await Axios.get(`${process.env.REACT_APP_API}/api/v1/blog/${slug}`);
      setBlog(data);
    };
    fetchData();
  }, [slug]);
  const { id, doc_key, author, title, desc } = blog;

  console.log(desc);

  //   const handleDelete = e => {
  //     e.preventDefault();
  //     swal({
  //       title: 'Are you sure?',
  //       text: 'Once deleted, you will not be able to recover this imaginary file!',
  //       icon: 'warning',
  //       buttons: true,
  //       dangerMode: true,
  //     }).then(willDelete => {
  //       if (willDelete) {
  //         Axios.delete(`${process.env.REACT_APP_API}/api/v1/blog/delete/${slug}`);
  //         swal('Poof! Your imaginary file has been deleted!', {
  //           icon: 'success',
  //         }).then(function() {
  //           location.replace('/admin/blogs');
  //         });
  //       } else {
  //         swal('Your imaginary file is safe!');
  //         location.reload();
  //       }
  //     });
  //   };
  return (
    <div className="product-details-box__right pdbr">
      <Row>
        <Col
          style={{ paddingTop: '2rem' }}
          md={{ span: 16, offset: 4 }}
          sm={{ span: 20, offset: 2 }}
          lg={{ span: 16, offset: 4 }}
          xl={{ span: 16, offset: 4 }}
        >
          <Heading className="pdbr__title title" as="h1">
            {title}
          </Heading>

          <p className="pdbr__currency" style={{ textAlign: 'center' }}>
            Author:<span className="pdbr__price"> [{author}] </span>
          </p>
        </Col>
        <Col
          md={{ span: 12, offset: 6 }}
          sm={{ span: 20, offset: 2 }}
          lg={{ span: 12, offset: 6 }}
          xl={{ span: 12, offset: 6 }}
        >
          <hr />

          <br />
          <Image
            style={{ cursor: 'pointer', height: '16vh', width: '20vw' }}
            src={`https://business-easy-bucket.s3.us-east-2.amazonaws.com/${doc_key}`}
          />
          <br />
          <br />
          <hr />
        </Col>
        <Col offset={2} />
        <Col
          md={{ span: 16, offset: 4 }}
          sm={{ span: 22, offset: 1 }}
          lg={{ span: 16, offset: 4 }}
          xl={{ span: 16, offset: 4 }}
        >
          <p className="pdbr__desc">
            <div dangerouslySetInnerHTML={{ __html: desc }} />
          </p>
        </Col>
      </Row>
      <div className="product-single-action">
        {/* <Button size="small" type="white" className="btn-cart" outlined>
            <FeatherIcon icon="shopping-bag" size={14} />
            Add To Cart
          </Button> */}
        {/* <Button size="small" type="primary">
          <Link to={`edit/${slug}`}>Edit</Link>
        </Button> */}
        <span> </span>
        {/* <Button size="small" type="primary" onclick={handleDelete}>
          Delete Blog
        </Button> */}
      </div>
    </div>
  );
};

export default BlogDetails;
