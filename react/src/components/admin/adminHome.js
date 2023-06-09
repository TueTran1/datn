import React, { Component, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
export default function AdminHome({ userData }) {
    const logOut=()=>{
        window.localStorage.clear()
        window.location.href="/sign-in"
    }
  return (
    <div id="wrapper">

    <ul  class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

        <a class="sidebar-brand d-flex align-items-center justify-content-center" href="/home">
            <div class="sidebar-brand-icon rotate-n-15">
                <i class="fas fa-laugh-wink"></i>
            </div>
            <div class="sidebar-brand-text mx-3">Admin Page<sup></sup></div>
        </a>

        <hr class="sidebar-divider my-0"></hr>

        <li class="nav-item active">
            <a class="nav" >
                <i class="fas fa-fw fa-tachometer-alt"></i>
                <span className="px py bg-gradient-focus text-white"><Link className="nav-link " to={'/home'}>Home Page</Link></span></a>
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
                <span><Link className="nav-link " to={'/work-schedule'}> Work Schedule</Link></span></a>
        </li>
        <hr class="sidebar-divider my-0"></hr>

        <li class="nav-item">
        <a class="nav" >
                <i class="fas fa-fw fa-tachometer-alt"></i>
                <span><Link className="nav-link " to={'/company-details'}> Company Management</Link></span></a>
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
            <button onClick={logOut} class="btn btn-primary btn-user ">Log out</button></a>
        </li>

        <hr class="sidebar-divider"></hr>            

    </ul>

    <div id="content-wrapper" class="d-flex flex-column">

        <div id="content">
        <nav class="  navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow ">
            <p class=" h3 mb-0 text-gray-800 text-center" >Home Page</p>
        
            </nav>

            <div class="container-fluid">
                

                <div class="row">

                    <div class="col-xl-4 col-lg-7">

                        <div class="card shadow mb-4">
                            <div class="card-header py-3">
                                <h6 class="m-0 font-weight-bold text-primary">Profile image</h6>
                            </div>
                            <div class="card-body">
                            {userData.image == "" || userData.image == null || userData.image == "no image" ? "" : <img width={420} height={250} src={userData.image}/>}
                            <h1 class="h5 mb-0 text-gray-800"><u></u></h1>
                            <br/>
                               
                            </div>

                        </div>



                    </div>

                    <div class="col-xl-8 col-lg-7">
                        
                        <div class="card shadow mb-4">
                            <div class="card-header py-3">
                                <h6 class="m-0 font-weight-bold text-primary">Personal Info</h6>
                            </div>
                            <div class="card-body">
                            <table  width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th>Username</th>
                                        <th>Fullname</th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <td>{userData.username}</td>
                                        <td>{userData.fullname}</td>
                                    </tr>
                                    <tr>
                                        <th>Address</th>
                                        <th>Phone number</th>
                                    </tr>
                                    <tr>
                                        <td>{userData.address}</td>
                                        <td>{userData.phonenumber}</td>
                                    </tr>
                                    <tr>
                                        <th>Email</th>
                                        <th>Gender</th>
                                    </tr>
                                    <tr>
                                        <td>{userData.email}</td>
                                        <td>{userData.gender}</td>
                                    </tr>
                                    <tr>
                                        <th>Role</th>
                                    </tr>
                                    <tr>
                                        <td>{userData.role}</td>
                                    </tr>
                                </tfoot>
                                
                                
                                
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