import React from "react";
import TextArea from "./common/textArea";

const CommentForm = ({ onSubmit, value, height, onChange, onCancel }) => {
  return (
    <div>
      <TextArea
        style={{ height: height }}
        value={value}
        onChange={e => onChange(e)}
      />

      <button
        disabled={!value}
        className="btn btn-primary"
        style={{ marginBottom: 20 }}
        onClick={onSubmit}
      >
        Comentar
      </button>

      <button
        className="btn btn-primary"
        style={{ marginBottom: 20, marginLeft: 10 }}
        onClick={onCancel}
      >
        Cancelar
      </button>
    </div>
  );
};

export default CommentForm;
