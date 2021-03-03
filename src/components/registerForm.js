import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

import { Redirect } from "react-router-dom";

import { register, isLoggedIn } from "../store/auth";


import { connect } from "react-redux";

const EMAIL = "email";
const FIRST_NAME = "First name";
const LAST_NAME = "Last name";
const PASSWORD = "Password";
const REGISTER = "Register";

// the dispatch functions call respective redux dispatch actions
class RegisterForm extends Form {
  state = {
    data: {
      email: "",
      firstname: "",
      lastname: "",
      password: "",
      // isEmployee: false
    },
    errors: {},
  };

  schema = {
    email: Joi.string().min(1).max(64).required().label(EMAIL),
    firstname: Joi.string().min(1).max(64).required().label(FIRST_NAME),
    lastname: Joi.string().min(1).max(64).required().label(LAST_NAME),
    
    /* commented to ignore password requirements */
    /* password must include at least 8 characters, 1 lowercase, 1 uppercase, and 1 digit */
    // password: Joi.string()
    //   .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/)
    //   .min(8)
    //   .required()
    //   .options({
    //     language: {
    //       string: {
    //         regex: {
    //           base:
    //             "must contain a minimum of 8 characters, at least an uppercase, a lowercase, and a digit"
    //           },
    //       },
    //     },
    //   }).label(PASSWORD),

    password: Joi.string().min(1).max(128).required().label(PASSWORD)
  };
  componentDidMount(){
    window.scrollTo(0, 0);
  }

  doSubmit = async () => {
    try {
      // register user
      await this.props.register(this.state.data);
      this.props.history.replace({
        pathname: "/login",
      });
      
    } catch (e) {
      if (e.response && e.response.status === 400) {
        const errors = { ...this.state.erros };
        errors.email = e.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    // if user is authenticated, go back to home page
    if (isLoggedIn()) return <Redirect to="/" />;

    return (
      <div className="d-flex justify-content-center">
        <div className="p-4 rounded shadow" style={{marginTop:50}}>
          <h1>{REGISTER}</h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("email", EMAIL, false)}
            {this.renderInput("password", PASSWORD, false, "password")}
            {this.renderInput("firstname", FIRST_NAME, false)}
            {this.renderInput("lastname", LAST_NAME, false)}
            
            {this.renderButton(REGISTER, false)}
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
});

// map redux store dispatch functions to this.props
const mapDispatchToProps = (dispatch) => ({
  register: (user) => dispatch(register(user)),
});

// wrap component with react-redux connect wrapper
export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
