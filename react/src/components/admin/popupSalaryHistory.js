import React from "react";
// import 'D:/project/doan/frontend/src/popup.css'
import { useLocation, Link } from "react-router-dom";
import {useEffect,useState} from "react";
import PopupRemoveSalary from "./popupRemoveSalary";

function PopupSalaryHistory(props) {
    
    const { state } = useLocation();
    const userID =state.user._id;
    const [allSalary, setAllSalaryData] = useState("");
    const [buttonPopupRemoveSalary, setButtonPopupRemoveSalary] = useState(false)
    const [salaryID, setSalaryID] = useState()

    const getAllSalary=()=>{
        
        // console.log(userID)
        fetch("http://localhost:5000/get-salary-by-user",{
        method:"POST",
        crossDomain:true,
        headers:{
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
            userID:userID
        })
        }).then((res) => res.json())
        .then((data) =>{
        // console.log(data,"Approve");
        setAllSalaryData(data.data);
        })
    }
    useEffect(()=>{
        getAllSalary()
    },[])
    return(props.trigger) ? (
    
        <div className="popup-image "  >
            <div className="popup-inner " >
                    <div class="modal-content card shadow" >
                        <div class="modal-header ">
                            <h5 class="modal-title " id="exampleModalLabel">Salary History</h5>
                            <button onClick={()=> props.setTrigger(false)} class="close" type="button" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">                                
                                <thead>
                                    <tr>
                                        <th>Salary </th>
                                        <th>Updated At</th>      
                                        <th>Action</th>                                  
                                    </tr>
                                </thead>
                                <tbody>
                                    {allSalary == "" || allSalary == null ? "" :  
                                        allSalary.map((salary, index) => 
                                            ( 
                                                
                                                <tr>
                                                    <td >{salary.salary}</td>
                                                    <td>{salary.updated.slice(0,10)}</td>
                                                    <td><button  class="btn btn-danger btn-user" onClick={()=>setSalaryID(salary._id)}>
                                                        <span class="icon text-white-50">
                                                            </span>
                                                        <span class="text">Remove</span>
                                                    </button>
                                                    <PopupRemoveSalary salaryID={salary._id} updated={salary.updated} trigger={salaryID==salary._id}  setTrigger={setSalaryID}></PopupRemoveSalary></td>                       
                                                </tr>
                                        ))}
                                    
                                </tbody>

                            </table>
                        </div>
                        <div class="modal-footer">
                            <button onClick={()=> props.setTrigger(false)} class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>

                        </div>
                    </div>
                
            </div>
            
        </div>
        
    ):"";
}

export default PopupSalaryHistory