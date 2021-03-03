import { combineReducers } from "redux";
import entitiesReducer from "./entities";
import authReducer from "./auth";

// aggregate reducers into a single one
export default combineReducers({
  entities: entitiesReducer,
  auth: authReducer,
});
