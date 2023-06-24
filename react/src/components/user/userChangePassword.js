import React from "react";
import {useEffect,useState} from "react";
import { Link } from "react-router-dom";
const UserChangePassword = ({userData}) => {
    const userID = userData._id
    console.log(userID)
    const [password, setPasswordData] = useState("");
    const [newpassword, setNewpasswordData] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("")
    let[alert,setAlertData]=useState("")

    const logOut=()=>{
            window.localStorage.clear()
            window.location.href="/sign-in"
        }

    useEffect(()=>{
    },[])


    const handleSubmit=()=>{
        if(newpassword==""||password==""||confirmpassword==""){
            return setAlertData("Input are not filled")
        }
        else if (newpassword != confirmpassword){
            return setAlertData("New Password is not confirmed")
        }
        else if (password== newpassword){
            return setAlertData("New password must be diffrent from current one")
        }
        fetch("http://localhost:5000/change-password",{
          method:"PUT",    
          crossDomain:true,
          headers:{
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            userID,password,newpassword
          })
        }).then((res) => res.json())
        .then((data) =>{
          setAlertData(data.status)
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

        <li class="nav-item">
        <a class="nav" >
                <i class="fas fa-fw fa-tachometer-alt"></i>
                <span><Link className="nav-link " to={'/company-details'}> Company Management</Link></span></a>
        </li>
        <hr class="sidebar-divider my-0"></hr>

        <li class="nav-item active">
        <a class="nav" >
                <i class="fas fa-fw fa-tachometer-alt"></i>
                <span className="px py bg-gradient-focus text-white"><Link className="nav-link " to={'/change-password'}> Change Password</Link></span></a>
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
        <p class=" h3 mb-0 text-gray-800 text-center" >Change Password Page</p>
       
        </nav>

        <div class="container-fluid">
            <div class="d-sm-flex align-items-center justify-content-between mb-4">
                        <a class="h5 mb-0 text-gray-800" href="/user-details"><u>Back</u></a>
                        </div>

            <div class="row">
                <div class="col-xl-4 col-lg-7">

                    <div class="card shadow mb-4">
                        <div class="card-header py-3">
                            <h6 class="m-0 font-weight-bold text-primary">Change Password</h6>
                        </div>
                        <div class="card-body">
                            <br></br>
                                <table  width="100%" cellspacing="0">
                                    <thead>
                                        <tr>
                                            <th>Current Password:</th>
                                            <td><input type="password" class="border border-dark" placeholder="Current Password"
                                                onChange={(e) => setPasswordData(e.target.value)}/></td>
                                        </tr>
                                        <br></br>
                                    </thead>
                                    <tfoot>
                                        <tr>
                                            <th>New Password:</th>
                                            <td><input   type="password" class="border border-dark" placeholder="New Password"
                                                onChange={(e) => setNewpasswordData(e.target.value)}/></td>
                                        </tr>
                                        <br></br>
                                        <tr>
                                            <th>Confirm New Password:</th>
                                            <td><input   type="password" class="border border-dark" placeholder="Confirm New Password"
                                                onChange={(e) => setConfirmpassword(e.target.value)}/></td>
                                        </tr>  
                                        <br></br>                                  
                                    </tfoot>
                                    
                                </table>
                            {alert==""?<tr></tr>:<div><b class="text-danger">{alert}</b></div>}
                            <button class="btn btn-primary  " onClick={(handleSubmit)}  >Save</button>
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

export default UserChangePassword;
