import React from "react";
import {useEffect,useState} from "react";
import { useLocation, Link ,useNavigate} from "react-router-dom";
import PopupRemoveDepartment from "./popupRemoveDepartment"
import PopupRemovePosition from "./popupRemovePosition"
const ViewUserDetails = (_) => {
    const [department, setDepartmentData] = useState("");
    const [position, setPositionData] = useState("");
    const [buttonPopupRemoveDepartment, setButtonPopupRemoveDepartment] = useState(false)
    const [buttonPopupRemovePosition, setButtonPopupRemovePosition] = useState(false)
    const [departmentID, setDepartmentID] = useState()
    const [positionID, setPositionID] = useState()

    const logOut=()=>{
            window.localStorage.clear()
            window.location.href="/sign-in"
        }

    useEffect(()=>{
        getData(setDepartmentData,setPositionData)
    },[setDepartmentData,setPositionData])


    function getData(setDepartmentData,setPositionData) {
        fetch("http://localhost:5000/getPositionAndDeparment",{
        method:"GET"
        }).then((res) => res.json())
        .then((data) =>{
            // console.log(data,"get info");
            setDepartmentData(data.data.department)
            setPositionData(data.data.position)
        })
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

    <li class="nav-item">
            <a class="nav" >
                <i class="fas fa-fw fa-tachometer-alt"></i>
                <span><Link className="nav-link " to={'/home'}>Home Page</Link></span></a>
        </li>
    <hr class="sidebar-divider my-0"></hr>
    
    <li class="nav-item ">
        <a class="nav" >
                <i class="fas fa-fw fa-tachometer-alt"></i>
                <span ><Link className="nav-link " to={'/user-details'}> Users Management</Link></span></a>
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

        <li class="nav-item active">
        <a class="nav" >
                <i class="fas fa-fw fa-tachometer-alt"></i>
                <span className="px py bg-gradient-focus text-white"><Link className="nav-link " to={'/company-details'}> Company Management</Link></span></a>
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
                  <p class=" h3 mb-0 text-gray-800 text-center" >Company Management</p>
                
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
                                    <a href="/company-details/create-position" class="btn btn-primary btn-icon-split btn-sm">
                                        <span class="icon text-white-50">+
                                            <i class="fas fa-flag"></i>
                                            </span>
                                        <span class="text">Create new postion</span>
                                    </a>
        
                                </div>
                                <div class="card-body">
                                    
                                    <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                        
                                        <thead>
                                            <tr>
                                                <th>Name </th>  
                                                <th>Description</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                                {position==""||position==null||position==undefined?<tr></tr>
                                                :position.map(position => 
                                                ( 
                                                  <tr>
                                                      <td>{position.positionName }</td>
                                                      <td>{position.description}</td>
                                                      <td><button  class="btn btn-danger btn-user" onClick={()=>setPositionID(position._id)}>
                                                        <span class="icon text-white-50">
                                                            </span>
                                                        <span class="text">Remove</span>
                                                    </button>
                                                    <PopupRemovePosition getData={getData} setDepartmentData={setDepartmentData} setPositionData={setPositionData} positionID={position._id} positionName={position.positionName} trigger={positionID==position._id}  setTrigger={setPositionID}></PopupRemovePosition></td>
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
                                    <a href="/company-details/create-department" class="btn btn-primary btn-icon-split btn-sm">
                                                <span class="icon text-white-50">+
                                                    <i class="fas fa-flag"></i>
                                                </span>
                                                <span class="text">Create new department</span>
                                            </a>
                                </div>
                                <div class="card-body">
                                    <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                    
                                        <thead>
                                            <tr>
                                                <th>Name </th>  
                                                <th>Description</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                                {department==""||department==null||department==undefined?<tr></tr>:
                                                department.map(department => 
                                                ( 
                                                  <tr>
                                                    <td>{department.departmentName }</td>
                                                    <td>{department.description}</td>
                                                    <td><button  class="btn btn-danger btn-user" onClick={()=>setDepartmentID(department._id)}>
                                                        <span class="icon text-white-50">
                                                            </span>
                                                        <span class="text">Remove</span>
                                                    </button>
                                                    <PopupRemoveDepartment departmentID={department._id} departmentName={department.departmentName} trigger={departmentID==department._id}  setTrigger={setDepartmentID}></PopupRemoveDepartment></td>
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
  );
};

export default ViewUserDetails;
