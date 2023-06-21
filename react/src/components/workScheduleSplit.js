import React, {  useEffect, useState } from "react";
// import AdminHome from "./adminHome";

import UserWorkSchedule from "./user/userWorkSchedule";
import AdminWorkSchedule from "./admin/adminWorkSchedule";

export default function WorkScheduleDetails() {
  const [userData, setUserData] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/userDetail", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        console.log(data.data.role)
        if (data.data.role == "user") {
          setRole("1");
        }
        else if (data.data.role == "admin") {
          setRole("2");
        }

        setUserData(data.data);

        if (data.data == "token expired") {
          
          window.localStorage.clear();
          window.location.href = "./sign-in";
        }
      });
  }, []);

  if(role == "1"){
    return <UserWorkSchedule userData={userData} />
  }
  else if(role == "2"){
    return <AdminWorkSchedule userData={userData} />
  }
}