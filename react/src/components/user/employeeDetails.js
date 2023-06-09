import React from "react";
import {useState} from "react";
import { useLocation, Link } from "react-router-dom";

const ViewUserDetails = (_) => {
    const [buttonPopup, setButtonPopup] = useState(false)
  const { state } = useLocation();
  console.log(state.user.username)
  const logOut=()=>{
        window.localStorage.clear()
        window.location.href="./sign-in"
    }
  return (
    <div id="wrapper">

<ul  class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

    <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
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
                <span><Link className="nav-link " to={'/company-details'}> Company Managent</Link></span></a>
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
            <p class=" h3 mb-0 text-gray-800 text-center" >User Details: {state.user.fullname}</p>
          
            </nav>

            <div class="container-fluid">
                
                <div class="d-sm-flex align-items-center justify-content-between mb-4">
                                <a class="h5 mb-0 text-gray-800" href="/user-details"><u>Back</u></a>
                            </div>
                <div class="row">

                    <div class="col-xl-5 col-lg-7">

                        <div class="card shadow mb-4">
                            <div class="card-header py-3">
                                <h6 class="m-0 font-weight-bold text-primary">Profile image</h6>
                            </div>
                            <div class="card-body">
                                <div></div>
                            </div>
                        </div>
                    </div>
                    

                    <div class="col-xl-7 col-lg-5">
                        <div class="card shadow mb-4">
                            <div class="card-header py-3">
                                <h6 class="m-0 font-weight-bold text-primary">Employee Info</h6>
                            </div>
                            <div class="card-body">
                            <table  width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th>Position</th>
                                        <th>Department</th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <td>Position</td>
                                        <td>Department</td>
                                    </tr>
                                </tfoot>
                                
                                
                            </table>
                        </div>
                        
                        </div>
                        
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
                                        <td>{state.user.username}</td>
                                        <td>{state.user.fullname}</td>
                                    </tr>
                                    <tr>
                                        <th>Address</th>
                                        <th>Phone number</th>
                                    </tr>
                                    <tr>
                                        <td>{state.user.address}</td>
                                        <td>{state.user.phonenumber}</td>
                                    </tr>
                                    <tr>
                                        <th>Email</th>
                                        <th>Gender</th>
                                    </tr>
                                    <tr>
                                        <td>{state.user.email}</td>
                                        <td>{state.user.gender}</td>
                                    </tr>
                                    <tr>
                                        <th>Role</th>
                                    </tr>
                                    <tr>
                                        <td>{state.user.role}</td>
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
  );
};

export default ViewUserDetails;
