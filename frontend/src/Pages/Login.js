import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../Style.css"

const Login = ({setLoginState}) => {
  const [username, setid] = useState("");
  const [password, setpassword] = useState("");
  const navigate=useNavigate()

  useEffect(()=>{
    if(localStorage.getItem("user")) setLoginState(true);
  },[]);

  const sendData=async()=>{
    axios.post('http://localhost:4500/api/v1/user/login',{username,password})
    .then((res)=>{
      console.log(res);
      toast.success("Welcome to Dashboard!",{
        position: "top-center"
      });
      setLoginState(true);
      localStorage.setItem("user",JSON.stringify(res.data.data))
      localStorage.setItem("Auth Token",res.data.token)
    })
    .catch((err)=>{
      console.log(err);
      toast.error(err.response.data.error,{
            position: "top-center"})
    })

    // let result=await fetch('http://localhost:4500/api/v1/user/login',{
    //   method:"post",
    //   body:JSON.stringify({username,password}),
    //   headers:{"Content-Type":"application/json"}
    // })
    // result=await result.json()
    // if(result.token){
    //   toast("Welcome to Dashboard!",{
    //     position: "top-center"})
    //   localStorage.setItem('user',JSON.stringify(result.data))
    //   localStorage.setItem('Auth Token',JSON.stringify(result.token))
    // }
    // else if(!result.result){
    //   toast.error("Invalid credentials!",{
    //     position: "top-center"})
    // }
    // else{
    //   toast.error("User not Found!",{
    //     position: "top-center"})
    // }
  }
  return (
    <div className="login">
    <div className="head"></div>
      <div className="login_head">
        <h1>WELCOME!</h1>
        <h3>Login yourself to continue!</h3>
      </div>
      <div className="login-form">
        <input
          type="text"
          placeholder="Enter Your Username"
          value={username}
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

        <button className="submitbtn" onClick={sendData}>Sign In</button>
      </div>
    <div className="footer"></div>
   
    </div>
  );
};
export default Login;
