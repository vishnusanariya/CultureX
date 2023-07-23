import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Landing from "./Pages/Landing/Landing";
import NoPage from "./Components/NoPage";
import { useEffect, useState } from "react";
import axios from "axios";
import Home from "./Pages/Home/Home";

function App() {
  const [user, setUser] = useState(null);
  const getUser = async () => {
    try {
      const url = "http://localhost:5000/auth/login/success";
      axios.get(url, { withCredentials: true })
      .then((res)=>{
        setUser({displayName: res.data.user.displayName, email: res.data.user.emails[0].value});
      }).catch((err)=>{console.log(err)});
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      <Routes>
        <Route
          exact
          path="/"
          element={user ? <Home user={user} /> : <Landing/>}
        />
        <Route
          exact
          path="/login"
          element={user ? <Navigate to="/" /> : <Landing />}
        />
        <Route
          exact
          path="/signup"
          element={user ? <Navigate to="/" /> : <Landing />}
        />
        <Route path="*" element={<NoPage/>}/>
      </Routes>
    </>
  );
}

export default App;
