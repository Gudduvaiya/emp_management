import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./Pages/Login";
import Nav from "./Components/Nav";
import Home from "./Pages/Home";
import User from "./Pages/User";
import Profile from "./Pages/Profile";
import Holiday from "./Pages/Holiday";

import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setLoginState(localStorage.getItem("user") ? true : false);
  }, []);

  const setLoginState = (newState) => {
    navigate(newState ? "/" : "/login");
    if (!newState) localStorage.clear();
    setIsUserLoggedIn(newState);
  };

  return (
    <div style={{ display: "flex" }}>
      {isUserLoggedIn ? (
        <React.Fragment>
          <Nav setLoginState={setLoginState} />
          <div className="main-pages">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/users" element={<User />} />
              <Route path="/holidays" element={<Holiday />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
        </React.Fragment>
      ) : (
        <Routes>
          <Route
            path="/login"
            element={<Login setLoginState={setLoginState} />}
          />
        </Routes>
      )}
      <ToastContainer />
    </div>
  );
}

export default App;
