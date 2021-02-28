import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import { apiCallBegan } from "./api";
import _ from "underscore";

const TOKEN_KEY = "candystore:userToken";
const RID = "candystore:rid";

const CUSTOMER_RID = -1;
const ADMIN_RID = 2; 

export const AUTH_TOKEN_HEADER = "x-auth-token";

const slice = createSlice({
  name: "auth",
  initialState: {
    currentUser: undefined,
    // token: undefined,
  },
  reducers: {
    // action => action handler

    loggedInWithJwt: (auth, action) => {
      const jwt = action.payload.token;
      const rid = action.payload.rid;
      // auth.token = jwt;
      // auth.currentUser = jwtDecode(jwt);
      localStorage.setItem(TOKEN_KEY, jwt);
      localStorage.setItem(RID, rid);
    },
    loggedOut: (auth, action) => {
      // auth.token = undefined;
      auth.currentUser = undefined;
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(RID);
    },
    currentUserReceived: (auth, action) => {
      if (_.isEmpty(action.payload)) {
        auth.currentUser = undefined;
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(RID);
      } else {
        auth.currentUser = action.payload;
      }
    },
    currentUserUpdated: (auth, action) => {
      auth.currentUser = action.payload;
    },
  },
});

export const {
  loggedOut,
  loggedInWithJwt,
  currentUserReceived,
  currentUserUpdated,
} = slice.actions;

export const register = (user) =>
  apiCallBegan({
    url: "/users",
    method: "post",
    responseHeader: AUTH_TOKEN_HEADER,
    data: {
      // active: true,
      ..._.pick(user, [
        "email",
        "password",
        "firstname",
        "lastname",
      ]),
    },
  });

export const updateCurrentUser = (data) => {
  const customerFields = [
    "firstname",
    "lastname",
    "birthdate",
    "gender",
    "phone_number",
    "address"
  ];

  const employeeFields = [
    "firstname",
    "lastname",
    "ssn",
    "birthdate",
    "gender",
    "phone_number",
    "address"
  ];

  return apiCallBegan({
    url: isEmployee() ? "/employees/me" : "/users/me",
    method: "put",
    data: {
      ..._.pick(data, isEmployee() ? employeeFields: customerFields),
    },
    onSuccess: currentUserUpdated.type,
  });
}

export const getCurrentUser = () =>
  apiCallBegan({
    url: isEmployee() ? "/employees/me" : "/users/me",
    method: "get",
    onSuccess: currentUserReceived.type,
    //   onStart: bugsRequested.type,
    //   onError: bugsRequestFailed.type,
  });


export const login = ({ email, password, isEmployee }) => apiCallBegan({
  url: isEmployee ? "/login/e" : "/login/c",
  method: "post",
  data: { email, password },
  onSuccess: loggedInWithJwt.type,
  //   onStart: bugsRequested.type,
  //   onError: bugsRequestFailed.type,
});

export const logout = () => loggedOut();

export const getJwtFromLocalStorage = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const isEmployee = () => {
  if (isLoggedIn() && parseInt(localStorage.getItem(RID)) !== CUSTOMER_RID) return true;
  else return false;
};

export const isAdmin = () => {
  if (isLoggedIn() && parseInt(localStorage.getItem(RID)) === ADMIN_RID) return true;
  else return false;
};

export const isLoggedIn = () => getJwtFromLocalStorage() !== null;

export default slice.reducer;
