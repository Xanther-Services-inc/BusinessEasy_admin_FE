const actions = {
  PRODUCTS_BEGIN: 'PRODUCTS_BEGIN',
  PRODUCTS_SUCCESS: 'PRODUCTS_SUCCESS',
  PRODUCTS_ERR: 'PRODUCTS_ERR',

  PRODUCT_DETAILS_BEGIN: 'PRODUCT_DETAILS_BEGIN',
  PRODUCT_DETAILS_SUCCESS: 'PRODUCT_DETAILS_SUCCESS',
  PRODUCT_DETAILS_ERR: 'PRODUCT_DETAILS_ERR',

  FILTER_PRODUCT_BEGIN: 'FILTER_PRODUCT_BEGIN',
  FILTER_PRODUCT_SUCCESS: 'FILTER_PRODUCT_SUCCESS',
  FILTER_PRODUCT_ERR: 'FILTER_PRODUCT_ERR',

  SORTING_PRODUCT_BEGIN: 'SORTING_PRODUCT_BEGIN',
  SORTING_PRODUCT_SUCCESS: 'SORTING_PRODUCT_SUCCESS',
  SORTING_PRODUCT_ERR: 'SORTING_PRODUCT_ERR',

  
  ProductsBegin: () => {
    return {
      type: actions.PRODUCTS_BEGIN,
    };
  },

  ProductsSuccess: data => {
    return {
      type: actions.PRODUCTS_SUCCESS,
      data,
    };
  },

  ProductsErr: err => {
    return {
      type: actions.PRODUCTS_ERR,
      err,
    };
  },

  ProductDetailsBegin: () => {
    return {
      type: actions.PRODUCT_DETAILS_BEGIN,
    };
  },

  ProductDetailsSuccess: data => {
    return {
      type: actions.PRODUCT_DETAILS_SUCCESS,
      product: data
    };
  },

  ProductDetailsErr: err => {
    return {
      type: actions.PRODUCT_DETAILS_ERR,
      err,
    };
  },


  filterProductBegin: () => {
    return {
      type: actions.FILTER_PRODUCT_BEGIN,
    };
  },

  filterProductSuccess: data => {
    return {
      type: actions.FILTER_PRODUCT_SUCCESS,
      data,
    };
  },

  filterProductErr: err => {
    return {
      type: actions.FILTER_PRODUCT_ERR,
      err,
    };
  },

  sortingProductBegin: () => {
    return {
      type: actions.SORTING_PRODUCT_BEGIN,
    };
  },

  sortingProductSuccess: data => {
    return {
      type: actions.SORTING_PRODUCT_SUCCESS,
      data,
    };
  },

  sortingProductErr: err => {
    return {
      type: actions.SORTING_PRODUCT_ERR,
      err,
    };
  },
};

export default actions;
