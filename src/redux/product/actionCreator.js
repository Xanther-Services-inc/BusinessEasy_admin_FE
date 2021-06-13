import actions from './actions';
// import initialState from '../../demoData/products.json';
import axios from 'axios'

const {
  ProductsBegin,
  ProductsSuccess,
  ProductsErr,
  
  ProductDetailsBegin,
  ProductDetailsSuccess,
  ProductDetailsErr,

  filterProductBegin,
  filterProductSuccess,
  filterProductErr,

  sortingProductBegin,
  sortingProductSuccess,
  sortingProductErr,
} = actions;

const allProducts = () => {
  return async dispatch => {
    try {
      dispatch(ProductsBegin())

      const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/products`)

      dispatch(ProductsSuccess(data))

    } catch(err) {
      dispatch(ProductsErr(err))
    }
  }
};

const productDetailsActionCreator = (id) => {
  return async dispatch => {
    try{
      dispatch(ProductDetailsBegin())

      const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product?id=${id}`)
      console.log('action');
      console.log(data);

      dispatch(ProductDetailsSuccess(data))

    } catch(err) {
      dispatch(ProductDetailsErr(err))
    }
  }
}

const sorting = sortBy => {
  return async dispatch => {
    try {
      dispatch(sortingProductBegin());
      setTimeout(() => {
        const data = initialState.sort((a, b) => {
          return b[sortBy] - a[sortBy];
        });
        dispatch(sortingProductSuccess(data));
      }, 100);
    } catch (err) {
      dispatch(sortingProductErr(err));
    }
  };
};

const filterByPriceRange = range => {
  return async dispatch => {
    dispatch(filterProductBegin());
    try {
      const data = initialState.filter(product => {
        return product.price >= range[0] && product.price <= range[1];
      });
      dispatch(filterProductSuccess(data));
    } catch (err) {
      dispatch(filterProductErr(err));
    }
  };
};

const filterByRating = range => {
  return async dispatch => {
    try {
      dispatch(filterProductBegin());
      setTimeout(() => {
        const data = initialState.filter(product => {
          if (range[0].length) {
            return range[0].includes(product.rate);
          }
          return initialState;
        });
        dispatch(filterProductSuccess(data));
      }, 100);
    } catch (err) {
      dispatch(filterProductErr(err));
    }
  };
};

const filterByBrand = brand => {
  return async dispatch => {
    try {
      dispatch(filterProductBegin());
      setTimeout(() => {
        const data = initialState.filter(product => {
          if (brand[0].length) {
            return brand[0].includes(product.brand);
          }
          return initialState;
        });
        dispatch(filterProductSuccess(data));
      }, 100);
    } catch (err) {
      dispatch(filterProductErr(err));
    }
  };
};

const filterByCategory = category => {
  return async dispatch => {
    try {
      dispatch(filterProductBegin());
      setTimeout(() => {
        const data = initialState.filter(product => {
          if (category !== 'all') {
            return product.category === category;
          }
          return initialState;
        });
        dispatch(filterProductSuccess(data));
      }, 100);
    } catch (err) {
      dispatch(filterProductErr(err));
    }
  };
};


const updateWishList = id => {
  return async dispatch => {
    try {
      dispatch(filterProductBegin());

      initialState.map(product => {
        if (product.id === id) {
          return product.popular ? (product.popular = false) : (product.popular = true);
        }
        return dispatch(filterProductSuccess(initialState));
      });
    } catch (err) {
      dispatch(filterProductErr(err));
    }
  };
};

export {
  allProducts,
  productDetailsActionCreator,
  sorting,
  filterByPriceRange,
  filterByRating,
  filterByBrand,
  filterByCategory,
  updateWishList,
};
