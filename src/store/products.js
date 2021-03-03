import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import { isLoggedIn } from "./auth";
import moment from "moment";

const slice = createSlice({
  name: "products",
  initialState: { list: [], loading: false},
  reducers: {
    // action => action handler
    // add posted product
    productPosted: (products, action) => {
        products.list.push(action.payload);
    },
    productEdited: (products, action) => {
        const productIds = products.list.map(product => product.pid); 
        const index = productIds.indexOf(action.payload.pid);

        // remove existing flavor and add edited one
        products.list = products.list.filter(product => (product.pid !== action.payload.pid));
        products.list.splice(index, 0, action.payload);
    },
    productsRequested: (products, action) => {
        products.loading = true;
    },
    productsReceived: (products, action) => {
        products.list = action.payload;
        products.loading = false;
    },
    productsRequestFailed: (products, action) => {
      products.loading = false;
      console.log(action.payload);
    }
  },
});

// expose action handlers
export const { 
  productPosted, 
  productsRequested, 
  productsReceived, 
  productsRequestFailed, 
  productEdited, 
  productsCurrentPageUpdated } = slice.actions;


export const getProducts = () =>
  apiCallBegan({
    url: "/products",
    method: "get",
    onSuccess: productsReceived.type,
    onStart: productsRequested.type,
    onError: productsRequestFailed.type,
  });

  
  export const deleteProduct = (product) => (dispatch, getState) => {
    if (!isLoggedIn()) {
      const mustLoginMessage = "You have to login to be able to delete products!";
      window.alert(mustLoginMessage);
      throw {
        response: {
          data: mustLoginMessage,
          status: 400,
        },
      };
    }

    return dispatch(
      apiCallBegan({
        url: `/products/${product.pid}`,
        method: product.active?"delete":"post",
        onSuccess: productEdited.type,
      })
    );
  }

  
  export const editProduct = (product) => (dispatch, getState) => {
    if (!isLoggedIn()) {
      const mustLoginMessage = "You have to login to be able to edit products!";
      window.alert(mustLoginMessage);
      throw {
        response: {
          data: mustLoginMessage,
          status: 400,
        },
      };
    }
        
    return dispatch(
      apiCallBegan({
        url: `/products/${product.pid}`,
        method: "put",
        data: {name:product.name, price:product.price},
        onSuccess: productEdited.type,
      })
    );
  };


export const postProduct = (product) => (dispatch, getState) => {
  if (!isLoggedIn()) {
    const mustLoginMessage = "You have to login to be able to post products!";
    window.alert(mustLoginMessage);
    throw {
      response: {
        data: mustLoginMessage,
        status: 400,
      },
    };
  }

  return dispatch(
    apiCallBegan({
      url: "/products",
      method: "post",
      data: product,
      onSuccess: productPosted.type,
    })
  );
};


export default slice.reducer;
