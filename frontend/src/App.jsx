import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Landing from "./Pages/Landing/Landing";
import NoPage from "./Components/NoPage";
import { useEffect, useState } from "react";
import axios from "axios";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";

function App() {
  const [user, setUser] = useState(null);
  let username;
  const getUser = async () => {
    try {
      const url = "http://localhost:5000/auth/login/success";
      axios.get(url, { withCredentials: true })
      .then((res)=>{
        // setUser(res.)
        // console.log(res.data.user);
        setUser(res.data.user.displayName);
      }).catch((err)=>{console.log(err)});
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getUser();
  }, [user]);
  console.log("user:",user)
  return (
    <>
      <h2>User:{username}</h2>
      <Routes>
        <Route
          exact
          path="/"
          element={user ? <Home user={user} /> : <Navigate to="/login" />}
        />
        <Route
          exact
          path="/login"
          element={user ? <Navigate to="/" /> : <Login />}
        />
        <Route
          exact
          path="/signup"
          element={user ? <Navigate to="/" /> : <Login />}
        />
        <Route path="*" element={<NoPage/>}/>
      </Routes>
    </>
  );
}

export default App;
