import React from "react";
import "./videodesc.css";
import {format} from "timeago.js"

function VideoDesc({ currentVideo}) {
  return (
    <div className="videosDesc">
      <p>{currentVideo?.views} views {format(currentVideo?.createdAt)}</p>
      <p>{currentVideo?.desc}</p>
      <br />
      <br />
      <p>Show more</p>
    </div>
  );
}

export default VideoDesc;
