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
  const [err,seterr]=useState(false)
  const [serverErr, setserverErr] = useState(null);
  const toggleadmin = () => {
    admin?setadmin(false):setadmin(true)
  };

  const onclickHandle=async()=>{
    if(!name || !id ||!email || !designation || !password || !cpassword){
      seterr(true)
      return false
    }
    // err && !id && <span className="err-msg">Employee ID can not be Blank!</span>
try {
  let result=await fetch('http://localhost:4500/emp/add-emp',{
      method:'post',
      body:JSON.stringify({name,id,email,designation,password,admin}),
      headers: { "Content-Type": "application/json" },
    })
    result=await result.json();
    console.log(result);
    localStorage.setItem("Emp/Admin",JSON.stringify(result))
} catch (error) {
    setserverErr(error.error.message)
}
  }
 
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
        />)
          /* (err && !id)?(<span className="err-msg">Employee ID can not be Blank!</span>):(<span></span>) */
         :(<span></span>)
        
        }
       
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => {
            setname(e.target.value);
          }}
        />
        {err && !name && <span className="err-msg">Name can not be Blank!</span>}
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => {
            setemail(e.target.value);
          }}
        />
        {err && !email && <span className="err-msg">Email can not be Blank!</span>}
        {serverErr && <span className="err-msg">{serverErr}</span>}
        <input
          type="text"
          placeholder="Enter Designation"
          value={designation}
          onChange={(e) => {
            setdesignation(e.target.value);
          }}
        />
        {err && !designation && <span className="err-msg">Designation can not be Blank!</span>}

        <input
          type="date"
          placeholder="Enter Date of Joining"
          value={doj}
          onChange={(e) => {
            setdoj(e.target.value);
          }}
        />
        {err && !doj && <span className="err-msg">Date of Joining can not be Blank!</span>}

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => {
            setpassword(e.target.value);
          }}
        />
        {err && !password && <span className="err-msg">Password can not be Blank!</span>}

        <input
          type="password"
          placeholder="Confirm Password"
          value={cpassword}
          onChange={(e) => {
            setcpassword(e.target.value);
          }}
        />
        {err && !cpassword && <span className="err-msg">Confirm Password can not be Blank!</span>}

        <button className="submitbtn" onClick={onclickHandle}>Register</button>
      </div>
    </div>
  );
}
export default Signup;
