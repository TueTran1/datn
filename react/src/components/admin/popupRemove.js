import React from "react";
import { useState } from "react";
import { useLocation, Link } from "react-router-dom";

function PopupRemove(props) {
    const dayoffID  = props.dayoffID;
    const condition = 'no'
    let [alert,setAlertData] = useState("")
    const removeDayoff=()=>{
        
        // console.log(userID)
        fetch("http://localhost:5000/update-dayoff",{
        method:"PUT",
        crossDomain:true,
        headers:{
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
            dayoffID:dayoffID,
            condition:condition,
        })
        }).then((res) => res.json())
        .then((data) =>{
            setAlertData(data.status)
        
        })
    }
    return(props.trigger && props.approve==false) ? (
    
        <div className="popup "  >
            <div className="popup-inner " >
                    <div class="modal-content card shadow" >
                        <div class="modal-header ">
                            <h5 class="modal-title " id="exampleModalLabel">Remove this Dayoff</h5>
                            <button onClick={()=> props.setTrigger(false)} class="close" type="button" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div class="modal-body">This dayoff will be removed</div>
                        <div class="modal-footer">
                        {alert==""?<tr></tr>:<div><b class="text-danger">{alert}</b></div>}

                            <button onClick={()=> props.setTrigger(false)} class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                            <button class="btn btn-danger" onClick={()=>{ removeDayoff();props.setTrigger(false)}} >Remove</button>
                        </div>
                    </div>
                
            </div>
            
        </div>
        
    ):"";
}

export default PopupRemove