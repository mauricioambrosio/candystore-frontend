import React from "react";
import moment from "moment";

const CommentCard = ({ data, onReply }) => {
  return (
    <div className="media">
      <div className="media-body">
        {/* <h5 className="media-heading">{data.userName}</h5> */}
        <p>{data.text}</p>
        <ul className="list-unstyled list-inline media-detail pull-left">
          <li>
            <i className="fa fa-calendar"></i>
            {moment(data.createdAt.toDate()).format("YYYY/MM/DD HH:mm:ss")}
          </li>
          <li className="">
            <button
              type="button"
              className="btn btn-link"
              onClick={() => onReply()}
            >
              Responder
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CommentCard;
