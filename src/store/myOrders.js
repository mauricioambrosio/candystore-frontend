import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import { isLoggedIn } from "./auth";
import _ from "underscore";

const slice = createSlice({
  name: "myOrders",
  initialState: { list: [], loading: false},
  reducers: {
    // action => action handler

    myOrdersRequested: (myOrders, action) => {
      myOrders.loading = true;
    },
    myOrdersReceived: (myOrders, action) => {
      myOrders.list = action.payload;
      myOrders.loading = false;
    },
    orderCancelled: (myOrders, action) => {
      const orderIds = myOrders.list.map(order => order.uoid); 
      const index = orderIds.indexOf(action.payload.uoid);

      myOrders.list[index].status = action.payload.status; 
    },
    myOrdersRequestFailed: (myOrders, action) => {
      myOrders.list = [];
      myOrders.loading = false;
      console.log(action.payload);
    }
  },
});

export const { myOrdersRequested, myOrdersReceived, orderCancelled, myOrdersRequestFailed } = slice.actions;

export const getMyOrders = () =>
  apiCallBegan({
    url: "/orders/me",
    method: "get",
    onSuccess: myOrdersReceived.type,
    onStart: myOrdersRequested.type,
    onError: myOrdersRequestFailed.type,
  });

export const cancelOrder = (id) => (dispatch, getState) =>
dispatch(
  apiCallBegan({
    url: `/orders/cancel/${id}`,
    method: "put",
    onSuccess: orderCancelled.type,
    //   onStart: bugsRequested.type,
    //   onError: bugsRequestFailed.type,
  })
);

export default slice.reducer;
