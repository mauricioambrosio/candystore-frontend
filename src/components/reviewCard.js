import React from "react";
import moment from "moment";
import Rating from '@material-ui/lab/Rating';

// review card shows review score, review text, and timestamp
const ReviewCard = ({ data }) => {
  return (
    <div className="media mb-2 pt-3 pb-3 border-top">
      <div className="media-body">
        <Rating name="read-only" value={data.score} size="small" readOnly/>
        {/* <h5 className="media-heading">{data.userName}</h5> */}
        <div>{data.text}</div>
        <ul className="list-unstyled list-inline media-detail pull-left">
          <li>
            <i className="fa fa-calendar"/>{" "}
            {/* {moment(data.createdAt.toDate()).format("YYYY/MM/DD HH:mm:ss")} */}
            {moment(data.createdAt).format("YYYY/MM/DD HH:mm:ss")}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ReviewCard;
