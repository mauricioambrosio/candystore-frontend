import React from "react";
import moment from "moment";
import Rating from '@material-ui/lab/Rating';

const ReviewCard = ({ data }) => {
  return (
    <div className="media mb-2">
      <div className="media-body">
        <Rating name="read-only" value={data.score} readOnly/>
        {/* <h5 className="media-heading">{data.userName}</h5> */}
        <div>{data.text}</div>
        <ul className="list-unstyled list-inline media-detail pull-left">
          <li>
            <i className="fa fa-calendar"/>{" "}
            {/* {moment(data.createdAt.toDate()).format("YYYY/MM/DD HH:mm:ss")} */}
            {moment(data.dateTime).format("YYYY/MM/DD HH:mm:ss")}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ReviewCard;
