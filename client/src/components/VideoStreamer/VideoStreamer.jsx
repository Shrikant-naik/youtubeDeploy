import React from "react";
import "./videostreamer.css";

function VideoStreamer({currentVideo}) {
  return <video className="videoStreamer" src={currentVideo?.videoUrl} controls></video>;
}

export default VideoStreamer;
