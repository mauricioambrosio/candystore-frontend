import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { login, isLoggedIn } from "../store/auth";

import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import _ from "underscore";

const EMAIL = "Email";
const PASSWORD = "Password";
const IS_EMPLOYEE = "Employee?"
const LOGIN = "Login";

class LoginForm extends Form {
  state = {
    data: { email: "", password: "", isEmployee: false },
    errors: {},
  };

  schema = {
    email: Joi.string().required().label(EMAIL),
    password: Joi.string().required().label(PASSWORD),
    isEmployee: Joi.boolean().required().label(IS_EMPLOYEE),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      
      await this.props.login({
        email: data.email,
        password: data.password,
        isEmployee: data.isEmployee
      });

      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (e) {
      if (e.response && e.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = e.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (isLoggedIn()) return <Redirect to="/" />;

    return (
      
      <div className="d-flex justify-content-center">
        <div className="p-4 rounded shadow" style={{marginTop: 90}}>
          <h1>{LOGIN}</h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("email", EMAIL, false)}
            {this.renderInput("password", PASSWORD, false, "password")}
            {this.renderSwitch("isEmployee", IS_EMPLOYEE, false)}
            {this.renderButton(LOGIN, false)}
          </form>
        </div>
      </div>
    
    );
  }
}

const mapStateToProps = (state) => ({
  // currentUser: state.auth.currentUser,
  // token: state.auth.token,
});

const mapDispatchToProps = (dispatch) => ({
  login: ({ email, password, isEmployee }) => dispatch(login({ email, password, isEmployee })),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
