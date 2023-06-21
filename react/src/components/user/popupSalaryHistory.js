import React from "react";
import {useEffect,useState} from "react";

function PopupSalaryHistory(props) {
    
    const userID = props.userID 
    const [allSalary, setAllSalaryData] = useState("");

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
                                    </tr>
                                </thead>
                                <tbody>
                                    {allSalary == "" || allSalary == null ? "" :  
                                        allSalary.map((salary, index) => 
                                            ( 
                                                
                                                <tr>
                                                    <td >{salary.salary}</td>
                                                    <td>{salary.updated.slice(0,10)}</td>
                                                                                                          
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