import React from "react";
import {useEffect,useState} from "react";
import { useLocation, Link } from "react-router-dom";

const EmployeeDetails = (_) => {
    const [department, setDepartmentData] = useState("");
    const [position, setPositionData] = useState("");
  const { state } = useLocation();
//   console.log(state.user.username)
  const logOut=()=>{
        window.localStorage.clear()
        window.location.href="/sign-in"
    }
    function getUserInfo() {
        fetch("http://localhost:5000/get-info",{
        method:"POST",
        crossDomain:true,
        headers:{
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
            userID : state.user._id
        })
        }).then((res) => res.json())
        .then((data) =>{
            // console.log(data,"get info");
            setDepartmentData(data.data.department)
            setPositionData(data.data.position)
        })
    }

    useEffect(()=>{
        getUserInfo()
    },[])
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

        <li class="nav-item active">
        <a class="nav" >
                <i class="fas fa-fw fa-tachometer-alt"></i>
                <span className="px py bg-gradient-focus text-white"><Link className="nav-link " to={'/user-details'}>Company Employees </Link></span></a>
        </li>
        <hr class="sidebar-divider my-0"></hr>

        <li class="nav-item">
        <a class="nav" >
                <i class="fas fa-fw fa-tachometer-alt"></i>
                <span><Link className="nav-link " to={'/detection-details'}>Timekeeping Details</Link></span></a>
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
                <span><Link className="nav-link " to={'/company-details'}> Company Details</Link></span></a>
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
                            {state.user.image == "" || state.user.image == null || state.user.image == "no image" ? "" : <img width={420} height={250} src={state.user.image}/>}
                            <h1 class="h5 mb-0 text-gray-800"><u></u></h1>
                            <br/>
                               
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
                                    { department == undefined ||department.departmentName == ""  ? "" : <td>{department.departmentName}</td>}
                                            { position == undefined ||position.positionName == "" ? "" : <td>{position.positionName}</td>}
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

export default EmployeeDetails;
