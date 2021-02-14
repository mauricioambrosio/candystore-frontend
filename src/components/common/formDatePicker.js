import React from "react";
// import DatePicker from 'react-date-picker';
import moment from "moment";
import { DatePicker } from "antd";

const FormDatePicker = ({ name, label, error, value, ...rest }) => {
    return (
        < div style={{ borderRadius: 50 }}
            className="form-group">
            <label htmlFor={name}>{label}</label>
            <DatePicker
                {...rest}
                name={name}
                id={name}
                className="form-control"
                value={moment(value)}
            />
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
};

export default FormDatePicker;