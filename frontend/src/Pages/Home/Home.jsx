import axios from "axios";
import React, { useEffect, useState } from "react";

const Home = (props) => {
  const [data, setData] = useState(null);
  const user=props.user;
  useEffect(() => {
    let listData= axios.get('http://localhost:5000/data');
    setData(listData);
  }, []);
  const logout=()=>{
    window.open('http://localhost:5000/auth/logout',"_self");
  }
  return (
    <>
      <div>
        <h1>Hello {user} please upload your media</h1>
        <div className="upload">
          <button>Upload media</button>
        </div>
        <div className="media-container">
            data & data.map({(key,item)=>{
                <div className="media-item">
                    {item}
                </div>
            }})
        </div>
        <button onClick={logout}>Logout</button>
      </div>
    </>
  );
};

export default Home;
