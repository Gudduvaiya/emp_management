import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Style.css";

const Nav = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    // alert('User logged out Successfully!')
    navigate("/login");
  };
  return (
   
    <div>
      <ul className="nav-ul">
          <li>
            <Link to="/user">Users</Link>
          </li>
          <li>
            <Link to="/holiday">Holiday</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/login" onClick={logout}>
              Log out
            </Link>
          </li>
        </ul>
    </div>
    
  );
};
export default Nav;
