import axios from "axios";
import React, { useEffect, useState } from "react";
import Upload from "../Upload/Upload";

import "./Home.css";
import VideoPlayer from "../../Components/VideoPlayer";
const Home = (props) => {
  const [data, setData] = useState([]);
  const [videoId, setVideoId] = useState(null);
  const user = props.user;
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/media/files/${user.email}`
      );
      console.log(response);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const logout = () => {
    window.open("http://localhost:5000/auth/logout", "_self");
  };
  const playVideo = (e,videoId) => {
    e.preventDefault();
    setVideoId(videoId);
  }
  const renderFiles = () => {
    return data.map((item) => {
      if (item.type.startsWith("image")) {
        return (
          <div key={item._id} className="media-item-image">
            <div className="item-content">
              <img
                src={`http://localhost:5000/media/${item.fileName}`}
                alt={item.fileName}
                className="media-image"
              />
            </div>
          </div>
        );
      } else if (item.type.startsWith("video")) {
        return (
          <div className="video-type">
          <VideoPlayer videoId={item.fileName}/>
          {/* {videoId && <VideoPlayer videoId={videoId}/>}<br/> */}
          {/* <button onClick={(e)=>{playVideo(e,item.fileName)}}>Play video</button> */}
          </div>
        );
      } else {
        return (
          <div key={item._id}>
            <p>Type: {item.type}</p>
            <a href={item.filePath} target="_blank" rel="noopener noreferrer">
              {item.fileName}
            </a>
          </div>
        );
      }
    });
  };
  return (
    <>
      <div>
        <div className="upload">
          <Upload user={user} />
        </div>
        <h2>Uploaded items</h2>
        <div className="media-container">{renderFiles()}</div>
        <button onClick={logout}>Logout</button>
      </div>
    </>
  );
};

export default Home;
