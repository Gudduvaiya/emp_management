import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Style.css";

const Nav = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    // alert('User logged out Successfully!')
    navigate("/signup");
  };
  return (
    <div>
      {auth ? (
        <ul className="nav-ul">
          <li>
            <Link to="/">Holidays</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/signup" onClick={logout}>
              Log out
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="nav-ul text-right">
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
          <li>
            <Link to="/login">Log In</Link>
          </li>
        </ul>
      )}
    </div>
  );
};
export default Nav;
