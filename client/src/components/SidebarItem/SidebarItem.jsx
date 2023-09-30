import React from "react";
import "./sidebaritem.css";
import { Link } from "react-router-dom";

function SidebarItem({ data }) {
  return (
    <Link to={data.link} style={{color:"inherit", textDecoration:"none", cursor:"pointer"}}>
      <div className="sidebarComp">
        <img src={data.icon} alt="" />
        <p>{data.title}</p>
      </div>
    </Link>
  );
}

export default SidebarItem;
