import { combineReducers } from "redux";
import productsReducer from "./products";
import flavorsReducer from "./flavors";
import cartReducer from "./cart";
import reviewsReducer from "./reviews";
import ordersReducer from "./orders";
import myOrdersReducer from "./myOrders";

// import bugsReducer from "./bugs";
// import projectsReducer from "./projects";
// import usersReducer from "./users";

export default combineReducers({
  products: productsReducer,
  flavors: flavorsReducer,
  cart: cartReducer,
  reviews: reviewsReducer,
  orders: ordersReducer,
  myOrders: myOrdersReducer
  // users: usersReducer,
});
