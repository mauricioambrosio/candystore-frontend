import React, { Component } from "react";
import { Route, Redirect, Switch, withRouter } from "react-router-dom";

import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Logout from "./components/logout";
import Products from "./components/products";
import ProductPage from "./components/productPage";
import Flavors from "./components/flavors";

import Cart from "./components/cart";

import Profile from "./components/profileForm";
import Orders from "./components/orders";
import MyOrders from "./components/myOrders";
import Inventory from "./components/inventory";
import Stats from "./components/stats";

import {isEmployee} from "./store/auth";

import NotFound from "./components/notFound";

import { Provider } from "react-redux";
import configureStore from "./store/configureStore";

import NavBar from "./components/navBar";


import './App.css';

import { PersistGate } from "redux-persist/integration/react";


const { store, persistor } = configureStore();

class App extends Component {

  render(){
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <React.Fragment>
            
            <NavBar/>
            
            <div>

              <Switch>
                <Route path="/orders" component={Orders} />
                <Route path="/inventory" component={Inventory} />
                <Route path="/stats" component={Stats} />
                <Route path="/products" component={Products} />
                <Route path="/flavors" component={Flavors} />
                <Route path="/productpage/:id" component={ProductPage} />
                <Route path="/register" component={RegisterForm} />
                <Route path="/login" component={LoginForm} />
                <Route path="/profile" component={Profile} />
                <Route path="/myorders" component={MyOrders} />
                <Route path="/cart" component={Cart}/>

                <Route path="/logout" component={Logout} />
                
                <Route path="/not-found" component={NotFound} />


                <Redirect exact from="/" to= {isEmployee() ? "/orders" : "/products"} />

                <Redirect to="/not-found" />

              </Switch>
            </div>

          </React.Fragment>
        </PersistGate>
      </Provider>
    );
  }
}

export default withRouter(App);
