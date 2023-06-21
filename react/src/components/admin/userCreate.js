import React from "react";
import {useEffect,useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation, Link ,useNavigate} from "react-router-dom";
const UserCreate = ({userData}) => {
    const [username, setUsernameData] = useState("");
    const [password, setPasswordData] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("")
    const [email, setEmailData] = useState("");
    const [phonenumber, setPhonenumber] = useState("")
    const [address, setAddressData] = useState("");
    const [fullname, setFullname] = useState("")
    const [gender, setGenderData] = useState("");
    const [departmentID, setDepartmentID] = useState("")
    const [positionID, setPositionID] = useState("");
    const [role, setRole] = useState("")
    const [dob, setBirthdayData] = useState(new Date());
    const [start, setStart] = useState(new Date())
    const current = new Date();

    const [department, setDepartmentData] = useState("");
    const [position, setPositionData] = useState("");

    let[alert,setAlertData]=useState("")

    function addOneDay(date ) {
      date = new Date(date); 

      date.setDate(date.getDate() + 1);
    
      return date;
    }

    const logOut=()=>{
            window.localStorage.clear()
            window.location.href="/sign-in"
        }
    function getInfo(setPositionData,setDepartmentData) {
      fetch("http://localhost:5000/getPositionAndDeparment",{
      method:"GET",
      }).then((res) => res.json())
      .then((data) =>{
      // console.log(data.data,"position and department Data")
      setPositionData(data.data.position);
      setDepartmentData(data.data.department);
      })
    }
    useEffect(()=>{
      getInfo(setPositionData,setDepartmentData)
    },[setPositionData,setDepartmentData])
    
    const handleSubmit=()=>{
      // dob = addOneDay(dob)
      // start = addOneDay(start)
      if(password==""||username==""||confirmpassword==""){
          return setAlertData("Input are not filled")
      }
      else if (password!=confirmpassword){
          return setAlertData("New Password is not confirmed")
      }
      fetch("http://localhost:5000/register",{
        method:"POST",    
        crossDomain:true,
        headers:{
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          username,password,fullname,address,phonenumber,email,departmentID,positionID,gender,role,dob,start
        })
      }).then((res) => res.json())
      .then((data) =>{
        console.log(data)
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

        <li class="nav-item ">
        <a class="nav" >
                <i class="fas fa-fw fa-tachometer-alt"></i>
                <span ><Link className="nav-link " to={'/change-password'}> Change Password</Link></span></a>
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
        <p class=" h3 mb-0 text-gray-800 text-center" >Create New User Page</p>
       
        </nav>

        <div class="container-fluid">
            <div class="d-sm-flex align-items-center justify-content-between mb-4">
                        <a class="h5 mb-0 text-gray-800" href="/user-details"><u>Back</u></a>
                        </div>

            <div class="row">
                <div class="col-xl-9 col-lg-7">

                    <div class="card shadow mb-4">
                        <div class="card-header py-3">
                            <h6 class="m-0 font-weight-bold text-primary">Create New User</h6>
                        </div>
                        <div class="card-body">
                            <br></br>
                                <table  width="100%" cellspacing="0">
                                    <thead>
                                        <tr>
                                            <th>Username:</th>
                                            <td><input type="text" class="border border-dark" placeholder="Username"
                                                onChange={(e) => setUsernameData(e.target.value)}/></td>
                                            <th>Fullname:</th>
                                            <td><input   type="text" class="border border-dark" placeholder="Fullname"
                                                onChange={(e) => setFullname(e.target.value)}/></td>
                                        </tr>
                                        <br></br>
                                    </thead>
                                    <tfoot>
                                        <tr>
                                            <th>Password:</th>
                                            <td><input   type="password" class="border border-dark" placeholder="Password"
                                                onChange={(e) => setPasswordData(e.target.value)}/></td>
                                            <th>Confirm Password:</th>
                                            <td><input   type="password" class="border border-dark" placeholder="Confirm Password"
                                                onChange={(e) => setConfirmpassword(e.target.value)}/></td>
                                        </tr>
                                        <br></br>
                                        <tr>
                                          <th>Email:</th>
                                          <td><input   type="text" class="border border-dark" placeholder="Email"
                                              onChange={(e) => setEmailData(e.target.value)}/></td>
                                          <th>Phone Number:</th>
                                          <td><input   type="text" class="border border-dark" placeholder="Phone Number"
                                              onChange={(e) => setPhonenumber(e.target.value)}/></td>
                                        </tr>  
                                        <br></br> 
                                        <tr>
                                          <th>Address:</th>
                                          <td><input   type="text" class="border border-dark" placeholder="Confirm New Password"
                                              onChange={(e) => setAddressData(e.target.value)}/></td>
                                          <th>Birthday:</th>
                                          <td><DatePicker
                                            selected={dob}
                                            onChange={setBirthdayData}
                                            peekNextMonth
                                            showMonthDropdown
                                            showYearDropdown
                                            dropdownMode= "scroll"
                                          /></td>
                                        </tr>  
                                        <br></br> 
                                        <tr>
                                            <th>Department:</th>
                                            <td>
                                              <select className="form-control"  onChange={(e) => setDepartmentID(e.target.value)}>
                                                <option value="">Choose Department</option>
                                                  {department==undefined||department==""?"":department.map(department => (
                                                  <option value={department._id}  >{department.departmentName}</option>
                                                    ))
                                                  }
                                              </select>
                                            </td>
                                            <th>Position:</th>
                                            <td>
                                              <select className="form-control"  onChange={(e) => setPositionID(e.target.value)}>
                                                <option value="">Choose Position</option>
                                                {position==undefined||position==""?"":position.map(position => (
                                                <option value={position._id} >{position.positionName}</option>
                                                  ))
                                                }
                                              </select>
                                            </td>
                                        </tr>  
                                        <br></br> 
                                        <tr>
                                            <th>Role:</th>
                                            <td>
                                              <select className="form-control"  onChange={(e) => setRole(e.target.value)}>
                                              <option value="user">Choose Role</option>
                                              <option value="user">User</option>
                                              <option value="admin">Admin</option>
                                              </select>
                                            </td>
                                            <th>Started Working:</th>
                                            <td><DatePicker
                                              selected={start}
                                              onChange={setStart}
                                              peekNextMonth
                                              showMonthDropdown
                                              showYearDropdown
                                              dropdownMode= "scroll"
                                            /></td>
                                        </tr>  
                                        <br></br>        
                                        <tr>
                                          <th>Gender:</th>
                                          <td><select className="form-control"  onChange={(e) => setGenderData(e.target.value)}>
                                            <option value="ohter">Choose Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                          </select></td>
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

export default UserCreate;
