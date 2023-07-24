import axios from "axios";
import React, { useEffect, useState } from "react";
import Upload from "./Components/Upload";

import "./Home.css";
import VideoPlayer from "../../Components/VideoPlayer";
const Home = (props) => {
  const [data, setData] = useState([]);
  const user = props.user;
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://culture-x-server.vercel.app/media/files/${user.email}`
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
    window.open("https://culture-x-server.vercel.app/auth/logout", "_self");
  };
  const renderFiles = () => {
    return data.map((item) => {
      if (item.type.startsWith("image")) {
        return (
          <div key={item._id} className="media-item-image">
            <div className="item-content">
              <img
                src={`https://culture-x-server.vercel.app/media/${item.fileName}`}
                alt={item.fileName}
                className="media-image"
              />
            </div>
          </div>
        );
      } else if (item.type.startsWith("video")) {
        return (
          <div className="video-type" key={item._id}>
              <VideoPlayer videoId={item.fileName} />
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
      <button className="logout-btn" onClick={logout}>
        Logout
      </button>
      <div className="container">
        <div className="upload">
          <Upload user={user} fetchData={fetchData} />
        </div>
        <h2>Uploaded items</h2>
        <div className="media-container">{renderFiles()}</div>
      </div>
    </>
  );
};

export default Home;
