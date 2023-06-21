import React from "react";
import {useEffect,useState} from "react";
import { useLocation, Link ,useNavigate} from "react-router-dom";
import Popup from "./popupDelete"
import PopupImage from "./popupImage"
import PopupPosition from "./popupPosition"
import PopupPersonal from "./popupPersonal"
import PopupSalaryChange from "./popupSalaryChange"
import PopupSalaryHistory from "./popupSalaryHistory"
import PopupChangePassword from "./popupChangePassword"
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const EmployeeManagement = (userData) => {
    const [data, setUserData] = useState("");
    const [department, setDepartmentData] = useState("");
    const [position, setPositionData] = useState("");
    const [salary, setSalaryData] = useState("");
    const [buttonPopup, setButtonPopup] = useState(false)
    const navigate = useNavigate();
    const [buttonPopupImage, setButtonPopupImage] = useState(false)
    const [buttonPopupPosition, setButtonPopupPosition] = useState(false)
    const [buttonChangePW, setButtonPopupChangePW] = useState(false)
    const [buttonPopupPersonal, setButtonPopupPersonal] = useState(false)
    const [buttonPopupSalaryChange, setButtonPopupSalaryChange] = useState(false)
    const [buttonPopupSalaryHistory, setButtonPopupSalaryHistory] = useState(false)

    const { state } = useLocation();
    // console.log(state,"state")
    const userID = state.user._id
    
    const logOut=()=>{
            window.localStorage.clear()
            window.location.href="/sign-in"
        }

    useEffect(()=>{
        getUserInfo(setUserData,setDepartmentData,setPositionData)
        getSalaryInfo(setSalaryData)
    },[setUserData,setDepartmentData,setPositionData,setSalaryData])

    
    function getSalaryInfo(setSalaryData) {
        fetch("http://localhost:5000/get-salary-by-user",{
        method:"POST",
        crossDomain:true,
        headers:{
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
            userID : userID
        })
        }).then((res) => res.json())
        .then((data) =>{
            setSalaryData(data.data);
        })
    }

    function getNearrestSalary(salary) {
        const date = new Date(); 
        const beforeToday= salary.filter((salary) => salary.updated.slice(0,10)<=date.toISOString().slice(0,10))
        const uniqueDate = beforeToday.filter(function(elem, pos) {
            return beforeToday.indexOf(elem) == pos;
        });
        const updatedList=uniqueDate.map((salary) => salary.updated)
        const maxDate = updatedList.reduce(function (a, b) { return a > b ? a : b; })
        const displayDate = uniqueDate.filter((salary) => salary.updated==maxDate)
        return displayDate.map((salary) =>
        <tr>
            <td>{salary.salary}</td>
            <td>{salary.updated.slice(0,10)}</td>
        </tr>)
    }

    function getMaxDate(dates){
        var max = dates.reduce(function (a, b) { return a > b ? a : b; })
        console.log(max,"max")
    }

    function getUserInfo(setUserData,setDepartmentData,setPositionData) {
        fetch("http://localhost:5000/get-info",{
        method:"POST",
        crossDomain:true,
        headers:{
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
            userID : userID
        })
        }).then((res) => res.json())
        .then((data) =>{
            console.log(data,"get info");
            setUserData(data.data);
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
    
    <li class="nav-item active">
        <a class="nav" >
                <i class="fas fa-fw fa-tachometer-alt"></i>
                <span className="px py bg-gradient-focus text-white"><Link className="nav-link " to={'/user-details'}> Users Management</Link></span></a>
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
            <p class=" h3 mb-0 text-gray-800 text-center" >User Details: {data.fullname}</p>
          
            </nav>

            <div class="container-fluid">
                
                <div class="d-sm-flex align-items-center justify-content-between mb-4">
                    <button class="h5 mb-0 text-gray-800" onClick={() => navigate(-1)}><u>Back</u></button>
                    {state.user.role =="admin"?<div></div>:
                    <Link className="btn btn-primary btn-user "  to={ `/user-details/${userID}/salary`}
                                            state={{user: data}}> View Timekeeping Details </Link>}
                            </div>
                <div class="row">

                    <div class="col-xl-5 col-lg-7">

                        <div class="card shadow mb-4">
                            <div class="card-header py-3">
                                <h6 class="m-0 font-weight-bold text-primary">Profile image</h6>
                            </div>
                            <div class="card-body">
                            {data.image == "" || data.image == null || data.image == "no image" ? "" : <img width={420} height={250} src={data.image}/>}
                            <h1 class="h5 mb-0 text-gray-800"><u></u></h1>
                            <br/>
                            <button  class="btn btn-primary btn-user" onClick={()=>setButtonPopupImage(true)}>
                                <span class="icon text-white-50">
                                    </span>
                                <span class="text">Upload Image</span>
                            </button>
                            <PopupImage trigger={buttonPopupImage} setTrigger={setButtonPopupImage}></PopupImage>
                               
                            </div>
                        </div>
                        {state.user.role =="admin"?<div></div>:
                        <div class="card shadow mb-4">
                            <div class="card-header py-3">
                                <h6 class="m-0 font-weight-bold text-primary">Salary Info</h6>
                            </div>
                            <div class="card-body">
                                <div class="row no-gutters align-items-center">
                                    <div class="col mr-2">                                        
                                        <table  width="100%" cellspacing="0">
                                            <thead>
                                                <tr>
                                                    <th>Salary</th>
                                                    <th>Updated At</th>
                                                    
                                                </tr>
                                            </thead>
                                            <tbody>
                                                    {salary=="" || salary == undefined || salary==null ||salary[0].salary == ""  ? "" : getNearrestSalary(salary)}

                                            </tbody>
                                        </table>
                                    </div>                                    
                            </div>
                            <button  class="btn btn-primary btn-user" onClick={()=>setButtonPopupSalaryChange(true)}>
                                <span class="icon text-white-50">
                                    </span>
                                <span class="text">Change Info</span>
                            </button>
                            <PopupSalaryChange trigger={buttonPopupSalaryChange}  setTrigger={setButtonPopupSalaryChange}></PopupSalaryChange>
                            <button  class="btn btn-primary btn-user" onClick={()=>setButtonPopupSalaryHistory(true)}>
                                <span class="icon text-white-50">
                                    </span>
                                <span class="text">View Salary History</span>
                            </button>
                            <PopupSalaryHistory trigger={buttonPopupSalaryHistory}  setTrigger={setButtonPopupSalaryHistory}></PopupSalaryHistory>
                        </div>
                        
                        </div>}
                        {state.user.role=="admin"?<div></div>:<div class="card shadow mb-4">
                            <div class="card-body">
                            <button  class="btn btn-primary btn-user" onClick={()=>setButtonPopupChangePW(true)}>
                                <span class="icon text-white-50">
                                    </span>
                                <span class="text">Change Password</span>
                            </button>
                            <PopupChangePassword trigger={buttonChangePW}  setTrigger={setButtonPopupChangePW}></PopupChangePassword>                            </div>
                        </div>}
                    </div>
                    
                    
                    <div class="col-xl-7 col-lg-5">
                        {state.user.role =="admin"?<div></div>:
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
                                            { position == undefined || position.positionName == "" || position.positionName == null ? "" : <td>{position.positionName}</td>}
                                            { department == undefined ||department.departmentName == "" ||department.departmentName == null  ? "" : <td>{department.departmentName}</td>}
                                        </tr>
                                    </tfoot>
                                    
                                    
                                </table>
                                <button  class="btn btn-primary btn-user" onClick={()=>setButtonPopupPosition(true)}>
                                    <span class="icon text-white-50">
                                        </span>
                                    <span class="text">Change Info</span>
                                </button>
                                <PopupPosition trigger={buttonPopupPosition}  setTrigger={setButtonPopupPosition}></PopupPosition>
                            </div>
                        
                        </div>}
                        
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
                                        <td>{data.username}</td>
                                        <td>{data.fullname}</td>
                                    </tr>
                                    <tr>
                                        <th>Birthday</th>
                                        <th>Gender</th>
                                    </tr>
                                    <tr>
                                        {data.dob==null || data.dob == "" ? <td>-</td>:<td>{data.dob.slice(0,10)}</td>}
                                        <td>{data.gender}</td>
                                    </tr>
                                    <tr>
                                        <th>Started working</th>
                                        <th>Stopped working</th>
                                    </tr>
                                    <tr>
                                        {data.start==null || data.start == "" ? <td>-</td>:<td>{data.start.slice(0,10)}</td>}
                                        {data.stop==null || data.stop == "" ? <td>-</td>:<td>{data.stop.slice(0,10)}</td>}
                                    </tr>
                                    <tr>
                                        <th>Email</th>
                                        <th>Phone number</th>
                                    </tr>
                                    <tr>
                                        <td>{data.email}</td>
                                        <td>{data.phonenumber}</td>
                                    </tr>
                                    <tr>
                                        <th>Address</th>
                                        <th>Role</th>
                                    </tr>
                                    <tr>
                                        <td>{data.address}</td>
                                        <td>{data.role}</td>
                                    </tr>
                                </tfoot>
                                
                                
                                
                            </table>
                            <button  class="btn btn-primary btn-user" onClick={()=>setButtonPopupPersonal(true)}>
                                <span class="icon text-white-50">
                                    </span>
                                <span class="text">Change Info</span>
                            </button>
                            <PopupPersonal trigger={buttonPopupPersonal} setTrigger={setButtonPopupPersonal}></PopupPersonal>
                            </div>
                            
                        </div>
                    </div>
                    {state.user.role =="admin"?<div></div>:
                    <div class="d-sm-flex align-items-center justify-content-between mb-4">
                        <h1 class="h5 mb-0 text-gray-800"><u></u></h1>
                        
                        <button  class="btn btn-danger btn-icon-split btn-sm" onClick={()=>setButtonPopup(true)}>
                            <span class="icon text-white-50">
                                <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                                </span>
                            <span class="text">Delete this user</span>
                        </button>
                        <Popup trigger={buttonPopup} setTrigger={setButtonPopup}></Popup>
                        <h1 class="h5 mb-0 text-gray-800"><u></u></h1>
                    </div>}
                    
                </div>

            </div>

        </div>

    </div>

    </div>
  );
};

export default EmployeeManagement;
