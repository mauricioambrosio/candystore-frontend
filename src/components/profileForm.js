import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getGenders } from "../store/services/genders";
import { sortList } from "../components/common/helpers";

import { getCurrentUser, updateCurrentUser, isLoggedIn } from "../store/auth";

import moment from "moment";
import _ from "underscore";
import { Switch } from "antd";

import { connect } from "react-redux";

const EDIT = "Edit";
const SAVE = "Save";
const USER_DATA = "User data"

const FIRST_NAME = "First name";
const LAST_NAME = "Second name";
const BIRTHDATE = "Birthdate";
const GENDER = "Gender";
const PHONE_NUMBER = "Phone number";
const ADDRESS = "Address";

class ProfileForm extends Form {
  state = {
    edit: false,
    currentUser: {},
    data: {
      firstname: "",
      lastname: "",
      birthdate: new Date(),
      gender: "",
      phone_number:"",
      address: "",
    },
    errors: {},
  };

  populateCurrentUser(currentUser) {
    const data = { ...this.state.data };
    if (currentUser.firstname) data.firstname = currentUser.firstname;
    if (currentUser.lastname) data.lastname = currentUser.lastname;
    if (currentUser.birthdate) data.birthdate = new Date(currentUser.birthdate);
    if (currentUser.gender) data.gender = currentUser.gender;
    if (currentUser.phone_number) data.phone_number = currentUser.phone_number;
    if (currentUser.address) data.address = currentUser.address;
    return data;
  }

  async componentDidMount() {
    window.scrollTo(0, 0);
    try {
      await this.props.getCurrentUser();

      const currentUser = this.props.currentUser;

      const data = this.populateCurrentUser(currentUser);

      let edit = false;
      if (this.props.location.state && this.props.location.state.newUser)
        edit = true;
      this.setState({ data, currentUser, edit });
    } catch (err) {
      console.log(err);
      return (window.location = "/");
    }
  }

  schema = {
    firstname: Joi.string().min(1).max(128).required().label(FIRST_NAME),
    lastname: Joi.string().min(1).max(128).required().label(LAST_NAME),
    birthdate: Joi.date()
      .max(new Date().setDate(new Date().getDate() - 1))
      .label(BIRTHDATE),
    gender: Joi.string().valid("M", "F").allow(null, "").label(GENDER),
    phone_number: Joi.string().max(32).allow(null, "").label(PHONE_NUMBER),
    address: Joi.string().max(256).allow(null, "").label(ADDRESS),
  };

  doSubmit = async () => {
    this.setState({ edit: false });
    const data = { ...this.state.data };
    try {

      this.setState({edit: false});
      await this.props.updateCurrentUser(data);

      const updatedUser = this.props.currentUser;
      this.setState({ currentUser: updatedUser });
      if (this.props.location.state && this.props.location.state.newUser)
        return this.props.history.replace({
          pathname: "/home",
          state: { newUser: true },
        });
    } catch (err) {
      console.log(err.message);
    }
  };

  render() {
    if (!isLoggedIn()) return (window.location = "/");

    const { edit, currentUser } = this.state;
    let newUser;
    if (this.props.location.state && this.props.location.state.newUser)
      newUser = true;
    else newUser = false;

    return (
      <div className="d-flex justify-content-center">
        <div className="w-100 mb-4 p-4 rounded shadow" style={{maxWidth: 500}}>
          <h3>{USER_DATA}</h3>
          <p>
            {currentUser.userName ? (
              <>
                <i className="fa fa-user" aria-hidden="true" />
                <span> </span>
                {currentUser.userName}
              </>
            ) : null}
            {/* 
            {currentUser.userName ? (
              <>
                <i className="fa fa-user" aria-hidden="true" />
                {currentUser.userName}
              </>
            ) : null} */}
          </p>

          {!newUser ? (
            <>
              <label htmlFor="edit">{EDIT}</label>
              <span> </span>
              <Switch
                name="edit"
                checked={this.state.edit}
                onChange={(checked, event) => {
                  const newState = { ...this.state };
                  newState.data = { ...this.state.data };
                  newState.edit = checked;

                  if (!checked) {
                    const data = this.populateCurrentUser(currentUser);
                    newState.data = data;
                  }
                  this.setState(newState);
                }}
              />
            </>
          ) : null}

          <form onSubmit={this.handleSubmit}>
            {/* {this.renderInput("userName", USERNAME, !edit)} */}
            {this.renderInput("firstname", FIRST_NAME, !edit)}
            {this.renderInput("lastname", LAST_NAME, !edit)}
            {this.renderDatePicker(
              "birthdate",
              BIRTHDATE,
              new Date(),
              !edit,
              function (current) {
                return current > moment().endOf("day");
              }
            )}
            {this.renderSelect("gender", GENDER, getGenders(), !edit)}

            {this.renderInput("phone_number", PHONE_NUMBER, !edit)}
            {this.renderInput("address", ADDRESS, !edit)}

            {this.renderButton(SAVE, !edit)}

            {newUser ? (
              <button
                className="btn btn-primary"
                style={{ marginBottom: 20, marginLeft: 20 }}
                onClick={(e) => {
                  e.preventDefault();
                  this.props.history.replace({
                    pathname: "/home",
                    state: { newUser: true },
                  });
                }}
              >
                Setup profile later
              </button>
            ) : null}
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrentUser: () => dispatch(getCurrentUser()),
  updateCurrentUser: (data) => dispatch(updateCurrentUser(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm);
