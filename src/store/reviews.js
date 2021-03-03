import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import { isLoggedIn, isEmployee } from "./auth";
import _ from "underscore";

const slice = createSlice({
  name: "reviews",
  initialState: { list: [], loading: false},
  reducers: {
    // action => action handler
    // add posted reviews
    reviewPosted: (reviews, action) => {
        const review = action.payload;
        const reviewIds = reviews.list.map(review => review._id);

        if(!reviewIds.includes(review._id)) reviews.list.push(review);
    },
    reviewsRequested: (reviews, action) => {
        reviews.loading = true;
    },
    reviewsReceived: (reviews, action) => {
      const reviewIds = reviews.list.map(review => review._id);
      
      // for each review received, if review is not already in reviews list add it
      action.payload.forEach(review => {
          if (!reviewIds.includes(review._id)) reviews.list.push(review);
      });

      reviews.loading = false;
    },
    reviewsRequestFailed: (reviews, action) => {
      reviews.loading = false;
      console.log(action.payload);
    }
  },
});

// expose action handlers
export const { 
  reviewPosted, 
  reviewsRequested, 
  reviewsReceived, 
  reviewsRequestFailed } = slice.actions;


export const getAllReviews = () => 
  apiCallBegan({
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
    })
  );
};


export default slice.reducer;
