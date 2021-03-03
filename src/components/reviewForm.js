import React from "react";
import TextArea from "./common/textArea";
import Rating from '@material-ui/lab/Rating';

// component for posting reviews
const ReviewForm = ({ onSubmit, text, rating, height, onChange, onRate, onCancel }) => {
  
  return (
    <div className="border-top">
      <Rating
        name="simple-controlled"
        className="mt-3"
        value={rating}
        onChange={(event, newValue) => onRate(newValue)}
        />

      <TextArea
        style={{ height: height }}
        value={text}
        onChange={e => onChange(e)}
      />

      <button
        disabled={rating === 0}
        className="btn btn-primary"
        style={{ marginBottom: 20 }}
        onClick={onSubmit}
      >
        Post
      </button>
      
      <button
        className="btn btn-primary ml-3"
        style={{ marginBottom: 20 }}
        onClick={onCancel}
      >
        Clear
      </button> 
    </div>
  );
};

export default ReviewForm;
