import React, { useState } from "react";
import "./navbar.css";
import menuIcon from "../../assets/navbar/menuBurger.svg";
import ytLogo from "../../assets/navbar/ytLogoLight.svg";
import searchIcon from "../../assets/navbar/searchIcoLight.svg";
import micIcon from "../../assets/navbar/mikeIconLight.svg";
import moreIcon from "../../assets/navbar/moreIconLight.svg";
import signinIcon from "../../assets/navbar/signInLight.svg";
import subscriptionsIcon from "../../assets/sidebar/subscriptionIco.svg";

import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../redux/UserSlice";
import { useDispatch } from "react-redux";
import Upload from "../Upload/Upload";

function Navbar() {
  const [openUpload, setOpenUpload] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <nav>
        <div className="navLHS">
          <img src={menuIcon} alt="" />
          <Link
            to="/"
            style={{
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            <img src={ytLogo} alt="" />
          </Link>
        </div>
        <div className="searchSec">
          <div className="searchBar">
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => setQuery(e.target.value)}
            />
            <button>
              <img
                src={searchIcon}
                alt=""
                onClick={() => navigate(`/search?search=${query}`)}
              />
            </button>
          </div>
          <div className="micIcon">
            <img src={micIcon} alt="" />
          </div>
        </div>
        <div className="navRHS">
          <img src={moreIcon} alt="" />
          {currentUser ? (
            <div className="user">
              <img
                src={subscriptionsIcon}
                alt=""
                onClick={() => setOpenUpload(true)}
              />
              <img src={currentUser.img} alt="" className="avatar" />
              {currentUser.name}
              <button className="logout" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <button className="signInBtn">
              <img src={signinIcon} alt="" />
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Sign in
              </Link>
            </button>
          )}
        </div>
      </nav>
      {openUpload && <Upload setOpenUpload={setOpenUpload} />}
    </div>
  );
}

export default Navbar;
