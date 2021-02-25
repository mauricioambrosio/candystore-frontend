import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import { isLoggedIn } from "./auth";
import moment from "moment";

const slice = createSlice({
  name: "flavors",
  initialState: { list: [], loading: false},
  reducers: {
    // action => action handler
    flavorPosted: (flavors, action) => {
        flavors.list.push(action.payload);
    },
    flavorEdited: (flavors, action) => {
        flavors.list = flavors.list.filter(flavor => (flavor.fid !== action.payload.fid));
        flavors.list.push(action.payload);
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

export const { flavorPosted, flavorsRequested, flavorsReceived, flavorsRequestFailed, flavorEdited } = slice.actions;

export const getFlavors = () =>
  apiCallBegan({
    url: "/flavors",
    method: "get",
    onSuccess: flavorsReceived.type,
    onStart: flavorsRequested.type,
    onError: flavorsRequestFailed.type,
  });

  /*
  export const deleteFlavor = (id, active) => (dispatch, getState) => {
    if (!isLoggedIn()) {
      const mustLoginMessage = "You have to login to be able to delete flavors!";
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
        url: `/flavors/${id}`,
        method: active?"delete":"post",
        onSuccess: flavorEdited.type,
        //   onStart: bugsRequested.type,
        //   onError: bugsRequestFailed.type,
      })
    );
  }

  export const editFlavor = (flavor, id, deletedImages) => (dispatch, getState) => {
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
    const data = { ...flavor };
  
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
        url: `/flavors/${id}`,
        method: "put",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
        onSuccess: flavorEdited.type,
        //   onStart: bugsRequested.type,
        //   onError: bugsRequestFailed.type,
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
  const data = { ...flavor };

  const formData = new FormData();

  formData.append("omitTime", data.omitTime);

  formData.append("adminGen", data.adminGen);
  formData.append("title", data.title);
  formData.append("owner", data.owner);

  // formData.append("date", data.date);
  // formData.append("time", data.time);

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

  data.pictures.forEach((picture) => {
    formData.append("photos", picture);
  });

  return dispatch(
    apiCallBegan({
      url: "/flavors",
      method: "post",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
      onSuccess: flavorPosted.type,
      //   onStart: bugsRequested.type,
      //   onError: bugsRequestFailed.type,
    })
  );
};
*/

export default slice.reducer;
