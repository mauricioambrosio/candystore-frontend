import axios from "axios";
import http from "../services/http";
import * as actions from "../api";


const api = ({ dispatch }) => (next) => async (action) => {
  if (action.type !== actions.apiCallBegan.type) return next(action);

  const {
    url,
    method,
    data,
    headers,
    responseHeader,
    onStart,
    onSuccess,
    onError,
  } = action.payload;

  if (onStart) dispatch({ type: onStart });

  next(action);
  try {
    const response = await http.request({
      url,
      method,
      data,
      headers: {...headers, "Access-Control-Allow-Origin": "*"},
    });

    // const response = await axios.request({
    //   baseURL: "http://localhost:9001/api",
    //   url,
    //   method,
    //   data,
    // });

    console.log("response:", response.data);

    // General
    dispatch(
      actions.apiCallSuccess(
        responseHeader ? response.headers[responseHeader] : response.data
      )
    );
    // Specific
    if (onSuccess)
      dispatch({
        type: onSuccess,
        payload: responseHeader
          ? response.headers[responseHeader]
          : response.data,
      });
  } catch (error) {
    // General
    dispatch(actions.apiCallFailed(error.message));
    // Specific
    if (onError) dispatch({ type: onError, payload: error.message });
    throw error;
  }
};

export default api;
