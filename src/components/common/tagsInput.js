import React, { Component, useState } from "react";
import { forEach } from "underscore";

export const TagsInput = ({
  name,
  label,
  error,
  value,
  onChangeCallback,
  options,
  disabled,
  ...rest
}) => {
  const [inputValue, setInputValue] = useState("");

  function renderInput() {
    return (
      <input
        {...rest}
        value={inputValue}
        type="text"
        name={name}
        id={name}
        disabled={disabled}
        className="form-control"
        onChange={({ currentTarget: input }) => setInputValue(input.value)}
      />
    );
  }
  function renderSelect() {
    return (
      <select
        {...rest}
        id={name}
        value={inputValue}
        name={name}
        disabled={disabled}
        className="form-control"
        onChange={({ currentTarget: input }) => setInputValue(input.value)}
      >
        <option value="" />
        {options.map((option) => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>
    );
  }

  function renderTags() {
    return (
      <div className="tags-input border rounded">
        {options ? renderSelect() : renderInput()}

        <i
          role="button"
          className="fa fa-plus-circle text-secondary mr-2 fa-2x"
          onClick={() => {
            if (disabled) return;
            if (inputValue !== "" && !value.includes(inputValue)) {
              onChangeCallback(name, [...value, inputValue]);
              setInputValue("");
            }
          }}
        />
        
        {value.map((tag, index) => (
          <span key={index}>
            <span>{tag}</span>
            {" "}
            <i
              role="button"
              className="fa fa-times-circle text-secondary mr-2 fa-lg"
              onClick={() => {
                if (disabled) return;
                value = [
                  ...value.filter((tag) => value.indexOf(tag) !== index),
                ];
                onChangeCallback(name, value);
              }}
            />
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>

      {renderTags()}

      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default TagsInput;
