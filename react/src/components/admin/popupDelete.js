import React from "react";
// import 'D:/project/doan/frontend/src/popup.css'
import { useLocation, Link } from "react-router-dom";

function PopupDelete(props) {
    const { state } = useLocation();
    // console.log(state.user.username);
    
    const deleteUser=()=>{
        
        // console.log(userID)
        fetch("http://localhost:5000/deleteUser",{
        method:"DELETE",
        crossDomain:true,
        headers:{
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
            userID:state.user._id
        })
        }).then((res) => res.json())
        .then((data) =>{
        // console.log(data,"delete");
        })
    }
    return(props.trigger) ? (
    
        <div className="popup "  >
            <div className="popup-inner " >
                    <div class="modal-content card shadow" >
                        <div class="modal-header ">
                            <h5 class="modal-title " id="exampleModalLabel">Delete this user?</h5>
                            <button onClick={()=> props.setTrigger(false)} class="close" type="button" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div class="modal-body">This user will be deleted</div>
                        <div class="modal-footer">
                            <button onClick={()=> props.setTrigger(false)} class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                            <Link to={'/user-details'}><button class="btn btn-danger" onClick={deleteUser} >Delete</button></Link>
                            {props.children}
                        </div>
                    </div>
                
            </div>
            
        </div>
        
    ):"";
}

export default PopupDelete