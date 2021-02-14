import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import { isLoggedIn } from "./auth";
import moment from "moment";

const slice = createSlice({
  name: "products",
  initialState: { list: [], loading: false},
  reducers: {
    // action => action handler
    productPosted: (products, action) => {
        products.list.push(action.payload);
    },
    productEdited: (products, action) => {
        products.list = products.list.filter(product => (product.pid !== action.payload.pid));
        products.list.push(action.payload);
    },
    productsRequested: (products, action) => {
        products.loading = true;
    },
    productsReceived: (products, action) => {
        products.list = action.payload;
        products.loading = false;
    },
    productsRequestFailed: (products, action) => {
      products.loading = false;
      console.log(action.payload);
    }
  },
});

export const { productPosted, productsRequested, productsReceived, productsRequestFailed, productEdited, productsCurrentPageUpdated } = slice.actions;

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

export const getProducts = () =>
  apiCallBegan({
    url: "/products",
    method: "get",
    onSuccess: productsReceived.type,
    onStart: productsRequested.type,
    onError: productsRequestFailed.type,
  });

  /*
  export const deleteProduct = (id, active) => (dispatch, getState) => {
    if (!isLoggedIn()) {
      const mustLoginMessage = "You have to login to be able to delete products!";
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
        url: `/products/${id}`,
        method: active?"delete":"post",
        onSuccess: productEdited.type,
        //   onStart: bugsRequested.type,
        //   onError: bugsRequestFailed.type,
      })
    );
  }

  export const editProduct = (product, id, deletedImages) => (dispatch, getState) => {
    if (!isLoggedIn()) {
      const mustLoginMessage = "You have to login to be able to edit products!";
      window.alert(mustLoginMessage);
      throw {
        response: {
          data: mustLoginMessage,
          status: 400,
        },
      };
    }
    const data = { ...product };
  
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
        url: `/products/${id}`,
        method: "put",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
        onSuccess: productEdited.type,
        //   onStart: bugsRequested.type,
        //   onError: bugsRequestFailed.type,
      })
    );
  };

export const postProduct = (product) => (dispatch, getState) => {
  if (!isLoggedIn()) {
    const mustLoginMessage = "You have to login to be able to post products!";
    window.alert(mustLoginMessage);
    throw {
      response: {
        data: mustLoginMessage,
        status: 400,
      },
    };
  }
  const data = { ...product };

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
      url: "/products",
      method: "post",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
      onSuccess: productPosted.type,
      //   onStart: bugsRequested.type,
      //   onError: bugsRequestFailed.type,
    })
  );
};
*/

export default slice.reducer;
