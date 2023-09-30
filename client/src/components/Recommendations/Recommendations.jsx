import React, { useEffect, useState } from "react";
import "./recommendations.css";
// import { vidGridDataSet } from "../../ComponentsDataset";
import RecommendationComp from "../RecommendationComp/RecommendationComp";
import { makeRequest } from "../../Axios";

function Recommendations({ tags }) {
  // console.log(tags)

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideo = async () => {
      const res = await makeRequest.get(`/videos/tags?tags=${tags}`)
      setVideos(res.data)
    };
    fetchVideo();
  }, [tags]);

  return (
    <div className="recommParent">
      {videos.map((data) => (
        <RecommendationComp data={data} key={data._id} />
      ))}
    </div>
  );
}

export default Recommendations;



// {vidGridDataSet.map((data) => (
  // <RecommendationComp data={data} key={data.id} />
// ))}
