import React from "react";
import "./videoheading.css";
import avatarIcon from "../../assets/imagesMain/userAvatar.png";
import likedIcon from "../../assets/streamerPage/likedIcon.svg";
import unlikedIcon from "../../assets/streamerPage/unlikedIcon.svg";
import shareIcon from "../../assets/streamerPage/forwardIcon.svg";
import saveIcon from "../../assets/streamerPage/saveIcon.svg";
import moreHorizIcon from "../../assets/streamerPage/moreHorizIcon.svg";
import { makeRequest } from "../../Axios.js";
import { useDispatch } from "react-redux";
import { dislike, like } from "../../redux/VideoSlice";
import { subscribedOrNot } from "../../redux/UserSlice";
import { useNavigate } from "react-router-dom";

function VideoHeading({ currentVideo, currentUser, user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const passToLogin = () => {
  //   return (window.location.href = "/login");
  // };

  const handleSub = async () => {
    if (!currentUser) {
      return navigate("/login");
    }
    try {
      if (currentUser?.subscribedUsers?.includes(currentVideo?.userId)) {
        await makeRequest.put(`users/unsub/${currentVideo.userId}`);
      } else {
        await makeRequest.put(`users/sub/${currentVideo.userId}`);
      }

      dispatch(subscribedOrNot(currentVideo.userId));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleLike = async () => {
    if (!currentUser) {
      return navigate("/login");
    }
    await makeRequest.put(`users/like/${currentVideo?._id}`);
    dispatch(like(currentUser._id));
  };

  const handleDislike = async () => {
    if (!currentUser) {
      return navigate("/login");
    }
    await makeRequest.put(`users/dislike/${currentVideo?._id}`);
    dispatch(dislike(currentUser._id));
  };

  return (
    <div className="videoHeading">
      <p className="videoHeadingPara">{currentVideo?.title}</p>
      <div className="headingMain">
        <div className="mainLHS">
          <img src={avatarIcon} alt="" />
          <div className="avatarParaSec">
            <p>{user.name}</p>
            <p>{user.subscribers} subscribers</p>
          </div>
          <span className="span1">Join</span>
          <span className="span2" onClick={handleSub}>
            {currentUser?.subscribedUsers?.includes(currentVideo?.userId)
              ? "unSubscribed"
              : "subscribe"}
          </span>
        </div>
        <div className="mainRHS">
          <div className="likeBtnSet">
            <button onClick={handleLike}>
              <img
                src={likedIcon}
                alt=""
                className={
                  currentVideo?.likes?.includes(currentUser?._id)
                    ? "border"
                    : ""
                }
              />

              <p className="span1">{currentVideo?.likes?.length}</p>
            </button>
            <button onClick={handleDislike}>
              <img
                src={unlikedIcon}
                alt=""
                className={
                  currentVideo?.dislikes?.includes(currentUser?._id)
                    ? "border"
                    : ""
                }
              />
            </button>
          </div>
          <button className="share">
            <img src={shareIcon} alt="" />
            <p>Share</p>
          </button>
          <button className="save">
            <img src={saveIcon} alt="" />
            <p>Save</p>
          </button>
          <button className="moreHoriz">
            <img src={moreHorizIcon} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default VideoHeading;
