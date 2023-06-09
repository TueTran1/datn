import React, { Component } from 'react'
import { BrowserRouter as createSearchParams, useNavigate, Route, Link } from 'react-router-dom'


export default class DetectionDetail extends Component {
  constructor(props){
    super(props)
    this.state={
      usersData:[],
    }
  }
   logOut=()=>{
    window.localStorage.clear()
    window.location.href="./sign-in"
    }
    componentDidMount(){
        fetch("http://localhost:5000/getAllUsers",{
        method:"GET",
        }).then((res) => res.json())
        .then((data) =>{
        console.log(data.data,"usersData")
        this.setState({usersData: data.data})
        console.log("state")
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
                  <p class=" h3 mb-0 text-gray-800 text-center" >Users Management</p>
                
                  </nav>
      
                  <div class="container-fluid">
                        <div class="d-sm-flex align-items-center justify-content-between mb-4">
                            <a class="h5 mb-0 text-gray-800" href="/home"><u>Back</u></a>
                            <a href="/user-details/create" class="btn btn-primary btn-icon-split btn-sm">
                                <span class="icon text-white-50">+
                                    <i class="fas fa-flag"></i>
                                    </span>
                                <span class="text">Create new user</span>
                            </a>
                        </div>
                  

                    <div class="card shadow mb-4">

                        <div class="card-header py-3">
                            <h6 class="m-0 font-weight-bold text-primary"></h6>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                   
                                    <thead>
                                        <tr>
                                            <th>Username </th>
                                            <th>Fullname</th>
                                            <th>Email</th>
                                            <th>Role</th>
                                            <th>Position</th>
                                            <th>Department</th>
                                            <th>Salary</th>
                                            <th>Employee Management</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                          {
                                          this.state.usersData.map(user => 
                                          ( 
                                            
                                            <tr>
                                            <td>{user.username }</td>
                                            <td>{user.fullname}</td>
                                            <td>{user.email}</td>
                                            <td>{user.role}</td>
                                            <td>{user.positionID}</td>
                                            <td>{user.departmentID}</td>
                                            <td>{user.salaryID}</td>
                                            <td><Link className="nav-link " to={ `/user-details/${user._id}`}
                                            state={{user: user}}
                                                    >View</Link></td>
                                            
                                          </tr>
                                          ))}
                                    </tbody>

                                </table>
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
    