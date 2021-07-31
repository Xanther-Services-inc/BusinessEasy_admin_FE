import React from 'react';
import { Rate } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Heading from '../../../../components/heading/heading';
import { Button } from '../../../../components/buttons/buttons';
import { ProductCard } from '../../Style';
import { updateWishList } from '../../../../redux/product/actionCreator';
import Axios from 'axios';
import swal from 'sweetalert';
var _ = require('lodash');

const ProductCards = ({ product }) => {
  const { id } = product;
  console.log(product);
  const image = _.get(product, 'image.image');
  const title = _.get(product, 'values.title');
  const price = _.get(product, 'values.price');
  const desc = _.get(product, 'values.desc');
  console.log(image);
  const dispatch = useDispatch();

  const deleteProduct = async id => {
    try {
      const del = await Axios.delete(`${process.env.REACT_APP_API}/api/v1/product/delete?id=${id}`);
      swal('Congratulation!', 'Product Deleted Successfully', 'warning');

      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ProductCard style={{ marginBottom: 30 }}>
      <Link to={`/admin/ecommerce/productDetails/${id}`}>
        <figure>
          <img style={{ width: '100%', height: '13rem' }} src={image} alt={image} />
        </figure>
        <figcaption>
          <Heading className="product-single-title" as="h5">
            {title}
          </Heading>
          <p className="product-single-price">
            <span className="product-single-price__new">${price}</span>
          </p>

          <div className="product-single-action"></div>
        </figcaption>
      </Link>
      <Button
        style={{ marginLeft: '40%', marginBottom: '5px' }}
        onClick={() => deleteProduct(id)}
        size="medium"
        type="primary"
      >
        <FeatherIcon icon="trash-2" size={14} />
      </Button>
    </ProductCard>
  );
};

ProductCards.propTypes = {
  product: PropTypes.object,
};

export default ProductCards;
