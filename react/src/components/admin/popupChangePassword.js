import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation, Link } from "react-router-dom";
import {useEffect,useState} from "react";
function PopupChangePassword(props) {
    const { state } = useLocation();
    let [salary, setSalary] = useState("");
    const userID =state.user._id;
    const [newpassword, setNewpasswordData] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("")
    let[alert,setAlert]=useState("")
    const handleSubmit=()=>{
        if(newpassword==""||confirmpassword==""){
            return setAlert("Input are not filled")
        }
        else if (newpassword != confirmpassword){
            return setAlert("New Password is not confirmed")
        }
        fetch("http://localhost:5000/change-password-from-admin",{
        method:"POST",
        crossDomain:true,
        headers:{
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
            userID,newpassword
        })
        }).then((res) => res.json())
        .then((data) =>{
            setAlert(data.status);
            console.log(data,"Salary created");
        })
    }
    return(props.trigger) ? (
    
        <div className="popup-image "  >
            <div className="popup-inner " >
                    <div class="modal-content card shadow" >
                        <div class="modal-header ">
                            <h5 class="modal-title " id="exampleModalLabel">Change Password</h5>
                            <button onClick={()=> props.setTrigger(false)} class="close" type="button" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div class="modal-body">
                        <table  width="100%" cellspacing="0">
                                    <thead>
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
                                            <td><input  type="password" class="border border-dark" placeholder="Confirm New Password"
                                                onChange={(e) => setConfirmpassword(e.target.value)}/></td>
                                        </tr>  
                                        <br></br>                                  
                                    </tfoot>
                                    
                                </table>
                            <div>
                            {alert==""?<tr></tr>:<div><b class="text-danger">{alert}</b></div>}

                            </div>
                            
                        </div>

                        <div class="modal-footer">
                            <button onClick={()=> props.setTrigger(false)} class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                            <button class="btn btn-primary" onClick={()=>{handleSubmit()}} >Update</button>

                        </div>
                    </div>
                
            </div>
            
        </div>
        
    ):"";
}

export default PopupChangePassword