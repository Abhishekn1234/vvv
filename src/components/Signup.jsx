import React,{useEffect,useState} from 'react'
import logo from"../image/download.jpeg"
import '../css/Signup.css';
import { Link,useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';
export default function Signup() {
  const[name,setName]=useState("");
  const[userName,setUserName]=useState("");
  const[password,setPassword]=useState("");
  const[email,setEmail]=useState("");
  const navigate=useNavigate();
  const notifyA=(msg)=>toast.error(msg);
  const notifyB=(msg)=>toast.success(msg);
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const passRegex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  const postData = (event) => {
    event.preventDefault(); 
    if (!emailRegex.test(email)){
      notifyA("Invalid Email")
      return 
    }else if(!passRegex.test(password)){
       notifyA("Password must contain atleast 8 characters ,including at least 1 number and 1 character and 1 includes both lower and uppercase characters and special characters and special characters for example #,?,!")
       return
    }
    fetch("http://localhost:5000/signup", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: name,
            email: email,
            userName: userName,
            password: password,
        }),
    })
        .then((res) => res.json())
        .then((data) => {
          if(data.error){
            notifyA(data.error)
          }else{
            notifyB(data.message);
            navigate('/login');
          }
          console.log(data);
        });
};

  return (
    <div className='signUp'>
     <div className='form-container'><br/>
        <div className="form">
      <img  className="signUpLogo"src={logo} alt="" />
      <p className='loginPara'>
        Sign Up and explore
      </p>
      <div>
        <input type="email" name='email' id='email' value={email} onChange={(e)=>{setEmail(e.target.value)}}placeholder='Email address' />
      </div>
      <div>
        <input type="text" name='name' id='name'placeholder='Full Name'  value={name} onChange={(e)=>{setName(e.target.value)}}/>
      </div>
      <div>
        <input type="text" name='username' id='username'placeholder='Username' value={userName} onChange={(e)=>{setUserName(e.target.value)}} />
      </div>
      <div>
        <input type="password" name='password' id='password'placeholder='password' value={password} onChange={(e)=>{setPassword(e.target.value)}} />
      </div>
      <p className='loginPara' style={{fontSize:"12px",margin:"3px 0px"}}>
        By signing up,you agree to our Terms,<br/>privacy policy and cookies policy
      </p>
      <input type="submit" id="submit-btn" value="Sign Up" onClick={(e) => postData(e)} />

      </div>
      <div className="form2">
        Already have an account?
        <Link to="/login">
        <span style={{color:"blue",cursor:'pointer'}}>Log in</span></Link>
      </div>
     </div>
      
    </div>
  )
}
