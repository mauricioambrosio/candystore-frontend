import React from "react";
import { Link, NavLink } from "react-router-dom";
import "bootstrap/dist/js/bootstrap";
import { isLoggedIn, isEmployee } from "../store/auth";

import { connect } from "react-redux";


const CANDY_STORE = "Candy Store";
const HOME = "Home";

const MENU = "Menu";
const INVENTORY = "Inventory";

const CUSTOMIZE = "Customize";

const CART = "Cart";
 
const ORDERS = "Orders";
const STATISTICS = "Statistics";
const MY_ORDERS = "My orders";
const PROFILE = "Profile";
const ABOUT = "About";
const LOGOUT = "Logout";
const LOGIN = "Login";
const REGISTER = "Register";

const NavBar = ({currentUser, cart}) => {
    
  return (
    <nav
      // className="navbar navbar-expand-lg navbar-light bg-light fixed-top"
      className="navbar navbar-expand-lg navbar-dark fixed-top bg-light text-dark"
      data-toggle="collapse"
      data-target=".navbar-collapse.show"
    >
      {/* <Link className="navbar-brand" to="/">
        <i
          className="fa fa-university fa-lg text-secondary mr-0"
          aria-hidden="true"
        ></i>
      </Link> */}

      <Link className="navbar-brand mt-2 ml-3 justify-content-start" to="/">
        <div className="row">
          <h4 className="justify-content-md-start">
          <i className="fa fa-home" aria-hidden="true" /> {CANDY_STORE}
          </h4>
        </div>
      </Link>

      <button
        className="navbar-toggler bg-secondary"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="collapse navbar-collapse justify-content-end"
        id="navbarNav"
      >
        <div className="navbar-nav">

          {/* <NavLink className="nav-item nav-link font-weight-bold" to="/about">
            <i className="fa fa-home" aria-hidden="true" /> {HOME}
          </NavLink> */}
          
          {isEmployee()? <NavLink
            className="nav-item nav-link font-weight-bold text-dark"
            to="/orders"
          >
            <i className="fa fa-shopping-basket" aria-hidden="true" /> {ORDERS}
          </NavLink>: null}
          


          {isEmployee()? <NavLink
            className="nav-item nav-link font-weight-bold text-dark"
            to="/inventory"
          >
            <i className="fa fa-th-list" aria-hidden="true" /> {INVENTORY}
          </NavLink>: null}

          {isEmployee()? <NavLink
            className="nav-item nav-link font-weight-bold text-dark"
            to="/stats"
          >
            <i className="fa fa-pie-chart" aria-hidden="true" /> {STATISTICS}
          </NavLink>: null}

          <NavLink
            className="nav-item nav-link font-weight-bold text-dark"
            to="/products"
          >
            <i className="fa fa-bars" aria-hidden="true" /> {MENU}
          </NavLink>

          <NavLink
            className="nav-item nav-link font-weight-bold text-dark"
            to="/flavors"
          >
            <i className="fa fa-cubes" aria-hidden="true" /> {CUSTOMIZE}
          </NavLink>

          {isLoggedIn() && !isEmployee()? (
            <NavLink
              className="nav-item nav-link font-weight-bold text-dark"
              to="/myorders"
            >
              <i className="fa fa-shopping-basket" aria-hidden="true" /> {MY_ORDERS}
            </NavLink>
          ) : null}
          
          {cart.length >= 1?<NavLink
            className="nav-item nav-link font-weight-bold text-dark"
            to="/cart"
          >
            <i className="fa fa-shopping-cart" aria-hidden="true" /> {CART}
          </NavLink>:null}    

          {isLoggedIn() ? (
            <NavLink
              className="nav-item nav-link font-weight-bold text-dark"
              to="/profile"
            >
              <i className="fa fa-user" aria-hidden="true" /> {PROFILE}
            </NavLink>
          ) : null}
                      

          {/* <NavLink
            className="nav-item nav-link font-weight-bold"
            to="/howToUse"
          >
            <i className="fa fa-question" aria-hidden="true" /> Como Usar
          </NavLink> */}

          {/* {!loggedIn ? (
            <NavLink className="nav-item nav-link font-weight-bold" to="/login">
              Entrar
            </NavLink>
            
          ) : null} */}
          {isLoggedIn() ? (
            <NavLink
              className="nav-item nav-link font-weight-bold text-dark"
              to="/logout"
            >
              <i className="fa fa-sign-out" aria-hidden="true" /> {LOGOUT}
            </NavLink>
          ) : (
            <NavLink className="nav-item nav-link font-weight-bold text-dark" to="/login">
              <i className="fa fa-sign-in" aria-hidden="true" /> {LOGIN}
            </NavLink>
          )}

          {!isLoggedIn() ? (
            <NavLink
              className="nav-item nav-link font-weight-bold text-dark"
              to="/register"
            >
              <i className="fa fa-user-plus" aria-hidden="true" /> {REGISTER}
            </NavLink>
          ) : null}

          {/* <NavLink className="nav-item nav-link font-weight-bold" to="/about">
            <i className="fa fa-question-circle-o" aria-hidden="true" /> {ABOUT}
          </NavLink> */}
          
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,
  cart: state.entities.cart
});

// const mapDispatchToProps = (dispatch) => ({
//   getCurrentUser: () => dispatch(getCurrentUser()),
// });

export default connect(mapStateToProps)(NavBar);
