import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import { isEmployee, isLoggedIn } from "./auth";
import _ from "underscore";
import moment from "moment";
import cartItemCard from "../components/cartItemCard";

const slice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    // action => action handler
    cartPosted: (cart, action) => {
        cart.length = 0;  
    },
    editedInCart: (cart, action) => {
        const toEdit = action.payload;
        const toEditKey = genItemKey(toEdit);

        const cartItemKeys = cart.map(item => genItemKey(item));
        
        if (cartItemKeys.includes(toEditKey)) {
            const index = cartItemKeys.indexOf(toEditKey);
            cart[index].amount = toEdit.amount;
        }
    },
    addedToCart: (cart, action) => {
        const newItem = action.payload;
        const newItemKey = genItemKey(newItem);

        const cartItemKeys = cart.map(item => genItemKey(item));
        
        if (cartItemKeys.includes(newItemKey)) {
            const index = cartItemKeys.indexOf(newItemKey);
            cart[index].amount += newItem.amount; 
        } else{
            cart.push(newItem);
        }
    },
    removedFromCart: (cart, action) => {
        const toRemove = action.payload;
        const toRemoveKey = genItemKey(toRemove);

        const cartItemKeys = cart.map(item => genItemKey(toRemove));
        
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

export const genItemKey = (item) => (item.pid + "(" + item.flavors.map(flavor => flavor.fid) + ")");

export const { cartPosted, addedToCart, removedFromCart, editedInCart, cartPostFailed, clearedCart } = slice.actions;


export const addToCart = (product) => addedToCart(product);
export const removeFromCart = (product) => removedFromCart(product);
export const editInCart = (product) => editedInCart(product);
export const clearCart = () => clearedCart();


export const postCart = (cart) => (dispatch, getState) => {
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
