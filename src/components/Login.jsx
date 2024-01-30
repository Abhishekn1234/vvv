import React from 'react'
import '../css/Login.css';
import logo from "../image/download.jpeg";
import { Link ,useNavigate} from 'react-router-dom';
import { useState,useContext } from 'react';
import {  toast } from 'react-toastify';
import { LoginContext } from '../context/LoginContext';
export default function Login() {
  const{setUserLogin}=useContext(LoginContext);
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const navigate=useNavigate();
  const notifyA=(msg)=>toast.error(msg);
  const notifyB=(msg)=>toast.success(msg);
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const postData = () => {
     
    if (!emailRegex.test(email)){
      notifyA("Invalid Email")
      return 
    }
    fetch("http://localhost:5000/login", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "Authorization":"ffff"+localStorage.getItem("jwt")
        },
        body: JSON.stringify({
           
            email: email,
           
            password: password,
        }),
    })
        .then((res) => res.json())
        .then((data) => {
          if(data.error){
            notifyA(data.error)
          }else{
            notifyB(data.message)
            notifyB("Successfully logged in");
            localStorage.setItem("jwt", data.token)
            localStorage.setItem("user",JSON.stringify(data.user))
            setUserLogin(true);
            navigate('/');
          }
         
        });
};
  return (
    <div className='login'>
        <div className="loginForm">
            <img className='signUpLogo' src={logo} alt="" />
            <div>
                <input type="email" name="email" id="email" placeholder='Email' value={email} onChange={(e)=>{setEmail(e.target.value)}} />
            </div>
            <div>
                <input type="password" name="password" id="password" placeholder='Password' value={password} onChange={(e)=>{setPassword(e.target.value)}} />
            </div>
            <input type="submit"  id="login-btn" value="Login" onClick={()=>{postData()}} />
            <div className="loginForm2">
        Don't Have an Account?
        <Link to="/signup">
        <span style={{color:"blue",cursor:'pointer'}}>Sign Up</span></Link>
       </div>
        </div>
       
    </div>
  )
}
