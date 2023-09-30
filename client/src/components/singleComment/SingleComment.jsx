import React, { useEffect, useState } from "react";
import "./singleComment.css";
import likedIcon from "../../assets/streamerPage/likedIcon.svg";
import unlikedIcon from "../../assets/streamerPage/unlikedIcon.svg";
import { makeRequest } from "../../Axios";
import {format} from "timeago.js"

function SingleComment({ comment }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const res = await makeRequest.get(`users/find/${comment.userId}`);
      setUser(res.data);
    };
    comment?.userId && fetchUser();
  }, [comment.userId]);



  return (
    <div className="SingleComment">
      <div className="commentMain">
        <img src={user?.img} alt="" />
        <div className="commentMainRHS">
          <div className="commentUser">
            <p>@{user?.name}</p>
            <p>{format(comment?.createdAt)}</p>
          </div>
          <p className="comment">{comment.desc}</p>
          <div className="commentReact">
            <div className="likedComm">
              <img src={likedIcon} alt="" />
              <p>26K</p>
            </div>
            <img src={unlikedIcon} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleComment;
