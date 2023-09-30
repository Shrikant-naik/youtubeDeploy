import React from "react";
import "./homepage.css";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Tagsbar from "../../components/Tagsbar/Tagsbar";
import VideosGrid from "../../components/VideosGrid/VideosGrid";

function Homepage({type}) {

  return (
    <div className="homepage">
      <Navbar />
      <div className="mainParent">
        <Sidebar />
        <div className="gridMain">
          <Tagsbar />
          <VideosGrid type={type}/>
          {/* {isquery ? <SearchShow/>:<VideosGrid type={type}/>} */}
        </div>
      </div>
    </div>
  );
}

export default Homepage;
