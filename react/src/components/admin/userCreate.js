import React, { Component } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
export default class UserCreate extends Component {
     logOut=()=>{
        window.localStorage.clear()
        window.location.href="./sign-in"
    }
  constructor(props){
    super(props)
    this.state={
        username:"",
        password:"",
        fullname:"",
        address:"",
        phonenumber:"",
        email:"",
        gender:"",
        role:"",
        departmentID:"",
        positionID:"",
        position:[],
        department:[],
    };
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(e){
    e.preventDefault();
    const{username,password,fullname,address,phonenumber,email,departmentID,positionID,gender,role }=this.state
    console.log(username,password,fullname,address,phonenumber,email,departmentID,positionID,gender,role)
    fetch("http://localhost:5000/register",{
      method:"POST",
      crossDomain:true,
      headers:{
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        username,password,fullname,address,phonenumber,email,departmentID,positionID,gender,role
      })
    }).then((res) => res.json())
    .then((data) =>{
      console.log(data,"userCreate");
    })
  }
  componentDidMount(){
    fetch("http://localhost:5000/getPositionAndDeparment",{
    method:"GET",
    }).then((res) => res.json())
    .then((data) =>{
    console.log(data.data,"position and department Data")
    this.setState({position: data.data.position});
    this.setState({department: data.data.department});
    if(data.data=='token expired'){
      //token expired
      window.localStorage.clear()
      window.location.href='./sign-in'
    }
    })
    }
  render() {
    return (
<div id="wrapper">

<ul  class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

    <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
        <div class="sidebar-brand-icon rotate-n-15">
            <i class="fas fa-laugh-wink"></i>
        </div>
        <div class="sidebar-brand-text mx-3">Admin Page<sup></sup></div>
    </a>

    <hr class="sidebar-divider my-0"></hr>

    <li class="nav-item">
            <a class="nav" >
                <i class="fas fa-fw fa-tachometer-alt"></i>
                <span><Link className="nav-link " to={'/home'}>Home Page</Link></span></a>
        </li>
    <hr class="sidebar-divider my-0"></hr>

    <li class="nav-item">
        <a class="nav" >
                <i class="fas fa-fw fa-tachometer-alt"></i>
                <span><Link className="nav-link " to={'/user-details'}> Users Management</Link></span></a>
        </li>
        <hr class="sidebar-divider my-0"></hr>

        <li class="nav-item">
        <a class="nav" >
                <i class="fas fa-fw fa-tachometer-alt"></i>
                <span><Link className="nav-link " to={'/detection-details'}>Detections Management</Link></span></a>
        </li>
        
        <hr class="sidebar-divider my-0"></hr>

        <li class="nav-item">
        <a class="nav" >
                <i class="fas fa-fw fa-tachometer-alt"></i>
                <span><Link className="nav-link " to={'/user-details'}> Dayoff Requests</Link></span></a>
        </li>
        <hr class="sidebar-divider my-0"></hr>

        <li class="nav-item">
        <a class="nav" >
                <i class="fas fa-fw fa-tachometer-alt"></i>
                <span><Link className="nav-link " to={'/company-details'}> Company Management</Link></span></a>
        </li>
        <hr class="sidebar-divider my-0"></hr>


    <li class="nav-item">
        <a class="nav-link" >
            <i class="fas fa-fw fa-tachometer-alt"></i>
           <button onClick={this.logOut} class="btn btn-primary btn-user ">Log out</button></a>
    </li>

    <hr class="sidebar-divider"></hr>            

</ul>

<div id="content-wrapper" class="d-flex flex-column">

    <div id="content">
    <nav class="  navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow ">
        <p class=" h3 mb-0 text-gray-800 text-center" >Create New User Page</p>
       
        </nav>

        <div class="container-fluid">
            <div class="d-sm-flex align-items-center justify-content-between mb-4">
                        <a class="h5 mb-0 text-gray-800" href="/user-details"><u>Back</u></a>
                        </div>

            <div class="row">

                <div class="col-xl-4 col-lg-7">

                    <div class="card shadow mb-4">
                        <div class="card-header py-3">
                            <h6 class="m-0 font-weight-bold text-primary">Create new user</h6>
                        </div>
                        <form class="user" onSubmit={this.handleSubmit}>
                                        <div class="form-group">
                                        <input   type="text" class=" " placeholder="Username"
                                          onChange={(e) => this.setState({username: e.target.value})}/>
                                        </div>
                                        <div class="form-group">
                                        <input   type="password" class=" " placeholder="Password"
                                          onChange={(e) => this.setState({password: e.target.value})}/>
                                        </div>
                                        <div class="form-group">
                                        <input   type="text" class=" " placeholder="fullname"
                                          onChange={(e) => this.setState({fullname: e.target.value})}/>
                                        </div>
                                        <div class="form-group">
                                        <input   type="text" class=" " placeholder="address"
                                          onChange={(e) => this.setState({address: e.target.value})}/>
                                        </div>
                                        <div class="form-group">
                                        <input   type="text" class=" " placeholder="phonenumber"
                                          onChange={(e) => this.setState({phonenumber: e.target.value})}/>
                                        </div>
                                        <div class="form-group">
                                        <input   type="text" class=" " placeholder="email"
                                          onChange={(e) => this.setState({email: e.target.value})}/>
                                        </div>

                                        <select className="form-control"  onChange={(e) => this.setState({gender: e.target.value})}>
                                            <option value="">Choose Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>

                                        <select className="form-control"  onChange={(e) => this.setState({departmentID: e.target.value})}>
                                          <option value="">Choose Department</option>
                                            {this.state.department.map(department => (
                                             <option value={department._id}  >{department.departmentName}</option>
                                              ))
                                            }
                                        </select>

                                        <select className="form-control"  onChange={(e) => this.setState({positionID: e.target.value})}>
                                            <option value="">Choose Position</option>
                                            {this.state.position.map(position => (
                                             <option value={position._id} >{position.positionName}</option>
                                              ))
                                            }
                                        </select>

                                        <select className="form-control"  onChange={(e) => this.setState({role: e.target.value})}>
                                            <option value="">Choose Role</option>
                                            <option value="user">User</option>
                                            <option value="admin">Admin</option>
                                        </select>

                                          <button type="submit" class="btn btn-primary btn-user ">Save</button>
                                    </form>
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
