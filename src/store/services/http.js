import axios from "axios";
import { getJwtFromLocalStorage, AUTH_TOKEN_HEADER } from "../auth";

// import logger from "./logService";

// axios.defaults.baseURL = process.env.REACT_APP_API_URL;
setBaseURL(process.env.REACT_APP_API_URL);
setJwt(getJwtFromLocalStorage());

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    // console.log("Logging the error", error);
    // logger.log(error);

    // toast.error("An unexpected error ocurred.");
    console.log("An unexpected error ocurred.");
    console.log(error.response);
    
  }

  return Promise.reject(error);
});

export default {
  request: axios.request,
  //   get: axios.get,
  //   post: axios.post,
  //   put: axios.put,
  //   delete: axios.delete,
  setJwt,
};

function setJwt(jwt) {
  axios.defaults.headers.common[AUTH_TOKEN_HEADER] = jwt;
}

function setBaseURL(url) {
  axios.defaults.baseURL = url;
}
