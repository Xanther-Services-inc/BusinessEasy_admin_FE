import React, { useState, useEffect } from 'react';
import { Row, Col, Pagination, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import ProductCards from './ProductCards';
import Heading from '../../../../components/heading/heading';
import { PaginationWrapper, NotFoundWrapper } from '../../Style';
import { allProducts } from '../../../../redux/product/actionCreator';

const Grid = () => {
  // const { productsAll, isLoader } = useSelector(state => {
  //   return {
  //     productsAll: state.products.data,
  //     isLoader: state.products.loading,
  //   };
  // });

  // const [state, setState] = useState({
  //   products: productsAll,
  //   current: 0,
  //   pageSize: 0,
  // });

  // const { products } = state;

  // useEffect(() => {
  //   if (productsAll) {
  //     setState({
  //       products: productsAll,
  //     });
  //   }
  // }, [productsAll]);

  const onShowSizeChange = (current, pageSize) => {
    setState({ ...state, current, pageSize });
  };

  const onHandleChange = (current, pageSize) => {
    // You can create pagination in here
    setState({ ...state, current, pageSize });
  };

  const dispatch = useDispatch();
  const productList = useSelector(state => state.products);
  const { loading, error, data } = productList;
  console.log(data);

  useEffect(() => {
    dispatch(allProducts());
  }, [dispatch]);

  return (
    <Row gutter={30}>
      {loading ? (
        <Col xs={24}>
          <div className="spin">
            <Spin />
          </div>
        </Col>
      ) : data.length ? (
        data.map(product => {
          return (
            <Col xxl={6} lg={8} md={8} xs={24} key={product.id}>
              <ProductCards product={product} />
            </Col>
          );
        })
      ) : (
        <Col md={24}>
          <NotFoundWrapper>
            <Heading as="h1">Data Not Found</Heading>
          </NotFoundWrapper>
        </Col>
      )}
    </Row>
  );
};

export default Grid;
