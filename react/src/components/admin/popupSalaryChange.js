import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation, Link } from "react-router-dom";
import {useEffect,useState} from "react";
function PopupSalaryChange(props) {
    const { state } = useLocation();
    let [salary, setSalary] = useState("");
    const userID =state.user._id;
    let [updated, setUpdate] = useState(new Date());
    let [alert, setAlert] = useState("");
    // const updated = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
    const createSalary=()=>{
        
        // console.log(userID)
        fetch("http://localhost:5000/salary-create",{
        method:"POST",
        crossDomain:true,
        headers:{
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
            userID:userID,
            updated:updated,
            salary:salary,
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
                            <h5 class="modal-title " id="exampleModalLabel">Salary Info</h5>
                            <button onClick={()=> props.setTrigger(false)} class="close" type="button" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <b>Salary</b>
                            <input   type="text" class=" " placeholder=""
                                          onChange={(e) => setSalary(e.target.value)}/>
                            <b>Updated Date</b>
                            
                            <DatePicker
                                selected={updated}
                                onChange={setUpdate}
                                peekNextMonth
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode= "scroll"
                                // onInputClick={console.log(typeof dob)}
                            />
                            <div>
                            {alert==""?<tr></tr>:<div><b class="text-danger">{alert}</b></div>}

                            </div>
                            
                        </div>

                        <div class="modal-footer">
                            <button onClick={()=> props.setTrigger(false)} class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                            <button class="btn btn-primary" onClick={()=>{createSalary()}} >Update</button>

                        </div>
                    </div>
                
            </div>
            
        </div>
        
    ):"";
}

export default PopupSalaryChange