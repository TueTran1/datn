import React from "react";
// import 'D:/project/doan/frontend/src/popup.css'
import { useLocation } from "react-router-dom";
import {useEffect,useState} from "react";

function PopupPosition(props) {
    const { state } = useLocation();
    // console.log(state.user._id);
    const userID =state.user._id;
    // console.log(props.departmentID);
    const [position, setPosition] = useState("");
    const [department, setDepartment] = useState("");
    let [positionID, setPositionID] = useState("");
    let [departmentID, setDepartmentID] = useState("");
    let [alert, setAlertData] = useState("");
    useEffect(()=>{
        getInfo()
    },[])

    

    function getInfo() {
        fetch("http://localhost:5000/getPositionAndDeparment",{
        method:"GET",
        }).then((res) => res.json())
        .then((data) =>{
        // console.log(data.data,"position and department Data")
        setPosition(data.data.position);
        setDepartment(data.data.department);
        })
    }

    function handleSubmit(){
        if(positionID =="" && departmentID ==""){return }
        else if(positionID =="" && departmentID !=""){
            positionID = props.positionID
         }
         else if(positionID !="" && departmentID ==""){
            departmentID = props.departmentID
         }
        fetch("http://localhost:5000/employee-update",{
          method:"PUT",
          crossDomain:true,
          headers:{
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            userID,positionID,departmentID
          })
        }).then((res) => res.json())
        .then((data) =>{
            setAlertData(data.status);
          console.log(data,"personal update");
        })
        // window.location.reload(true)
      }

    return(props.trigger) ? (
    
        <div className="popup-image "  >
            <div className="popup-inner " >
                    <div class="modal-content card shadow" >
                        <div class="modal-header ">
                            <h5 class="modal-title " id="exampleModalLabel">Employee Info</h5>
                            <button onClick={()=> props.setTrigger(false)} class="close" type="button" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div class="modal-body">
                        <table  width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th>Position</th>
                                        <th>Department</th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <td><select className="form-control"  onChange={(e) => setPositionID(e.target.value)}>
                                            <option value="">Choose Position</option>
                                            {position.map(position => (
                                             <option value={position._id} >{position.positionName}</option>
                                              ))
                                            }
                                        </select></td>
                                        <td><select className="form-control"  onChange={(e) => setDepartmentID(e.target.value)}>
                                          <option value="">Choose Department</option>
                                            {department.map(department => (
                                             <option value={department._id}  >{department.departmentName}</option>
                                              ))
                                            }
                                        </select></td>
                                    </tr>
                                </tfoot>
                                
                                
                            </table>
                            {alert==""?<tr></tr>:<div><b class="text-danger">{alert}</b></div>}
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

export default PopupPosition