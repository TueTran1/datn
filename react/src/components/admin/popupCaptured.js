import React from "react";
// import 'D:/project/doan/frontend/src/popup.css'
import { useLocation, Link } from "react-router-dom";
import {useEffect,useState} from "react";

function PopupCaptured(props) {
    const date = props.detections.time.slice(0, 10)
    const time = props.detections.time.slice(11, 19)
    
    // console.log(props.trigger)
    return(props.trigger) ? (
    
        <div className="popup-image"  >
            <div className="popup-inner " >
                    <div class="modal-content card shadow" >
                        <div class="modal-header ">
                            <h5 class="modal-title " id="exampleModalLabel">Captured at {date} {time}</h5>
                            <button onClick={()=> props.setTrigger(false)} class="close" type="button" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            {props.detections.captured == "" || props.detections.captured == null ? "" : <img width={420} height={250} src={props.detections.captured}/>}
                        </div>
                        <div class="modal-footer">
                        <table  width="100%" cellspacing="0">                                
                            <thead>
                                <tr>
                                    <th>Confidence </th>
                                    <th>Type</th>                                                
                                </tr>
                            </thead>
                            <tfoot>
                                <tr>
                                <td >{props.detections.confidence}</td>         
                                    <td>{props.detections.type}</td>                                                       
                                </tr>
                            </tfoot>

                        </table>
                            <button onClick={()=> props.setTrigger(false)} class="btn btn-secondary  btn-user "  >Cancel</button>
                        </div>
                    </div>
                
            </div>
            
        </div>
        
    ):"";
}

export default PopupCaptured