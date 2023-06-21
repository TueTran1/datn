import React from "react";
// import 'D:/project/doan/frontend/src/popup.css'
import { useLocation } from "react-router-dom";
import {useEffect,useState} from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'

function PopupDayoff(props) {
    const user =props.userID;
    const userID =props.userID;
    // const id = ObjectId()
    const [started, setStarted] = useState(new Date());
    const [timespan, setTimespan] = useState("");
    const [description, setDescrition] = useState("");

    useEffect(()=>{
    },[])

    function handleSubmit(){
        fetch("http://localhost:5000/dayoff-request",{
          method:"POST",
          crossDomain:true,
          headers:{
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            user,started,timespan,description
          })
        }).then((res) => res.json())
        .then((data) =>{
        //   console.log(data,"dayoff request");
        })
      }

    return(props.trigger) ? (
    
        <div className="popup-image "  >
            <div className="popup-inner " >
                    <div class="modal-content card shadow" >
                        <div class="modal-header ">
                            <h5 class="modal-title " id="exampleModalLabel">Request for Dayoff  </h5>
                            <button onClick={()=> props.setTrigger(false)} class="close" type="button" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <table  width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th>Started</th>
                                        <th>Timespan</th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <td><DatePicker className="square border border-dark" selected={started} onChange={(date) => setStarted(date)} /></td>
                                        <td><input  className=" border border-dark" type="text" class=" " onChange={(e) => setTimespan(e.target.value)}/></td>
                                    </tr>
                                </tfoot>
                            </table>
                            <b>Description</b><br></br>
                            <textarea className="square border border-dark" onChange={(e) => setDescrition(e.target.value)}/>
                        </div>
                        <div class="modal-footer">
                        <button onClick={()=> props.setTrigger(false)} class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                            <button class="btn btn-primary btn-user " onClick={(handleSubmit)}  >Save</button>
                        </div>
                    </div>
                
            </div>
            
        </div>
        
    ):"";
}

export default PopupDayoff