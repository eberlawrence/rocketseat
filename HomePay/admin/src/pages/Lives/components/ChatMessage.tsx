import React from "react";
import Moment from "react-moment";
import "moment/locale/pt-br";

interface Props {
  username: string;
  profilePicture: string;
  message: string;
  createdAt: string;
}

const ChatMessage: React.FC<Props> = ({ username, profilePicture, message, createdAt }) => {
  return (
    <div className="media">
      <div className="avatar">
        <img src={profilePicture} className="rounded-circle" alt="" />
      </div>
      <div className="media-body mg-l-10">
        <h6>
          {username}
          <small>
            {" - "}
            <Moment fromNow>{createdAt}</Moment>
          </small>
        </h6>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
