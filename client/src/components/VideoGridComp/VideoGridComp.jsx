import React, { useEffect, useState } from "react";
import "./videogridcomp.css";
import { format } from "timeago.js";
// import demoavatar from "../../assets/imagesMain/userAvatar.png";
import axios from "axios";
import { Link } from "react-router-dom";
import { makeRequest } from "../../Axios";

function VideoGridComp({ data }) {


  const handleView = async() =>{
     await makeRequest.put(`videos/view/${data._id}`)
  }



  const [user, setUser] = useState({}); //step 1

  useEffect(() => {
    //2
    const fetchUser = async () => {
      const res = await makeRequest.get(
        `users/find/${data.userId}`
      );
      setUser(res.data);
    };
    fetchUser();
  }, [data.userId]);

  return (
    <div className="videoGridEle" onClick={handleView} >
      <Link to={`/videostreamingpage/${data._id}`} style={{color:"inherit", cursor:"pointer",textDecoration:"none"}}>
        <img src={data.imgUrl} className="videoGridElImg" alt="" />
        <div className="avatarParent">
          <img src={user.img} alt="" />
          <p>{data.title}</p>
        </div>
        <div className="userInfo">
          <p>{user.name}</p>
          <p>
            {data.views} views • {format(data.createdAt)}
          </p>
        </div>
      </Link>
    </div>
  );
}

export default VideoGridComp;

//  <div className="videoGridEle">
//       <img src={data.icon} className="videoGridElImg" alt="" />
//       <div className="avatarParent">
//         <img src={demoavatar} alt="" />
//         <p>{data.header}</p>
//       </div>
//       <div className="userInfo">
//         <p>{data.subHeader}</p>
//         <p>{data.dateDetails}</p>
//       </div>
//     </div>
