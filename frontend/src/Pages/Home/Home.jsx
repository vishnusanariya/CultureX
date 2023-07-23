import axios from "axios";
import React, { useEffect, useState } from "react";
import Upload from "../Upload/Upload";
import "./Home.css";
const Home = (props) => {
  const [data, setData] = useState([]);
  const user = props.user;
  // console.log(user);
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
  const renderFiles = () => {
    return data.map((item) => {
      if (item.type.startsWith("image")) {
        return (
          <div key={item._id} className="media-item-image">
            <div className="item-type">
              <p>Type: {item.type}</p>
            </div>
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
          <div key={item._id} className="media-item-video">
            <div className="item-type">
              <p>Type: {item.type}</p>
            </div>
            <div className="item-content">
              <video controls>
                <source
                  src={`http://localhost:5000/media/${item.fileName}`}
                  type={item.type}
                />
                
                Your browser does not support the video tag.
              </video>
            </div>
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
        <div className="media-container">{renderFiles()}</div>
        <button onClick={logout}>Logout</button>
      </div>
    </>
  );
};

export default Home;
