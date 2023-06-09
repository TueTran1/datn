import React, { Component } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
export default class PositionCreate extends Component {
     logOut=()=>{
        window.localStorage.clear()
        window.location.href="./sign-in"
    }
  constructor(props){
    super(props)
    this.state={
        positionName:"",
        description:"", 
    };
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(e){
    e.preventDefault();
    const{positionName,description }=this.state
    console.log(positionName,description)
    fetch("http://localhost:5000/positionCreate",{
      method:"POST",
      crossDomain:true,
      headers:{
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        positionName,description
      })
    }).then((res) => res.json())
    .then((data) =>{
      console.log(data,"positionCreate");
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
        <p class=" h3 mb-0 text-gray-800 text-center" >Create New Position Page</p>
       
        </nav>

        <div class="container-fluid">
            <div class="d-sm-flex align-items-center justify-content-between mb-4">
                        <a href='/company-details' class="h5 mb-0 text-gray-800"><u>Back</u></a>
                        </div>

            <div class="row">

                <div class="col-xl-4 col-lg-7">

                    <div class="card shadow mb-4">
                        <div class="card-header py-3">
                            <h6 class="m-0 font-weight-bold text-primary">Create New Position</h6>
                        </div>
                        <form class="user" onSubmit={this.handleSubmit}>
                                        <div class="form-group">
                                        <input   type="text" class=" " placeholder="Position Name"
                                          onChange={(e) => this.setState({positionName: e.target.value})}/>
                                        </div>
                                        <div class="form-group">
                                        <input   type="text" class=" " placeholder="Description"
                                          onChange={(e) => this.setState({description: e.target.value})}/>
                                        </div>
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
