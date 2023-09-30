import React, { useState } from "react";
import "./loginpage.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../../redux/UserSlice";

import { auth, provider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";
import {useNavigate} from "react-router-dom"

import { makeRequest } from "../../Axios";

const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerSuccessMess, setRegisterSuccessMess] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await makeRequest.post(
        "auth/login",
        {
          name: userName,
          password,
        },
        {
          withCredentials: true,
          sameSite: false,
        }
      );

      dispatch(loginSuccess(res.data));
      navigate("/")
    } catch (err) {
      dispatch(loginFailure());
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await makeRequest.post(
        "auth/createUser",
        {
          name: userName,
          password,
          email,
        }
      );
      setRegisterSuccessMess(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const signInWithGoogle = () => {
    dispatch(loginStart());

    signInWithPopup(auth, provider)
      .then(async (result) => {
        console.log(result);
        await makeRequest
          .post("auth/google", {
            name: result.user.displayName,
            email: result.user.email,
            img: result.user.photoURL,
          })
          .then((res) => {
            dispatch(loginSuccess(res.data));
          });
      })
      .catch((err) => {
        dispatch(loginFailure());
      });
  };

  return (
    <div className="loginContainer">
      <div className="wrapper">
        <h1 className="title">Sign in</h1>
        <h2 className="subtitle">to continue to Youtube</h2>
        <input
          className="Input"
          placeholder="username"
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          className="Input"
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="button" onClick={handleLogin}>
          Sign in
        </button>
        <h1 className="title">or</h1>
        <button className="button">
          Signin with Google
        </button>
        <h1 className="title">or</h1>
        <input
          className="Input"
          placeholder="username"
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          className="Input"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="Input"
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="button">
          Sign up
        </button>
        {registerSuccessMess && registerSuccessMess}
      </div>
      <div className="More">
        English(USA)
        <div className="links">
          <span className="link">Help</span>
          <span className="link">Privacy</span>
          <span className="link">Terms</span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
