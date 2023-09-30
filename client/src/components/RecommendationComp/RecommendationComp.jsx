import React, { useEffect, useState } from "react";
import "./recommendationcomp.css";
import { format } from "timeago.js";
import { makeRequest } from "../../Axios";
import { Link } from "react-router-dom";

function RecommendationComp({ data }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const res = await makeRequest.get(`users/find/${data.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [data.userId]);

  return (
    <Link className="recommEle" to={`/videostreamingpage/${data._id}`} style={{color:"inherit", cursor:"pointer",textDecoration:"none"}}>
      <img src={data?.imgUrl} alt="" />
      <div className="recommDesc">
        <p>{data?.title}</p>
        <p>{user?.name}</p>
        <p>{data?.views} views • {format(data?.createdAt)}</p>
      </div>
    </Link>
  );
}

export default RecommendationComp;
