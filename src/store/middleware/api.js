import http from "../services/http";
import * as actions from "../api";

// api middleware for redux store to interact with databases 
const api = ({ dispatch }) => (next) => async (action) => {

  // if action is not apiCallBegan, go straight to next function on chain
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

  // dispatch onStart action
  if (onStart) dispatch({ type: onStart });
  
  // call next function on chain
  next(action);

  // execute http request
  try {
    const response = await http.request({
      url,
      method,
      data,
      // headers: {...headers, "Access-Control-Allow-Origin": "*"},
    });

    // console.log("response:", response.data);

    // dispatch general success action
    dispatch(
      actions.apiCallSuccess(
        responseHeader ? response.headers[responseHeader] : response.data
      )
    );

    // dispatch specific success action
    if (onSuccess)
      dispatch({
        type: onSuccess,
        payload: responseHeader
          ? response.headers[responseHeader]
          : response.data,
      });
  } catch (error) {
    // dispatch general fail action
    dispatch(actions.apiCallFailed(error.message));
    // dispatch specific fail action
    if (onError) dispatch({ type: onError, payload: error.message });
    throw error;
  }
};

export default api;
