import React from "react";
import { Link } from "react-router-dom";
import "../Style.css";

const Nav = ({ setLoginState }) => {
 
  return (
    <div>
      <ul className="nav-ul">
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
        <li>
          <Link to="/holidays">Holidays</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link onClick={() => setLoginState(false)}>Logout</Link>
        </li>
      </ul>
    </div>
  );
};
export default Nav;
