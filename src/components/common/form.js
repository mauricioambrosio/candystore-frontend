import React, { Component } from "react";
import Input from "./input";
import Select from "./select";
import FormDatePicker from "./formDatePicker";
import FormTimePicker, { TIME_FORMAT } from "./formTimePicker";

import TextArea from "./textArea";
import {Switch} from "antd";

import TagsInput from "./tagsInput";
import BaseJoi from "joi-browser";
import ImageExtention from "joi-image-extension";


const IMAGE_UPLOADER_NAME = "pictures";

// add image extension to joi
const Joi = BaseJoi.extend(ImageExtention);

// form components can inherit this class and have access to 
// its render, handle, and validate methods.
// all fields have to be included in state.data dictionary and 
// an empty state.errors dictionary have to be available  
class Form extends Component {
  
  // validate all fields in state.data and add messages to state.errors
  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);

    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;

    return errors;
  };

  // validate specific field and add message to state.errors
  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);

    return error ? error.details[0].message : null;
  };

  
  handleSubmit = (e) => {
    e.preventDefault();
    // validate all fields
    const errors = this.validate();
    this.setState({ errors: errors || {} });

    if (errors) return console.log(errors);
  
    this.doSubmit();
  };

  // handle value change in inputs
  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    // validate property
    const errorMessage = this.validateProperty(input);

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    // change input value in state.data
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  // handle value change in date and time pickers 
  handleDatePick = (name, date, defaultValue) => {
    
    if (date) date = date.toDate();
    else date = defaultValue;

    const errors = { ...this.state.errors };
    // validate property
    const errorMessage = this.validateProperty({ name: name, value: date });

    if (errorMessage) errors[name] = errorMessage;
    else delete errors[name];
    // change date or time picker value in state.data
    const data = { ...this.state.data };
    data[name] = date;
    this.setState({ data, errors });
  };

  // handle value change in tags input
  handleTagsChange = (name, tags) => {
    const errors = { ...this.state.errors };
    // validate property
    const errorMessage = this.validateProperty({ name: name, value: tags });

    if (errorMessage) errors[name] = errorMessage;
    else delete errors[name];
    // change tags input value in state.data
    const data = { ...this.state.data };
    data[name] = tags;
    return this.setState({ data, errors });
  };


  renderButton(label, disabled = true, colorString = "btn-primary") {
    return (
      <button
        disabled={disabled}
        className={"btn " + colorString}
        style={{ marginBottom: 20 }}
      >
        {label}
      </button>
    );
  }

  renderSwitch(name, label, callback=undefined) {
    return (
    <div>
      <label htmlFor={name}>{label}</label> 
      {" "}
      <Switch 
        name={name}
        checked={this.state.data[name]}
        onChange={(checked, event) => {
          const newState = { ...this.state };
          newState.data[name] = checked;
          
          if (callback) callback();

          this.setState(newState);
        }}
      />
    </div>);
  }

  // input for array variable storing multiple elements 
  renderTagsInput(
    name,
    label,
    disabled = false,
    placeholder = "",
    options = undefined
  ) {
    const { data, errors } = this.state;

    return (
      <TagsInput
        name={name}
        label={label}
        value={data[name]}
        options={options}
        onChangeCallback={this.handleTagsChange}
        disabled={disabled}
        placeholder={placeholder}
        error={errors[name]}
      />
    );
  }

  // multiline input
  renderTextArea(
    name,
    label,
    disabled = false,
    height = 250,
    placeholder = ""
  ) {
    const { data, errors } = this.state;

    return (
      <TextArea
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
        disabled={disabled}
        style={{ height: height }}
        placeholder={placeholder}
      />
    );
  }


  renderDatePicker(
    name,
    label,
    defaultValue = new Date(),
    disabled = false,
    disabledDate = null
  ) {
    const { data, errors } = this.state;

    const disabledDateCallback = {};
    if (disabledDate) disabledDateCallback.disabledDate = disabledDate;

    return (
      <FormDatePicker
        name={name}
        value={data[name]}
        label={label}
        onChange={(date) => this.handleDatePick(name, date, defaultValue)}
        error={errors[name]}
        format="YYYY/MM/DD"
        disabled={disabled}
        {...disabledDateCallback}
      />
    );
  }

  renderTimePicker(name, label, defaultValue = new Date(), disabled = false) {
    const { data, errors } = this.state;

    return (
      <FormTimePicker
        name={name}
        value={data[name]}
        label={label}
        onChange={(time) => this.handleDatePick(name, time, defaultValue)}
        error={errors[name]}
        format={TIME_FORMAT}
        disabled={disabled}
      />
    );
  }

  renderSelect(name, label, options, disabled = false, placeholder = "") {
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
        disabled={disabled}
        placeholder={placeholder}
      />
    );
  }

  renderInput(name, label, disabled = false, type = "text", placeholder = "") {
    const { data, errors } = this.state;

    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
        disabled={disabled}
        placeholder={placeholder}
      />
    );
  }
}

export default Form;
