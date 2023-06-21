import React , { Component }from "react";
import {useEffect,useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function PopupPosition(props) {
    
    console.log(props.user,"props");
    const userID =props.user._id;
    // console.log(state.user,"PopupPosition")
    let [username, setUsername] = useState("");
    let [fullname, setFullname] = useState("");
    let [address, setAddress] = useState("");
    let [phonenumber, setPhonenumber] = useState("");
    let [email, setEmail] = useState("");
    let [gender, setGender] = useState("");
    let [alert, setAlertData] = useState("");

    function addOneDay(date ) {
        date = new Date(date); 

        date.setDate(date.getDate() + 1);
      
        return date;
      }

    function minusOneDay(date ) {
        date = new Date(date); 

        date.setDate(date.getDate()- 1);
      
        return date;
      }

    function handleSubmit(){
        if(username==""){username=props.user.username}
        if(fullname==""){fullname=props.user.fullname}
        if(address==""){address=props.user.address}
        if(phonenumber==""){phonenumber=props.user.phonenumber}
        if(email==""){email=props.user.email}
        if(gender==""){gender=props.user.gender}
        fetch("http://localhost:5000/personal-update",{
          method:"POST",
          crossDomain:true,
          headers:{
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            userID,username,fullname,address,phonenumber,email,gender,
          })
        }).then((res) => res.json())
        .then((data) =>{
            setAlertData(data.status)
            // console.log(alert,"alert")
          console.log(data,"personal update");
        })
        // window.location.reload(true)
      }
    
    return(props.trigger) ? (
    
        <div className="popup-image "  >
            <div className="popup-inner " >
                    <div class="modal-content card shadow" >
                        <div class="modal-header ">
                            <h5 class="modal-title " id="exampleModalLabel">Personal Info</h5>
                            <button onClick={()=> props.setTrigger(false)} class="close" type="button" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div class="modal-body">
                        <table  width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th>Username</th>
                                        <th>Fullname</th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <td><input   type="text" class="border border-dark" placeholder={props.user.username}
                                          onChange={(e) => setUsername(e.target.value)}/></td>
                                        <td><input   type="text" class="border border-dark" placeholder={props.user.fullname}
                                          onChange={(e) => setFullname(e.target.value)}/></td>
                                    </tr>
                                    <tr>
                                        <th>Address</th>
                                        <th>Gender</th>
                                    </tr>
                                    <tr>
                                        <td><input   type="text" class="border border-dark" placeholder={props.user.address}
                                          onChange={(e) => setAddress(e.target.value)}/></td>
                                        <td><select className="form-control"  onChange={(e) => setGender(e.target.value)}>
                                            <option value={props.user.gender}>{props.user.gender}</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select></td>
                                    </tr>
                                    
                                    <tr>
                                        <th>Email</th>
                                        <th>Phone number</th>                                    
                                    </tr>
                                    <tr>
                                        <td><input   type="text" class="border border-dark" placeholder={props.user.email}
                                          onChange={(e) => setEmail(e.target.value)}/></td>
                                        <td><input   type="text" class="border border-dark" placeholder={props.user.phonenumber}
                                          onChange={(e) => setPhonenumber(e.target.value)}/></td>
                                    </tr>
                                    
                                </tfoot>
                                
                            </table>
                            {alert==""?<tr></tr>:<div><b class="text-danger">{alert}</b></div>}
                        </div>
                        <div class="modal-footer">
                        <button onClick={()=> props.setTrigger(false)} class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                            <button class="btn btn-primary btn-user " onClick={(handleSubmit)} >Save</button>
                        </div>
                    </div>
                
            </div>
            
        </div>
        
    ):"";
}

export default PopupPosition