import React , { Component }from "react";
// import 'D:/project/doan/frontend/src/popup.css'
import { useLocation, Link } from "react-router-dom";
import {useEffect,useState} from "react";

function PopupPosition(props) {
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
    function handleSubmit(){
        if(username==""){username=state.user.username}
        if(fullname==""){fullname=state.user.fullname}
        if(address==""){address=state.user.address}
        if(phonenumber==""){phonenumber=state.user.phonenumber}
        if(email==""){email=state.user.email}
        if(gender==""){gender=state.user.gender}
        if(role==""){role=state.user.role}
        fetch("http://localhost:5000/personal-update",{
          method:"POST",
          crossDomain:true,
          headers:{
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            userID,username,fullname,address,phonenumber,email,gender,role
          })
        }).then((res) => res.json())
        .then((data) =>{
          console.log(data,"personal update");
        })
        window.location.reload(true)
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
                                        <td><input   type="text" class=" " placeholder={state.user.username}
                                          onChange={(e) => setUsername(e.target.value)}/></td>
                                        <td><input   type="text" class=" " placeholder={state.user.fullname}
                                          onChange={(e) => setFullname(e.target.value)}/></td>
                                    </tr>
                                    <tr>
                                        <th>Address</th>
                                        <th>Phone number</th>
                                    </tr>
                                    <tr>
                                        <td><input   type="text" class=" " placeholder={state.user.address}
                                          onChange={(e) => setAddress(e.target.value)}/></td>
                                        <td><input   type="text" class=" " placeholder={state.user.phonenumber}
                                          onChange={(e) => setPhonenumber(e.target.value)}/></td>
                                    </tr>
                                    <tr>
                                        <th>Email</th>
                                        <th>Gender</th>
                                    </tr>
                                    <tr>
                                        <td><input   type="text" class=" " placeholder={state.user.email}
                                          onChange={(e) => setEmail(e.target.value)}/></td>
                                        <td><select className="form-control"  onChange={(e) => setGender(e.target.value)}>
                                            <option value={state.user.gender}>{state.user.gender}</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select></td>
                                    </tr>
                                    <tr>
                                        <th>Role</th>
                                    </tr>
                                    <tr>
                                        <td><select className="form-control"  onChange={(e) => setRole(e.target.value)}>
                                            <option value={state.user.role}>{state.user.role}</option>
                                            <option value="user">User</option>
                                            <option value="admin">Admin</option>
                                        </select></td>
                                    </tr>
                                </tfoot>
                                
                                
                                
                            </table>
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

export default PopupPosition