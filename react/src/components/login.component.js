import React from "react";
import {useEffect,useState} from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
const Login = ()=> {
  const [username, setUsernameData] = useState("");
  const [password, setPasswordData] = useState("");
  let[alert,setAlertData]=useState("")

  function handleSubmit(){
    if(username==""|| password==""){
      return setAlertData("Inputs are not filled")
    }
    fetch("http://localhost:5000/login",{
      method:"POST",
      crossDomain:true,
      headers:{
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        username,password
      })
    }).then((res) => res.json())
    .then((data) =>{
      setAlertData(data.status)
      if(data.status=='Login Successfully'){
        window.localStorage.setItem('token',data.data)
        window.localStorage.setItem('loggedIn',true)
        window.location.href = './home'
      }
    })
  }
    return (
      <div class="container">

        <div class="row justify-content-center">

            <div class="col-xl-10 col-lg-12 col-md-9">

                <div class="card o-hidden border-0 shadow-lg my-5">
                    <div class="card-body p-0">
                        <div class="row">
                            <div >
                                <div class="p-5" >
                                    <div class="text-center">
                                        <h1 class="h4 text-gray-900 mb-4">Sign in</h1>
                                    </div>
                                <div class="text-center">
                                    <b>Username: </b>
                                    <input type="text" class="border border-dark" placeholder="Username"
                                        onChange={(e) => setUsernameData(e.target.value)}/>
                                </div>
                                <br></br>
                                <div class="text-center">
                                    <b>Password: </b>
                                    <input   type="password" class="border border-dark" placeholder="Password"
                                      onChange={(e) => setPasswordData(e.target.value)}/>
                                </div>
                                <br></br>

                                <div class="text-center">
                                {alert==""?<tr></tr>:<div><b class="text-danger">{alert}</b></div>}
                            <button class="btn btn-primary  " onClick={(handleSubmit)}  >Log in</button>
                                </div>
                                    <div class="text-center">
                                      
                                        <a class="small" href="forgot-password.html">Forgot Password?</a>
                                    </div>
                                    <div class="text-center">
                                      
                                        <Link className="nav-link small" to={'/sign-up'}>
                                          Sign up
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>

    </div>
    )
  }
  export default Login
