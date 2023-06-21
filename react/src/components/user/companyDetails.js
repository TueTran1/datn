import React, { Component } from 'react'
import { BrowserRouter as createSearchParams, useNavigate, Route, Link } from 'react-router-dom'

export default class CompanyDetails extends Component {
  constructor(props){
    super(props)
    this.state={
        position:[],
        department:[],
    }
  }
   logOut=()=>{
    window.localStorage.clear()
    window.location.href="/sign-in"
    }
    componentDidMount(){
        fetch("http://localhost:5000/getPositionAndDeparment",{
        method:"GET",
        }).then((res) => res.json())
        .then((data) =>{
        // console.log(data.data,"alldata")
        this.setState({position: data.data.position});
        this.setState({department: data.data.department});
        if(data.data=='token expired'){
          //token expired
          window.localStorage.clear()
          window.location.href='/sign-in'
        }
        })
    }
    render() {
        return (
          
          <div id="wrapper">

          <ul  class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
      
          <a class="sidebar-brand d-flex align-items-center justify-content-center" href="/home">
            <div class="sidebar-brand-icon rotate-n-15">
                <i class="fas fa-laugh-wink"></i>
            </div>
            <div class="sidebar-brand-text mx-3">Employee Page<sup></sup></div>
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
                <span><Link className="nav-link " to={'/user-details'}>Company Employees </Link></span></a>
        </li>
        <hr class="sidebar-divider my-0"></hr>

        <li class="nav-item">
        <a class="nav" >
                <i class="fas fa-fw fa-tachometer-alt"></i>
                <span><Link className="nav-link " to={'/detection-details'}>Timekeeping Details</Link></span></a>
        </li>
        
        <hr class="sidebar-divider my-0"></hr>

        <li class="nav-item ">
        <a class="nav" >
                <i class="fas fa-fw fa-tachometer-alt"></i>
                <span ><Link className="nav-link " to={'/work-schedule'}> Work Schedule</Link></span></a>
        </li>
        <hr class="sidebar-divider my-0"></hr>

        <li class="nav-item active">
        <a class="nav" >
                <i class="fas fa-fw fa-tachometer-alt"></i>
                <span className="px py bg-gradient-focus text-white"><Link className="nav-link " to={'/company-details'}> Company Details</Link></span></a>
        </li>
        <hr class="sidebar-divider my-0"></hr>

        <li class="nav-item">
        <a class="nav" >
                <i class="fas fa-fw fa-tachometer-alt"></i>
                <span><Link className="nav-link " to={'/change-password'}> Change Password</Link></span></a>
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
                  <p class=" h3 mb-0 text-gray-800 text-center" >Company Details</p>
                
                  </nav>
      
                  <div class="container-fluid">
                  <div class="d-sm-flex align-items-center justify-content-between mb-4">
                        <a class="h5 mb-0 text-gray-800" href='/home'><u>Back</u></a>
                    </div>
                    <div class="row">

                        <div class="col-xl-6 col-lg-7">

                            <div class="card shadow mb-4">
                                <div class="card-header py-3 d-sm-flex align-items-center justify-content-between mb-4">
                                    <h6 class="m-0 font-weight-bold text-primary">Company Position</h6>
        
                                </div>
                                <div class="card-body">
                                    
                                    <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                        
                                        <thead>
                                            <tr>
                                                <th>Name </th>  
                                                <th>Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                                {this.state.position.map(position => 
                                                ( 
                                                <tr>
                                                    <td>{position.positionName }</td>
                                                    <td>{position.description}</td>
                                                    
                                                    </tr>
                                                ))}
                                        </tbody>

                                    </table>
                                </div>

                            </div>



                        </div>

                        <div class="col-xl-6 col-lg-7">
                            
                            <div class="card shadow mb-4">
                                <div class="card-header py-3 d-sm-flex align-items-center justify-content-between mb-4">
                                    <h6 class="m-0 font-weight-bold text-primary">Company Departments</h6>
                                </div>
                                <div class="card-body">
                                    <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                    
                                        <thead>
                                            <tr>
                                                <th>Name </th>  
                                                <th>Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                                {this.state.department.map(department => 
                                                ( 
                                                <tr>
                                                    <td>{department.departmentName }</td>
                                                    <td>{department.description}</td>
                                                    
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
      
          </div>
      
        )
      }
    }
    