import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import { isLoggedIn, isEmployee, isAdmin } from "./auth";

// flavors slice for reducer
const slice = createSlice({
  name: "flavors",
  initialState: { 
    list: [], 
    loading: false
  },
  reducers: {
    // action => action handler
    // add posted flavor
    flavorPosted: (flavors, action) => {
      flavors.list.push(action.payload);
    },
    flavorEdited: (flavors, action) => { 
      const flavorIds = flavors.list.map(flavor => flavor.fid); 
      const index = flavorIds.indexOf(action.payload.fid);

      // remove existing flavor and add edited one
      flavors.list = flavors.list.filter(flavor => (flavor.fid !== action.payload.fid));
      flavors.list.splice(index, 0, action.payload);
    },
    flavorsRequested: (flavors, action) => {
      flavors.loading = true;
    },
    flavorsReceived: (flavors, action) => {
      flavors.list = action.payload;
      flavors.loading = false;
    },
    flavorsRequestFailed: (flavors, action) => {
      flavors.loading = false;
      console.log(action.payload);
    }
  },
});

// expose action handlers
export const { 
  flavorPosted, 
  flavorsRequested, 
  flavorsReceived, 
  flavorsRequestFailed, 
  flavorEdited } = slice.actions;

export const getFlavors = () =>
  apiCallBegan({
    url: "/flavors",
    method: "get",
    onSuccess: flavorsReceived.type,
    onStart: flavorsRequested.type,
    onError: flavorsRequestFailed.type,
  });


  export const deleteFlavor = (flavor) => (dispatch, getState) => {
    if (!isLoggedIn()) {
      const mustLoginMessage = "You have to login to be able to delete/restore flavors!";
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
        url: `/flavors/${flavor.fid}`,
        method: flavor.active?"delete":"post",
        onSuccess: flavorEdited.type,
      })
    );
  }

  
  export const editFlavor = (flavor) => (dispatch, getState) => {
    if (!isLoggedIn()) {
      const mustLoginMessage = "You have to login to be able to edit flavors!";
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
        url: `/flavors/${flavor.fid}`,
        method: "put",
        data: {name:flavor.name, price:flavor.price},
        onSuccess: flavorEdited.type,
      })
    );
  };


export const postFlavor = (flavor) => (dispatch, getState) => {
  if (!isLoggedIn()) {
    const mustLoginMessage = "You have to login to be able to post flavors!";
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
      url: "/flavors",
      method: "post",
      data: flavor,
      onSuccess: flavorPosted.type,
    })
  );
};

export default slice.reducer;
