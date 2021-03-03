import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getGenders } from "../store/services/genders";

import { getCurrentUser, updateCurrentUser, isLoggedIn, isEmployee } from "../store/auth";

import moment from "moment";
import _ from "underscore";
import { Switch } from "antd";

import { connect } from "react-redux";

const EDIT = "Edit";
const SAVE = "Save";
const PROFILE = "Profile";

const FIRST_NAME = "First name";
const LAST_NAME = "Second name";
const SOCIAL_SECURITY_NUMBER = "Social security number";
const BIRTHDATE = "Birthdate";
const GENDER = "Gender";
const PHONE_NUMBER = "Phone number";
const ADDRESS = "Address";

// the dispatch functions call respective redux dispatch actions
class ProfileForm extends Form {
  state = {
    edit: false,
    currentUser: {},
    data: {
      firstname: "",
      lastname: "",
      ssn: "",
      birthdate: new Date(),
      gender: "",
      phone_number:"",
      address: "",
    },
    errors: {},
  };

  // populate input fields with current user data
  populateCurrentUser(currentUser) {
    const data = { ...this.state.data };
    if (currentUser.firstname) data.firstname = currentUser.firstname;
    if (currentUser.lastname) data.lastname = currentUser.lastname;
    
    if (isEmployee() && currentUser.ssn) data.ssn = currentUser.ssn;
    
    if (currentUser.birthdate) data.birthdate = new Date(currentUser.birthdate);
    if (currentUser.gender) data.gender = currentUser.gender;
    if (currentUser.phone_number) data.phone_number = currentUser.phone_number;
    if (currentUser.address) data.address = currentUser.address;
    
    return data;
  }

  async componentDidMount() {
    window.scrollTo(0, 0);
    try {
      // call dispatch action function to get current user data
      await this.props.getCurrentUser();

      const currentUser = this.props.currentUser;

      // populate input fields with current user data
      const data = this.populateCurrentUser(currentUser);

      this.setState({ data, currentUser });
    } catch (err) {
      console.log(err);
      return (window.location = "/");
    }
  }

  // form fields schema
  schema = {
    firstname: Joi.string().min(1).max(64).required().label(FIRST_NAME),
    lastname: Joi.string().min(1).max(64).required().label(LAST_NAME),
    ssn: Joi.string().max(32).allow(null, "").label(SOCIAL_SECURITY_NUMBER),
    birthdate: Joi.date()
      .max(new Date().setDate(new Date().getDate() - 1))
      .label(BIRTHDATE),
    gender: Joi.string().valid("M", "F").allow(null, "").label(GENDER),
    phone_number: Joi.string().max(32).allow(null, "").label(PHONE_NUMBER),
    address: Joi.string().max(256).allow(null, "").label(ADDRESS),
  };


  doSubmit = async () => {
    // disable edit
    this.setState({ edit: false });
    const data = { ...this.state.data };
    try {
      // call dispatch action function to update current user
      await this.props.updateCurrentUser(data);

      const updatedUser = this.props.currentUser;
      this.setState({ currentUser: updatedUser });

    } catch (err) {
      console.log(err.message);
    }
  };


  render() {
    // if user is not logged in go back to home page
    if (!isLoggedIn()) return (window.location = "/");

    const { edit, currentUser } = this.state;
   
    return (
      <div className="d-flex justify-content-center">
        <div className="w-100 mb-4 p-4 rounded shadow" style={{maxWidth: 500}}>
          <h3 className="text-center">{PROFILE}</h3>
          
          
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="edit">{EDIT}</label>
            {" "}

            {/* switch to define if edit is available */}
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
            {this.renderInput("firstname", FIRST_NAME, !edit)}
            {this.renderInput("lastname", LAST_NAME, !edit)}
            {isEmployee()? this.renderInput("ssn", SOCIAL_SECURITY_NUMBER, !edit) : null}
            
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

          </form>
        </div>
      </div>
    );
  }
}

// map redux store state to this.props
const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,
});

// map redux store dispatch functions to this.props
const mapDispatchToProps = (dispatch) => ({
  getCurrentUser: () => dispatch(getCurrentUser()),
  updateCurrentUser: (data) => dispatch(updateCurrentUser(data)),
});

// wrap component with react-redux connect wrapper
export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm);
