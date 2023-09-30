import React from "react";
import "./sidebar.css";
import signinIcon from "../../assets/navbar/searchIcoLight.svg";
import { dataSet1, dataSet2, dataSet3 } from "../../ComponentsDataset";
import SidebarItem from "../SidebarItem/SidebarItem";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Sidebar() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="sidebarParent">
      {dataSet1.map((data) => (
        <SidebarItem data={data} key={data.id} />
      ))}
      <span className="secEndLine"></span>

      {dataSet2.map((data) => (
        <SidebarItem data={data} key={data.id} />
      ))}
      <span className="secEndLine"></span>

      {!currentUser && (
        <section>
          <p>
            Sign in to like videos,
            <br /> comment, and subscribe.
          </p>
          <Link
            to="/login"
            style={{ textDecoration: "none", color: "inherit"}}
          >
            <button>
              <img src={signinIcon} alt="" />
              <p>Sign in</p>
            </button>
          </Link>
          <span className="secEndLine"></span>
        </section>
      )}

      {dataSet3.map((data) => (
        <SidebarItem data={data} key={data.id} />
      ))}
    </div>
  );
}

export default Sidebar;
