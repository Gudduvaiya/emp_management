import React from "react";

function Signup() {
  return (
    <div className="signup">
      <div className="register_head">
        <h1>REGISTER YOURSELF</h1>
      </div>
      <div className="form">
        <input type="text" placeholder="Enter Employee ID" />
        <input type="text" placeholder="Enter Employee Name" />
        <input type="email" placeholder="Enter Employee Email" />
        <input type="text" placeholder="Enter Employee Designation" />
        <input type="text" placeholder="Enter Date of Joining" />
        <input type="password" placeholder="Enter Employee Password" />
        <input type="password" placeholder="Confirm Password" />
        <button className="submitbtn">Register</button>
      </div>
    </div>
  );
}
export default Signup;
