import React from 'react'
import { Link } from 'react-router-dom'
import { format } from 'timeago.js'
import "./SearchShow.css"

const SearchShow = ({data}) => {
  return (
    <div className="videoGridEle" >
      <Link to={`/videostreamingpage/${data._id}`} style={{color:"inherit", cursor:"pointer",textDecoration:"none"}}>
        <img src={data.imgUrl} className="videoGridElImg" alt="" />
        <div className="avatarParent">
          {/* <img src={user.img} alt="" /> */}
          <p>{data.title}</p>
        </div>
        <div className="userInfo">
          {/* <p>{user.name}</p> */}
          <p>{"ho"}</p>
          <p>
            {data.views} views • {format(data.createdAt)}
          </p>
        </div>
      </Link>
    </div>
  )
}

export default SearchShow
