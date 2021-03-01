import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import { isLoggedIn, isEmployee } from "./auth";
import _ from "underscore";

const slice = createSlice({
  name: "reviews",
  initialState: { list: [], loading: false},
  reducers: {
    // action => action handler
    reviewPosted: (reviews, action) => {
        const review = action.payload;
        const reviewIDs = reviews.list.map(review => review._id);

        if(!reviewIDs.includes(review._id)) reviews.list.push(review);
    },
    // reviewEdited: (reviews, action) => {
    //     reviews.list = reviews.list.filter(review => (review.fid !== action.payload.fid));
    //     reviews.list.push(action.payload);
    // },
    reviewsRequested: (reviews, action) => {
        reviews.loading = true;
    },
    reviewsReceived: (reviews, action) => {
        const reviewIDs = reviews.list.map(review => review._id);
        action.payload.forEach(review => {
            if(!reviewIDs.includes(review._id)) reviews.list.push(review);
        });

        reviews.loading = false;
    },
    reviewsRequestFailed: (reviews, action) => {
      reviews.loading = false;
      console.log(action.payload);
      window.alert(action.payload);
    }
  },
});

export const { reviewPosted, reviewsRequested, reviewsReceived, reviewsRequestFailed } = slice.actions;

/*

const genDateTime = (date, time) => {
  const dateArray = moment(date).format("YYYY/MM/DD").split("/");
  const timeArray = moment(time).format("HH:mm").split(":");

  const year = parseInt(dateArray[0]);
  const month = parseInt(dateArray[1]);
  const day = parseInt(dateArray[2]);
  const hours = parseInt(timeArray[0]);
  const minutes = parseInt(timeArray[1]);

  return new Date(year, month - 1, day, hours, minutes);
};*/

export const getAllReviews = () => apiCallBegan({
  url: `/reviews`,
  method: "get",
  onSuccess: reviewsReceived.type,
  onStart: reviewsRequested.type,
  onError: reviewsRequestFailed.type,
});

export const getReviews = (pid) =>
  apiCallBegan({
    url: `/reviews/pid/${pid}`,
    method: "get",
    onSuccess: reviewsReceived.type,
    onStart: reviewsRequested.type,
    onError: reviewsRequestFailed.type,
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

export const postReview = (review) => (dispatch, getState) => {
  if (!isLoggedIn()|| isEmployee()) {
    const mustLoginMessage = "You have to login as a customer to be able to post reviews!";
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
      url: "/reviews",
      method: "post",
      data: review,
      onSuccess: reviewPosted.type,
      //   onStart: reviewsRequested.type,
      //   onError: reviewsRequestFailed.type,
    })
  );
};


export default slice.reducer;
