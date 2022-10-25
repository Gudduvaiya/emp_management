import React from "react";

const Login = () => {
  return (
    <div className="signup">
      <div className="register_head">
        <h1>SIGN IN YOURSELF</h1>
      </div>
      <div className="login-form">
        <input type="text" placeholder="Enter Your Employee ID" />
       
        <input type="password" placeholder="Enter Password" />
        
        <button className="submitbtn">Sign In</button>
      </div>
    </div>
  );
};
export default Login;
