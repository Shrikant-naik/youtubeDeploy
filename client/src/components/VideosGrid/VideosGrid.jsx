import React, { useEffect, useState } from "react";
import "./videosgrid.css";
import VideoGridComp from "../VideoGridComp/VideoGridComp";
// import { vidGridDataSet } from "../../ComponentsDataset";
import { makeRequest } from "../../Axios";
function VideosGrid({ type, query }) {

  const [video, setVideo] = useState([]); //step 1

  useEffect(() => {
    //2
    const fetchData = async () => {
      const res = query
        ? await makeRequest.get(`/videos/search${query}`)
        : type !== undefined && (await makeRequest.get(`/videos/${type}`));
      setVideo(res.data);
    };
    fetchData();
  }, [type, query]);

  return (
    <div className="videoGridSec">
      {video?.map((data) => (
        <VideoGridComp data={data} key={data._id}/>
      ))}
    </div>
  );
}

export default VideosGrid;

//  <div className="videoGridSec">
//   {vidGridDataSet.map((data) => (
//     <VideoGridComp data={data} key={data.id} />
//   ))}
// </div>;
