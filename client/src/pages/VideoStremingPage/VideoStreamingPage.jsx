import React, { useEffect, useState } from "react";
import "./videostreamingpage.css";
import Navbar from "../../components/Navbar/Navbar";
import VideoStreamer from "../../components/VideoStreamer/VideoStreamer";
import VideoHeading from "../../components/VideoHeading/VideoHeading";
import VideoDesc from "../../components/VideoDesc/VideoDesc";
import CommentSection from "../../components/CommentSection/CommentSection";
import Recommendations from "../../components/Recommendations/Recommendations";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchFailure, fetchStart, fetchSuccess } from "../../redux/VideoSlice";
import { makeRequest } from "../../Axios";

function VideoStreamingPage() {
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const dispatch = useDispatch();

  const path = useLocation().pathname.split("/")[2];

  // const [video, setVideo] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(fetchStart());
        const resVideo = await makeRequest.get(
          `videos/find/${path}`
        );
        dispatch(fetchSuccess(resVideo.data));
        const resUser = await makeRequest.get(
          `users/find/${resVideo.data.userId}`
        );

        // setVideo(resVideo.data)
        setUser(resUser.data);
      } catch (err) {
        dispatch(fetchFailure());
      }
    };
    fetchData();
  }, [path, dispatch]);

  return (
    <div className="streamerParent">
      <Navbar />
      <div className="streamerMain">
        <div className="streamer">
          <VideoStreamer currentVideo={currentVideo} />
          <VideoHeading currentVideo={currentVideo} user={user} currentUser={currentUser}/>
          <VideoDesc
            currentVideo={currentVideo}
          />
          <CommentSection currentVideoId={currentVideo?._id} currentUser={currentUser}/>
        </div>
        <Recommendations tags={currentVideo?.tags}/>
      </div>
    </div>
  );
}

export default VideoStreamingPage;
