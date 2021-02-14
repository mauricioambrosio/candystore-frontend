import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import { isLoggedIn } from "./auth";
import _ from "underscore";
import moment from "moment";
import cartItemCard from "../components/cartItemCard";

const slice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    // action => action handler
    cartPosted: (cart, action) => {
        
    },
    editedInCart: (cart, action) => {
        const toEdit = action.payload;
        const toEditKey = toEdit.pid + toEdit.flavors.toString();

        const cartItemKeys = cart.map(item => item.pid + item.flavors.toString());
        
        if (cartItemKeys.includes(toEditKey)) {
            const index = cartItemKeys.indexOf(toEditKey);
            cart[index].amount = toEdit.amount;
        }
    },
    addedToCart: (cart, action) => {
        
        console.log(action.payload);

        const newItem = action.payload;
        const newItemKey = newItem.pid + newItem.flavors.toString();

        const cartItemKeys = cart.map(item => item.pid + item.flavors.toString());
        
        if (cartItemKeys.includes(newItemKey)) {
            const index = cartItemKeys.indexOf(newItemKey);
            cart[index].amount += newItem.amount; 
        } else{
            cart.push(newItem);
        }
    },
    removedFromCart: (cart, action) => {
        const toRemove = action.payload;
        const toRemoveKey = toRemove.pid + toRemove.flavors.toString();

        const cartItemKeys = cart.map(item => item.pid + item.flavors.toString());
        
        if (cartItemKeys.includes(toRemoveKey)) {
            const index = cartItemKeys.indexOf(toRemoveKey);
            cart.splice(index,1);
        }
    },
    clearedCart: (cart, action) => {
        cart.splice(0, cart.length);
    },
    cartPostFailed: (cart, action) => {
      console.log(action.payload);
    }
  },
});

export const { cartPosted, addedToCart, removedFromCart, editedInCart, cartPostFailed, clearedCart } = slice.actions;


export const addToCart = (product) => addedToCart(product);
export const removeFromCart = (product) => removedFromCart(product);
export const editInCart = (product) => editedInCart(product);
export const clearCart = () => clearedCart();


export const postCart = (cart) => (dispatch, getState) => {
  if (!isLoggedIn()) {
    const mustLoginMessage = "You have to login to be able to make purchases!";
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
      //   onStart: bugsRequested.type,
      //   onError: bugsRequestFailed.type,
    })
  );
};


export default slice.reducer;
