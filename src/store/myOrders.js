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
        console.log(action.payload);
        myOrders.list = action.payload;
        myOrders.loading = false;
    },
    myOrdersRequestFailed: (myOrders, action) => {
      myOrders.loading = false;
      console.log(action.payload);
    }
  },
});

export const { myOrdersRequested, myOrdersReceived, myOrdersRequestFailed } = slice.actions;

export const getMyOrders = () =>
  apiCallBegan({
    url: "/orders/me",
    method: "get",
    onSuccess: myOrdersReceived.type,
    onStart: myOrdersRequested.type,
    onError: myOrdersRequestFailed.type,
  });

  /*
  export const deleteReview = (id, active) => (dispatch, getState) => {
    if (!isLoggedIn()) {
      const mustLoginMessage = "You have to login to be able to delete reviews!";
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
        url: `/reviews/${id}`,
        method: active?"delete":"post",
        onSuccess: reviewEdited.type,
        //   onStart: bugsRequested.type,
        //   onError: bugsRequestFailed.type,
      })
    );
  }

  export const editReview = (review, id, deletedImages) => (dispatch, getState) => {
    if (!isLoggedIn()) {
      const mustLoginMessage = "You have to login to be able to edit reviews!";
      window.alert(mustLoginMessage);
      throw {
        response: {
          data: mustLoginMessage,
          status: 400,
        },
      };
    }
    const data = { ...review };
  
    const formData = new FormData();
  
    formData.append("title", data.title);
    formData.append("owner", data.owner);
  
    // formData.append("date", data.date);
    // formData.append("time", data.time);
  
    formData.append("omitTime", data.omitTime);
    
    formData.append("dateTime", genDateTime(data.date, data.time));
  
    formData.append("country", data.country);
    formData.append("province", data.province);
    formData.append("town", data.town);
    formData.append("streetAddress", data.streetAddress);
    formData.append("details", data.details);
  
    data.types.forEach((type) => {
      formData.append("types[]", type);
    });
  
    data.contacts.forEach((contact) => {
      formData.append("contacts[]", contact);
    });
  
    deletedImages.forEach((uri)=>{
      formData.append("deletedImages[]", uri);
    })

    data.pictures.forEach((picture) => {
      formData.append("photos", picture);
    });
    
    return dispatch(
      apiCallBegan({
        url: `/reviews/${id}`,
        method: "put",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
        onSuccess: reviewEdited.type,
        //   onStart: bugsRequested.type,
        //   onError: bugsRequestFailed.type,
      })
    );
  };
  */

export default slice.reducer;
