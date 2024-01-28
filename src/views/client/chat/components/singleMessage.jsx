import React, { useState } from "react";
import { useDispatch } from "react-redux";
import ExitFill from "../../../../assets/icons/exitFill";
import ExitNoFill from "../../../../assets/icons/exitNoFill";
import { getUserInbox } from "../../../../redux/features/userSlice";
import { doApiMethod } from "../../../../api/services/axios-service/axios-service";

const SingleMessage = ({ msg, user, roomID, deleteMsg, msg_id }) => {
  const dispatch = useDispatch();
  const [over, setOver] = useState(false);
  const [showDel, setShowDel] = useState(false);

  const deleteMessage = async (id) => {
    let url = `/users/deleteMessage/${roomID}/${id}`;
    await doApiMethod(url, "DELETE");
    dispatch(getUserInbox());
  };
  return (
    <li
      onMouseOver={() => setShowDel(true)}
      onMouseLeave={() => setShowDel(false)}
      className={`shadow-xl mt-3 relative ${
        msg?.sender === user._id ? "self-start" : "self-end"
      } py-1 px-4 bg-white rounded`}
    >
      {showDel ? (
        <span
          className="mr-4 rounded-full absolute -right-3"
          onMouseOver={() => setOver(true)}
          onMouseLeave={() => setOver(false)}
          onClick={() => {
            deleteMessage(msg_id);
            deleteMsg(msg_id);
          }}
        >
          {over ? (
            <ExitFill className="icon" width={8} height={8} />
          ) : (
            <ExitNoFill className="icon" width={8} height={8} />
          )}
        </span>
      ) : null}
      <div className="flex flex-col">
        <small
          className={`p-0 capitalize ${
            msg?.sender === user._id ? "self-start" : "self-end"
          }`}
        >
          {msg?.userName}
        </small>
        <hr />
        <p
          className={`p-0 ${
            !msg?.sender === user._id ? "self-start" : "self-end"
          }`}
        >
          {msg?.message}
        </p>
      </div>
    </li>
  );
};

export default SingleMessage;
