import React, { useEffect, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Skeleton } from 'antd';
import PropTypes from 'prop-types';
import { Main } from '../../styled';
import { productDetailsActionCreator } from '../../../redux/product/actionCreator';
import { ProductDetailsWrapper } from '../Style';
import { Cards } from '../../../components/cards/frame/cards-frame';

const DetailsRight = lazy(() => import('./overview/DetailsRight'));

const ProductDetails = ({ match }) => {
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetail)
  const {loading, data, error} = productDetails


  useEffect(() => {
    dispatch(productDetailsActionCreator(match.params.id))
  }, [dispatch])

  return (
    <>
      
      <Main>
        <Cards headless>
          <ProductDetailsWrapper>
            <div className="product-details-box">
              <Row gutter={30}>
                
                <Col xs={24} lg={14}>
                  <Suspense
                    fallback={
                      <Cards headless>
                        <Skeleton active />
                      </Cards>
                    }
                  > {loading ? 'Loading...' : data ? <DetailsRight product={data} /> : error }
                    
                  </Suspense>
                </Col>
              </Row>
            </div>
          </ProductDetailsWrapper>
        </Cards>
      </Main>
    </>
  );
};

ProductDetails.propTypes = {
  match: PropTypes.object,
};

export default ProductDetails;
