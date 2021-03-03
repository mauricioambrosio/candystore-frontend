import React from "react";
import moment from "moment";
import { TimePicker } from "antd";

export const TIME_FORMAT = "HH:mm";

const FormTimePicker = ({ name, label, error, value, ...rest }) => {
  return (
    <div style={{ borderRadius: 50 }} className="form-group">
      <label htmlFor={name}>{label}</label>
      <TimePicker
        {...rest}
        name={name}
        id={name}
        className="form-control"
        value={moment(value, TIME_FORMAT)}
        showNow={false}
      />
      
      {/* show validate error message */}
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default FormTimePicker;
