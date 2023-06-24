import React from "react";
// import 'D:/project/doan/frontend/src/popup.css'
import { useLocation, Link } from "react-router-dom";
import {useEffect,useState} from "react";

function PopupImage(props) {
    const { state } = useLocation();
    // console.log(state.user._id);
    const userID =state.user._id;
    const [image, setImage] = useState("");
    let [alert, setAlertData] = useState("");

    function convertToBase64(e) {
        // console.log(e);
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            // console.log(reader.result); //base64encoded string  
            setImage(reader.result);
        };
        reader.onerror = error => {
            // console.log("Error: ", error);
        };
    }
    function uploadImage() {
        fetch("http://localhost:5000/update-image", {
            method: "PUT",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                userID:userID,
                base64: image
            })
        }).then((res) => res.json())
        .then((data) =>{
            setAlertData(data.status)
            console.log(alert,"alert")
          console.log(data,"personal update");
        })
        // window.location.reload(true)
    }
    return(props.trigger) ? (
    
        <div className="popup-image "  >
            <div className="popup-inner " >
                    <div class="modal-content card shadow" >
                        <div class="modal-header ">
                            <h5 class="modal-title " id="exampleModalLabel">Choose file</h5>
                            <button onClick={()=> props.setTrigger(false)} class="close" type="button" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            {image == "" || image == null ? "" : <img width={420} height={250} src={image}/>}
                        </div>
                        {alert==""?<tr></tr>:<div><b class="text-danger">{alert}</b></div>}

                        <div class="modal-footer">
                        <input  accept="image/*" type="file" onChange={convertToBase64}/>
                            <button class="btn btn-primary btn-user " onClick={(uploadImage)} >Save</button>
                        </div>
                    </div>
                
            </div>
            
        </div>
        
    ):"";
}

export default PopupImage