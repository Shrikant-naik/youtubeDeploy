import {  useLocation } from "react-router-dom";
// import VideoGridComp from "../../components/VideoGridComp/VideoGridComp";
// import SearchShow from "../../components/SearchShow/SearchShow";
import VideosGrid from "../../components/VideosGrid/VideosGrid";
// import "./SearchPage.css"

const SearchPage = () => {
  // const [video, setVideo] = useState([]);

  const query = useLocation().search;
  console.log(query)

  // useEffect(() => {
  //   const fetchVideo = async () => {
  //     const res = await makeRequest.get(`/videos/search?search=${query}`);
  //     console.log(res.data);
  //     setVideo(res.data);
  //   };
  //   fetchVideo();
  // }, [query]);

  return (
    <div>
        <VideosGrid query={query} />
    </div>
  );
};

export default SearchPage;
