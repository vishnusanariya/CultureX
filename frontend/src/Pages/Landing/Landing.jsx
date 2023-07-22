import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Landing = () => {
    const navigate=useNavigate();
    const handleSignIn=async()=>{
        const user=await axios.get('http://localhost:5000/users/auth');
        if(user){
            navigate('/');
        }
    }
    return (
    <>
      <h1>Welcom to my WEB-APP</h1>
        <button className="btn started" onClick={handleSignIn}>Sign in using Google</button>
    </>
  );
};

export default Landing;
