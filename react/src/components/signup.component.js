import React, { Component } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
export default class SignUp extends Component {
  constructor(props){
    super(props)
    this.state={
      username:"",
      password:"",
      fullname:"",
      address:"",
      phonenumber:"",
      email:"",
    };
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(e){
    e.preventDefault();
    const{username,password,fullname,address,phonenumber,email}=this.state
    console.log(username,password,fullname,address,phonenumber,email)
    fetch("http://localhost:5000/register",{
      method:"POST",
      crossDomain:true,
      headers:{
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        username,password,fullname,address,phonenumber,email
      })
    }).then((res) => res.json())
    .then((data) =>{
      console.log(data,"userRegister");
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
                                        <h1 class="h4 text-gray-900 mb-4">Sign up</h1>
                                    </div>
                                    <form class="user" onSubmit={this.handleSubmit}>
                                        <div class="form-group">
                                        <input   type="text" class=" form-control-user" placeholder="Username"
                                          onChange={(e) => this.setState({username: e.target.value})}/>
                                        </div>
                                        <div class="form-group">
                                        <input   type="text" class=" form-control-user" placeholder="Password"
                                          onChange={(e) => this.setState({password: e.target.value})}/>
                                        </div>
                                        <div class="form-group">
                                        <input   type="text" class=" form-control-user" placeholder="Full Name"
                                          onChange={(e) => this.setState({fullname: e.target.value})}/>
                                        </div>
                                        <div class="form-group">
                                        <input   type="text" class=" form-control-user" placeholder="Address"
                                          onChange={(e) => this.setState({address: e.target.value})}/>
                                        </div>
                                        <div class="form-group">
                                        <input   type="text" class=" form-control-user" placeholder="Phone Number"
                                          onChange={(e) => this.setState({phonenumber: e.target.value})}/>
                                        </div>
                                        <div class="form-group">
                                        <input   type="text" class=" form-control-user" placeholder="Email"
                                          onChange={(e) => this.setState({email: e.target.value})}/>
                                        </div>
                                          <button type="submit" class="btn btn-primary btn-user ">Sign Up</button>
                                    </form>
                                    <div class="text-center">
                                        <Link className="nav-link small" to={'/sign-in'}>
                                          Sign in
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
