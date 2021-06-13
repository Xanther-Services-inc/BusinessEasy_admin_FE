import actions from './actions';
// import staticData from '../../demoData/products.json';

const {
  PRODUCTS_BEGIN,
  PRODUCTS_SUCCESS,
  PRODUCTS_ERR,

  PRODUCT_DETAILS_BEGIN,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_ERR,
  
  FILTER_PRODUCT_BEGIN,
  FILTER_PRODUCT_SUCCESS,
  FILTER_PRODUCT_ERR,

  SORTING_PRODUCT_BEGIN,
  SORTING_PRODUCT_SUCCESS,
  SORTING_PRODUCT_ERR,
} = actions;

const initialStateFilter = {
  data: [],
  loading: false,
  error: null,
};

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const detailInitialState = {
  data: [],
  loading: false,
  error: null,
};

// const productReducer = (state = initialStateFilter, action) => {
//   const { type, data, err } = action;
//   switch (type) {
//     case FILTER_PRODUCT_BEGIN:
//       return {
//         ...initialState,
//         loading: true,
//       };
//     case FILTER_PRODUCT_SUCCESS:
//       return {
//         ...initialState,
//         data,
//         loading: false,
//       };
//     case FILTER_PRODUCT_ERR:
//       return {
//         ...initialState,
//         error: err,
//         loading: false,
//       };
//     case SORTING_PRODUCT_BEGIN:
//       return {
//         ...initialState,
//         loading: true,
//       };
//     case SORTING_PRODUCT_SUCCESS:
//       return {
//         ...initialState,
//         data,
//         loading: false,
//       };
//     case SORTING_PRODUCT_ERR:
//       return {
//         ...initialState,
//         error: err,
//         loading: false,
//       };
//     default:
//       return state;
//   }
// };

const ProductsReducer = (state = initialState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case PRODUCTS_BEGIN:
      return {
        ...initialState,
        loading: true,
      };
    case PRODUCTS_SUCCESS:
      return {
        ...initialState,
        data,
        loading: false,
      };
    case PRODUCTS_ERR:
      return {
        ...initialState,
        error: err,
        loading: false,
      };
    default:
      return state;
  }
};

const productDetailsReducer = (state = detailInitialState, action) => {
  const { type, product, err } = action
  
  console.log(detailInitialState);
  switch (type) {
    case PRODUCT_DETAILS_BEGIN:
      return {
        ...detailInitialState,
        loading: true
      };
    case PRODUCT_DETAILS_SUCCESS:
      return {
        ...detailInitialState,
        data: product,
        loading: false
      };
    case PRODUCT_DETAILS_ERR:
      return {
        ...detailInitialState,
        error: err,
        loading: false
      }
      default:
      return state;
  }
}

export { ProductsReducer, productDetailsReducer };
