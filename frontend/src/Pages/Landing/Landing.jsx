import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Landing = () => {
    const handleAuth=() => {
      window.open("http://localhost:5000/auth/google/callback","_self")
  }
    return (
    <>
      <h1>Welcom to Media Upload (MED-UP) </h1>
        <button className="btn started" onClick={handleAuth}>Get Started with Google</button>
    </>
  );
};

export default Landing;
