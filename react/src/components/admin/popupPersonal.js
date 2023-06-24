import React , { Component }from "react";
// import 'D:/project/doan/frontend/src/popup.css'
import { useLocation, Link } from "react-router-dom";
import {useEffect,useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function PopupPersonal(props) {
    const { state } = useLocation();
    const userID =state.user._id;
    // console.log(state.user,"PopupPosition")
    let [username, setUsername] = useState("");
    let [fullname, setFullname] = useState("");
    let [address, setAddress] = useState("");
    let [phonenumber, setPhonenumber] = useState("");
    let [email, setEmail] = useState("");
    let [gender, setGender] = useState("");
    let [role, setRole] = useState("");
    let [dob, setDob] = useState(new Date((state.user.dob)));
    let [start, setStart] = useState(new Date(minusOneDay(state.user.start)));

    let [stop, setStop] = useState(new Date(minusOneDay(state.user.stop)));

    
    let [alert, setAlertData] = useState("");

    function addOneDay(date ) {
        date = new Date(date); 

        date.setDate(date.getDate() + 1);
      
        return date;
      }

    function minusOneDay(date ) {
        date = new Date(date); 

        date.setDate(date.getDate()- 1);
      
        return date;
      }

    function handleSubmit(){
        if(username==""){username=state.user.username}
        if(fullname==""){fullname=state.user.fullname}
        if(address==""){address=state.user.address}
        if(phonenumber==""){phonenumber=state.user.phonenumber}
        if(email==""){email=state.user.email}
        if(gender==""){gender=state.user.gender}
        if(role==""){role=state.user.role}
        if(dob==""){dob=state.user.dob}
            else{dob = addOneDay(dob)}

        if(start==""){start=state.user.start}
            else{start = addOneDay(start)}

        if(stop==""){stop=state.user.stop}
            else{stop = addOneDay(stop)}

        if (start > stop)
            {return setAlertData("Stopped date must be greater than Started date")}
        fetch("http://localhost:5000/personal-update",{
          method:"PUT",
          crossDomain:true,
          headers:{
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            userID,username,fullname,address,phonenumber,email,gender,role,dob,start,stop
          })
        }).then((res) => res.json())
        .then((data) =>{
            setAlertData(data.status)
        //     console.log(alert,"alert")
        //   console.log(data,"personal update");
        })
        // window.location.reload(true)
      }
    
    return(props.trigger) ? (
    
        <div className="popup-image "  >
            <div className="popup-inner " >
                    <div class="modal-content card shadow" >
                        <div class="modal-header ">
                            <h5 class="modal-title " id="exampleModalLabel">Personal Info</h5>
                            <button onClick={()=> props.setTrigger(false)} class="close" type="button" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div class="modal-body">
                        <table  width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th>Username</th>
                                        <th>Fullname</th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <td><input   type="text" class="border border-dark" placeholder={state.user.username}
                                          onChange={(e) => setUsername(e.target.value)}/></td>
                                        <td><input   type="text" class="border border-dark" placeholder={state.user.fullname}
                                          onChange={(e) => setFullname(e.target.value)}/></td>
                                    </tr>
                                    <tr>
                                        <th>Birthday</th>
                                        <th>Gender</th>
                                    </tr>
                                    <tr>
                                    {state.user.dob==undefined||state.user.dob==null||state.user.dob==""?
                                            <td><DatePicker
                                            selected={new Date()}
                                            onChange={setDob}
                                            peekNextMonth
                                            showMonthDropdown
                                            showYearDropdown
                                            dropdownMode= "scroll"
                                        /></td>:
                                        <td><DatePicker
                                            selected={dob}
                                            onChange={setDob}
                                            peekNextMonth
                                            showMonthDropdown
                                            showYearDropdown
                                            dropdownMode= "scroll"
                                        /></td>
                                        }
                                        <td><select className="form-control"  onChange={(e) => setGender(e.target.value)}>
                                            <option value={state.user.gender}>{state.user.gender}</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select></td>
                                    </tr>
                                    <tr>
                                        <th>Started working</th>
                                        <th>Stopped working</th>
                                    </tr>
                                    <tr>
                                    {state.user.start==undefined||state.user.start==null||state.user.start==""?
                                            <td><DatePicker
                                            selected={new Date()}
                                            onChange={setStart}
                                            peekNextMonth
                                            showMonthDropdown
                                            showYearDropdown
                                            dropdownMode= "scroll"
                                        /></td>:
                                        <td><DatePicker
                                            selected={start}
                                            onChange={setStart}
                                            peekNextMonth
                                            showMonthDropdown
                                            showYearDropdown
                                            dropdownMode= "scroll"
                                        /></td>
                                        }
                                        {state.user.stop==undefined||state.user.stop==null||state.user.stop==""?
                                            <td><DatePicker
                                            selected={new Date()}
                                            onChange={setStop}
                                            peekNextMonth
                                            showMonthDropdown
                                            showYearDropdown
                                            dropdownMode= "scroll"
                                        /></td>:
                                        <td><DatePicker
                                            selected={stop}
                                            onChange={setStop}
                                            peekNextMonth
                                            showMonthDropdown
                                            showYearDropdown
                                            dropdownMode= "scroll"
                                        /></td>
                                        }
                                        
                                    </tr>
                                    <tr>
                                        <th>Email</th>
                                        <th>Phone number</th>                                    
                                    </tr>
                                    <tr>
                                        <td><input   type="text" class="border border-dark" placeholder={state.user.email}
                                          onChange={(e) => setEmail(e.target.value)}/></td>
                                        <td><input   type="text" class="border border-dark" placeholder={state.user.phonenumber}
                                          onChange={(e) => setPhonenumber(e.target.value)}/></td>
                                    </tr>
                                    <tr>
                                        <th>Address</th>
                                        <th>Role</th>
                                    </tr>
                                    <tr>
                                        <td><input   type="text" class="border border-dark" placeholder={state.user.address}
                                          onChange={(e) => setAddress(e.target.value)}/></td>
                                        <td><select className="form-control"  onChange={(e) => setRole(e.target.value)}>
                                            <option value={state.user.role}>{state.user.role}</option>
                                            <option value="user">User</option>
                                            <option value="admin">Admin</option>
                                        </select></td>
                                    </tr>
                                    
                                </tfoot>
                                
                            </table>
                            {alert==""?<tr></tr>:<div><b class="text-danger">{alert}</b></div>}
                        </div>
                        <div class="modal-footer">
                        <button onClick={()=> props.setTrigger(false)} class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                            <button class="btn btn-primary btn-user " onClick={(handleSubmit)} >Save</button>
                        </div>
                    </div>
                
            </div>
            
        </div>
        
    ):"";
}

export default PopupPersonal