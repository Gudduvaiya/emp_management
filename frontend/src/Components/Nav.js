import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Style.css";

const Nav = ({ setLoginState }) => {
  const isAdmin = JSON.parse(localStorage.getItem("user")).is_admin;
  return (
    <div>
      <ul className="nav-ul">
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        {isAdmin ? (
          <li>
            <Link to="/users">Users</Link>
          </li>
        ) : (
          <span></span>
        )}
        <li>
          <Link to="/holidays">Holidays</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link
            onClick={() => {
              setLoginState(false);
            }}
          >
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};
export default Nav;
