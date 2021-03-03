import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import { isEmployee, isLoggedIn } from "./auth";
import _ from "underscore";

// cart slice for reducer
const slice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    // action => action handler
    // clear cart after posting
    cartPosted: (cart, action) => {
      cart.length = 0;  
    },
    // cart item edited
    editedInCart: (cart, action) => {
      const toEdit = action.payload;

      // generate cart item key 
      const toEditKey = genItemKey(toEdit);

      // generate array of item keys in cart
      const cartItemKeys = cart.map(item => genItemKey(item));
      
      // if edited item is already in cart increase its amount  
      if (cartItemKeys.includes(toEditKey)) {
        const index = cartItemKeys.indexOf(toEditKey);
        cart[index].amount = toEdit.amount;
      }
    },

    addedToCart: (cart, action) => {
      const newItem = action.payload;

      // generate cart item key based on product id and flavor ids
      const newItemKey = genItemKey(newItem);
      // generate array of item keys in cart
      const cartItemKeys = cart.map(item => genItemKey(item));
      // if added item is already in cart increase its amount
      if (cartItemKeys.includes(newItemKey)) {
        const index = cartItemKeys.indexOf(newItemKey);
        cart[index].amount += newItem.amount; 
      } 
      // else, add new item it to cart
      else{
        cart.push(newItem);
      }
    },

    removedFromCart: (cart, action) => {
      const toRemove = action.payload;

      // generate cart item key based on product id and flavor ids
      const toRemoveKey = genItemKey(toRemove);
      // generate array of item keys in cart
      const cartItemKeys = cart.map(item => genItemKey(toRemove));
      // if item is in cart remove it
      if (cartItemKeys.includes(toRemoveKey)) {
        const index = cartItemKeys.indexOf(toRemoveKey);
        cart.splice(index,1);
      }
    },
    
    clearedCart: (cart, action) => {
      cart.splice(0, cart.length);
    },
    
    cartPostFailed: (cart, action) => {
      window.alert(action.payload);
      console.log(action.payload);
      window.location.reload();
    }
  },
});

// generate cart item key based on product id and flavor ids, to control item amount in cart  
export const genItemKey = (item) => (item.pid + "(" + item.flavors.map(flavor => flavor.fid) + ")");

// expose action handlers
export const { 
  cartPosted, 
  addedToCart, 
  removedFromCart, 
  editedInCart, 
  cartPostFailed, 
  clearedCart } = slice.actions;


export const addToCart = (product) => addedToCart(product);
export const removeFromCart = (product) => removedFromCart(product);
export const editInCart = (product) => editedInCart(product);
export const clearCart = () => clearedCart();


export const postCart = (cart) => (dispatch, getState) => {
  // if user is not authenticated or is employee, do not post
  if (!isLoggedIn() || isEmployee()) {
    const mustLoginMessage = "You have to login as a customer to be able to complete orders!";
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
      url: "/orders",
      method: "post",
      data: cart,
      onSuccess: cartPosted.type,
      onError: cartPostFailed.type
    })
  );
};


export default slice.reducer;
