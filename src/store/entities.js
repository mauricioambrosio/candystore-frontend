import { combineReducers } from "redux";
import productsReducer from "./products";
import flavorsReducer from "./flavors";
import cartReducer from "./cart";
import reviewsReducer from "./reviews";
import ordersReducer from "./orders";
import myOrdersReducer from "./myOrders";

// aggregate reducers into a single one
export default combineReducers({
  products: productsReducer,
  flavors: flavorsReducer,
  cart: cartReducer,
  reviews: reviewsReducer,
  orders: ordersReducer,
  myOrders: myOrdersReducer
});
