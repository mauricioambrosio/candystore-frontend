import React from "react";
import ImageUploader from "react-images-upload";

const FormImageUploader = ({ name, error, ...rest }) => {
  return (
    <div className="form-group">
      <ImageUploader
        {...rest}
        name = {name}
        id = {name}
        withIcon = {true}
        withPreview = {true}
      />

      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default FormImageUploader;
