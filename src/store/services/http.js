// this module encapsulates the axios http library 
import axios from "axios";
import { getJwtFromLocalStorage, AUTH_TOKEN_HEADER } from "../auth";

// set base url based on environment
setBaseURL(process.env.REACT_APP_API_URL);

// set json web token header for authentication if available
setJwt(getJwtFromLocalStorage());

// response interceptor, null if no error, run function if error
axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    const errorMessage = "An unexpected error ocurred.";  
    console.log(errorMessage);
    console.log(error.response);
    window.alert(errorMessage, error.response);
  }

  return Promise.reject(error);
});

// export functions to interact with http module
export default {
  request: axios.request,
  setJwt,
};

// set json web token header for authentication
function setJwt(jwt) {
  axios.defaults.headers.common[AUTH_TOKEN_HEADER] = jwt;
}

// set base url for axios
function setBaseURL(url) {
  axios.defaults.baseURL = url;
}
