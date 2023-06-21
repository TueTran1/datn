import React from "react";
import {useEffect,useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation, Link ,useNavigate} from "react-router-dom";

const Signup = ({}) => {
  const [username, setUsernameData] = useState("");
    const [password, setPasswordData] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("")
    const [email, setEmailData] = useState("");
    const [phonenumber, setPhonenumber] = useState("")
    const [address, setAddressData] = useState("");
    const [fullname, setFullname] = useState("")
    const [gender, setGenderData] = useState("");
    const [dob, setBirthdayData] = useState(new Date());

    let[alert,setAlertData]=useState("")

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
          username,password,fullname,address,phonenumber,email,gender,dob
        })
      }).then((res) => res.json())
      .then((data) =>{
        console.log(data)
        setAlertData(data.status)
      })
      }

    return (
      <div class="container">

        <div class="row justify-content-center">

            <div class="col-xl-10 col-lg-12 col-md-9">

                <div class="card o-hidden border-0 shadow-lg my-5">
                    <div class="card-body p-0">
                        <div class="row">
                            <div >
                                <div class="p-5" >
                                    <div class="text-center">
                                        <h1 class="h4 text-gray-900 mb-4">Sign up</h1>
                                    </div>
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
                                          <td ><DatePicker
                                          
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
                                    <div class="text-center">
                                    {alert==""?<tr></tr>:<div><b class="text-danger">{alert}</b></div>}
                            <button class="btn btn-primary  " onClick={(handleSubmit)}  >Sign up</button>
                                        <Link className="nav-link small" to={'/sign-in'}>
                                          Sign in
                                        </Link>
                                    </div>
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

export default Signup;
