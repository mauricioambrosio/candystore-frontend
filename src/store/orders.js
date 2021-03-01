import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import { isLoggedIn } from "./auth";
import _ from "underscore";
import stats from "../components/stats";


const slice = createSlice({
  name: "orders",
  initialState: { list: [], loading: false, stats:{}, statsLoading: false},
  reducers: {
    // action => action handler

    ordersRequested: (orders, action) => {
      orders.loading = true;
    },
    ordersReceived: (orders, action) => {
      orders.list = action.payload;
      orders.loading = false;
    },
    orderStatusUpdated: (orders, action) => {
        const orderIds = orders.list.map(order => order.uoid); 
        const index = orderIds.indexOf(action.payload.uoid);

        orders.list[index].status = action.payload.status; 
    },
    ordersRequestFailed: (orders, action) => {
      orders.list = [];
      orders.loading = false;
      window.alert(action.payload);
    },
    statsRequested: (orders, action) => {
        orders.statsLoading = true;
    },
    statsReceived: (orders, action) => {
        orders.stats = action.payload;
        orders.statsLoading = false;
    },
    statsRequestFailed: (orders, action) => {
      orders.stats = {};
      orders.statsLoading = false;
      window.alert(action.payload);
    }
  },
});

export const { ordersRequested, ordersReceived, orderStatusUpdated, ordersRequestFailed, statsRequested, statsReceived, statsRequestFailed } = slice.actions;


export const getStats = () =>
  apiCallBegan({
    url: "/stats",
    method: "get",
    onSuccess: statsReceived.type,
    onStart: statsRequested.type,
    onError: statsRequestFailed.type,
  });

export const getOrders = () =>
  apiCallBegan({
    url: "/orders",
    method: "get",
    onSuccess: ordersReceived.type,
    onStart: ordersRequested.type,
    onError: ordersRequestFailed.type,
  });

export const updateOrderStatus = (id, status) => (dispatch, getState) => {
  dispatch(
    apiCallBegan({
      url: `/orders/status/${id}`,
      method: "put",
      data: {status: status},
      onSuccess: orderStatusUpdated.type,
    })
  );
}


export default slice.reducer;
