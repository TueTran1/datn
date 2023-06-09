import React, { Component } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
export default class Login extends Component {
  constructor(props){
    super(props)
    this.state={
      username:'',
      password:'', 
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(e){
    e.preventDefault();
    const{username,password}=this.state
    console.log(username,password)
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
      console.log(data,"userLogin");
      if(data.status=='ok'){
        window.localStorage.setItem('token',data.data)
        window.localStorage.setItem('loggedIn',true)
        window.location.href = './home'
      }
    })
  }
  render() {
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
                                    <form class="user" onSubmit={this.handleSubmit}>
                                        <div class="form-group">
                                          <input  type="text" class=" form-control-user" size="50"   
                                            placeholder="Enter Username"
                                            onChange={(e) => this.setState({username: e.target.value})}
                                          />
                                        </div>
                                        <div class="form-group">
                                        <input  type="password"   class=" form-control-user"
                                            placeholder="Enter password"
                                            onChange={(e) => this.setState({password: e.target.value})}
                                          />
                                        </div>
                                        <div class="form-group">
                                        <div className="custom-control custom-checkbox">
                                            <input
                                              type="checkbox"
                                              className="custom-control-input"
                                              id="customCheck1"
                                            />
                                            <label className="custom-control-label" htmlFor="customCheck1">
                                              Remember me
                                            </label>
                                          </div>
                                        </div>
                                          <button type="submit" class="btn btn-primary btn-user ">Login</button>
                                    </form>
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
}
