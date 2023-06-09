import React, { Component } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

export default class DetectionDetail extends Component {
  
  constructor(props){
    super(props)
    this.state={
      detectionData:[],
    }
  }
   logOut=()=>{
    window.localStorage.clear()
    window.location.href="./sign-in"
}
    componentDidMount(){
        fetch("http://localhost:5000/getAllDetections",{
        method:"GET",
        }).then((res) => res.json())
        .then((data) =>{
        console.log(data.data,"detectionData")
        this.setState({detectionData: data.data})
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
                  <div class="sidebar-brand-text mx-3">admin Page<sup></sup></div>
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
                  <p class=" h3 mb-0 text-gray-800 text-center" >Detections Management</p>
                
                  </nav>
      
                  <div class="container-fluid">
                      
                    <div class="d-sm-flex align-items-center justify-content-between mb-4">
                            <a class="h5 mb-0 text-gray-800" href="/home"><u>Back</u></a>
                        </div>
                  

                    <div class="card shadow mb-4">
                        <div class="card-header py-3">
                            <h6 class="m-0 font-weight-bold text-primary">{this.state.detectionData.username}</h6>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                   
                                    <thead>
                                        <tr>
                                            <th>Username</th>
                                            <th>Year</th>
                                            <th>Month</th>
                                            <th>Date</th>
                                            <th>Time</th>
                                            <th>Type</th>
                                            <th>Capture</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                          {this.state.detectionData.map(detections => 
                                          ( 
                                            <tr>
                                            <td>{detections.username}</td>
                                            <td>{detections.time.slice(0,4)}</td>
                                            <td>{detections.time.slice(5,7)}</td>
                                            <td>{detections.time.slice(8,10)}</td>
                                            <td>{detections.time.slice(11,19)}</td>
                                            <td>{detections.type}</td>
                                            <td></td>
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
    