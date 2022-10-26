import React, { useState,useEffect } from "react";

function Signup() {
  const [name, setname] = useState("");
  const [id, setid] = useState("");
  const [email, setemail] = useState("");
  const [designation, setdesignation] = useState("");
  const [doj, setdoj] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  const [admin, setadmin] = useState(false);
  const toggleadmin = () => {
    admin?setadmin(false):setadmin(true)
  };
 
  return (
    <div className="signup">
      <div className="register_head">
        <h1>REGISTER YOURSELF</h1>
      </div>
      <div className="form">
        <div>
          <label for="options">Register for: </label>
          <select className="options" onChange={toggleadmin}>
            <option id="emp" value={admin}>
              Employee
            </option>
            <option>Admin</option>
          </select>
        </div>

        {
          !admin?( <input
          type="text"
          placeholder="Enter Employee ID"
          value={id}
          onChange={(e) => {
            setid(e.target.value);
          }}
        />):(<span></span>)
        }
       
        <input
          type="text"
          placeholder="Enter Employee Name"
          value={name}
          onChange={(e) => {
            setname(e.target.value);
          }}
        />
        <input
          type="email"
          placeholder="Enter Employee Email"
          value={email}
          onChange={(e) => {
            setemail(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Enter Employee Designation"
          value={designation}
          onChange={(e) => {
            setdesignation(e.target.value);
          }}
        />
        <input
          type="date"
          placeholder="Enter Date of Joining"
          value={doj}
          onChange={(e) => {
            setdoj(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Enter Employee Password"
          value={password}
          onChange={(e) => {
            setpassword(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={cpassword}
          onChange={(e) => {
            setcpassword(e.target.value);
          }}
        />
        <button className="submitbtn">Register</button>
      </div>
    </div>
  );
}
export default Signup;
