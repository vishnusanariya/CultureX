import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Landing = () => {
    const navigate=useNavigate();
    const handleAuth=() => {
      window.open("http://localhost:5000/auth/google/callback","_self")
  }
    return (
    <>
      <h1>Welcom to my WEB-APP</h1>
        <button className="btn started" onClick={handleAuth}>Sign in using Google</button>
        <button className="btn started" onClick={handleAuth}>Sign up using Google</button>
    </>
  );
};

export default Landing;
