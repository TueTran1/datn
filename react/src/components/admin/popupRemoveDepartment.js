import React, { useState } from "react";
// import 'D:/project/doan/frontend/src/popup.css'
import { useLocation, Link } from "react-router-dom";

function PopupRemoveDepartment(props) {
    let [alert,setAlertData]=useState("")
    
    const deleteUser=()=>{
        const departmentID=props.departmentID
        // console.log(userID)
        fetch("http://localhost:5000/delete-department",{
        method:"POST",
        crossDomain:true,
        headers:{
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
            departmentID:departmentID
        })
        }).then((res) => res.json())
        .then((data) =>{
            setAlertData(data.status)
        })
    }
    return(props.trigger) ? (
    
        <div className="popup "  >
            <div className="popup-inner " >
                    <div class="modal-content card shadow" >
                        <div class="modal-header ">
                            <h5 class="modal-title " id="exampleModalLabel">Remove this Deparment?</h5>
                            <button onClick={()=> props.setTrigger(false)} class="close" type="button" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div class="modal-body">Deparment {props.departmentName} will be removed</div>
                        <div class="modal-footer">
                            {alert==""?"":<div><b class="text-danger">{alert}</b></div>}
                            <button onClick={()=> props.setTrigger(false)} class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                            <button class="btn btn-danger" onClick={deleteUser} >Remove</button>
                            {props.children}
                        </div>
                    </div>
                
            </div>
            
        </div>
        
    ):"";
}

export default PopupRemoveDepartment