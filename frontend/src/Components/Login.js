import React, { useState } from "react";

const Login = () => {
  const [id, setid] = useState("");
  const [password, setpassword] = useState("");
  return (
    <div className="signup">
      <div className="register_head">
        <h1>SIGN IN YOURSELF</h1>
      </div>
      <div className="login-form">
        <input
          type="text"
          placeholder="Enter Your Employee ID"
          value={id}
          onChange={(e) => {
            setid(e.target.value);
          }}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => {
            setpassword(e.target.value);
          }}
        />

        <button className="submitbtn">Sign In</button>
      </div>
    </div>
  );
};
export default Login;
