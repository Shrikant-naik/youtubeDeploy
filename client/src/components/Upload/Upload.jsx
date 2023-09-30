import { useEffect, useState } from "react";
import "./upload.css";
import {makeRequest} from "../../Axios"
import {useNavigate} from "react-router-dom"

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";

const Upload = ({ setOpenUpload }) => {
  const [video, setVideo] = useState(undefined);
  const [img, setImg] = useState(undefined);
  const [imgPerc, setImgPerc] = useState(0);
  const [videoPerc, setVideoPerc] = useState(0);
  const [inputs, setInputs] = useState({});
  const [tags, setTags] = useState([]);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleTags = (e) => {
    setTags(e.target.value.split(","));
  };

  const uploadFile = (file, urlType) => {
    const storage = getStorage(app); // create storage
    const fileName = new Date().getTime() + file.name; // create unique file name
    const storageRef = ref(storage, fileName); // stored with file name
    const uploadTask = uploadBytesResumable(storageRef, file); // time to store

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100; // fa progress no generate karato ani mnun uploadFile fn madhe urlType
        urlType === "imgUrl"
          ? setImgPerc(Math.round(progress))
          : setVideoPerc(Math.round(progress)); // variable madhe rounded no set zala
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default: // defalult is required
            break;
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => {
            //1
            return { ...prev, [urlType]: downloadURL }; //2
          }); //3
        });
      }
    );
  };

  useEffect(() => {
    video && uploadFile(video, "videoUrl");
  }, [video]);

  useEffect(() => {
    img && uploadFile(img, "imgUrl");
  }, [img]);

  const handleUpload = async (e) => {
    e.preventDefault();

    const res = await makeRequest.post("/videos", { ...inputs, tags });
    setOpenUpload(false);
    res.status === 200 && navigate(`/videostreamingpage/${res.data._id}`);
  };

  return (
    <div className="uploadContainer">
      <div className="uploadWrapper">
        <div onClick={() => setOpenUpload(false)} className="uploadClose">
          X
        </div>
        <h1 className="uploadTitle">Upload a New Video</h1>
        <label className="uploadLabel">Video:</label>

        {videoPerc > 0 ? (
          "Uploading:" + videoPerc
        ) : (
          <input
            className="uploadInput"
            type="file"
            accept="video/*"
            onChange={(e) => {
              setVideo(e.target.files[0]);
            }}
          />
        )}

        <input
          className="uploadInput"
          type="text"
          placeholder="Title"
          name="title"
          onChange={handleChange}
        />
        <textarea
          className="uploadDesc"
          placeholder="Description"
          name="desc"
          rows={8}
          onChange={handleChange}
        />
        <input
          className="uploadInput"
          type="text"
          placeholder="Separate the tags with commas."
          onChange={handleTags}
        />
        <label className="uploadLabel">Image:</label>

        {imgPerc > 0 ? (
          "Uploading:" + imgPerc + "%"
        ) : (
          <input
            className="uploadInput"
            type="file"
            accept="image/*"
            onChange={(e) => {
              setImg(e.target.files[0]);
            }}
          />
        )}
        <button className="uploadButton" onClick={handleUpload}>Upload</button>
      </div>
    </div>
  );
};

export default Upload;
