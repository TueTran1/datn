import React from "react";
import { useState } from "react";
// import 'D:/project/doan/frontend/src/popup.css'
import { useLocation, Link } from "react-router-dom";

function PopupRemovePosition(props) {
    let[alert,setAlertData]=useState("")
    const positionID = props.positionID
    const deleteUser=()=>{
        
        // console.log(userID)
        fetch("http://localhost:5000/delete-position",{
        method:"POST",
        crossDomain:true,
        headers:{
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
            positionID:positionID
        })
        }).then((res) => res.json())
        .then((data) =>{
            setAlertData(data.status)
        })
    }
    return(props.trigger) ? (
    
        <div className="popup-image "  >
            <div className="popup-inner " >
                    <div class="modal-content card shadow" >
                        <div class="modal-header ">
                            <h5 class="modal-title " id="exampleModalLabel">Remove this Position?</h5>
                            <button onClick={()=> props.setTrigger(false)} class="close" type="button" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div class="modal-body">Positon {props.positionName}  will be removed</div>
                        <div class="modal-footer">
                        {alert==""?<tr></tr>:<div><b class="text-danger">{alert}</b></div>}

                            <button onClick={()=> props.setTrigger(false)} class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                            <button class="btn btn-danger" onClick={deleteUser} >Remove</button>
                            {props.children}
                        </div>
                    </div>
                
            </div>
            
        </div>
        
    ):"";
}

export default PopupRemovePosition