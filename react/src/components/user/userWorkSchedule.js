import React from "react";
import {useEffect,useState} from "react";
import { useLocation, Link,useNavigate} from "react-router-dom";
import dayjs from "dayjs";
import { generateDate, months } from "../util/calendar";
import cn from "../util/cn";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import PopupDayoff from"./popupDayoff"

const UserWorkSchedule = (userData) => {
    // console.log("ViewUserDetail",months)
    const [detection, setDetectionData] = useState("");
    const days = ["S", "M", "T", "W", "T", "F", "S"];
	const thisDate = dayjs();
	const [today, setToday] = useState(thisDate);
	const [selectDate, setSelectDate] = useState(thisDate);
    const { state } = useLocation();
    // console.log(userData.userData._id,"state: ");
    const userID = userData.userData._id
    const [buttonPopupDayoff, setButtonPopupDayoff] = useState(false)
    const [Dayoff, setDayoff] = useState("")
    const [allDayoff, setAllDayoff] = useState("")
    const [user, setUser] = useState();  
    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
        setToggleState(index);
    };
    function addOneDay(date ) {
        date = new Date(date); 

        date.setDate(date.getDate() + 1);
      
        return date;
      }
      
    const navigate = useNavigate();
    const logOut=()=>{
            window.localStorage.clear()
            window.location.href="/sign-in"
    }

    const getData = (setData, setLoading) => {
        setLoading(true);
            fetch("http://localhost:5000/user-detection-by-date",{
            method:"POST",
            crossDomain:true,
            headers:{
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                userID : userID
            })})
            .then(response => response.json())
            .then((data) => {
            setTimeout(() => {
                setData(data.data);
                setDetectionData(data.data)
                // console.log(data.data);
                setLoading(false);
            }, 600);
            });
    };

    function getUserInfo(setUser) {
        fetch("http://localhost:5000/getAllUsers",{
            method:"GET"
        }).then((res) => res.json())
        .then((data) =>{
            setUser(data.data)
        })
    }

    const DetectionsData = detection => ({
        id: detection._id,
        startDate: detection.time.slice(0,19),
        title: detection.type,
        resourceColorField: '#F06292',
    });

    const initialState = {
      data: [],
      loading: false,
      currentDate: '2023-06-07',
      currentViewName: 'Day',
    };
    
    const reducer = (state, action) => {
      switch (action.type) {
        case 'setLoading':
          return { ...state, loading: action.payload };
        // case 'setData':
        //   return { ...state, data: action.payload.map(DetectionsData) };
        case 'setCurrentViewName':
          return { ...state, currentViewName: action.payload };
        case 'setCurrentDate':
          return { ...state, currentDate: action.payload };
        default:
          return state;
      }
    };
    const [current, dispatch] = React.useReducer(reducer, initialState);
    const {
      data, loading, currentViewName, currentDate,
    } = current;
    
    const setData = React.useCallback(nextData => dispatch({
      type: 'setData', payload: nextData,
    }), [dispatch]);

    function getDayoffInfo(setDayoff) {
        fetch("http://localhost:5000/get-requested-dayoff-by-user",{
        method:"POST",
        crossDomain:true,
        headers:{
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
            userID : userID
        })
        }).then((res) => res.json())
        .then((data) =>{
            // console.log(data.data,"get info");
            setDayoff(data.data)
        })
    }

    function getAllDayoffInfo(setAllDayoff) {
        fetch("http://localhost:5000/get-all-dayoff",{
            method:"GET"
        }).then((res) => res.json())
        .then((data) =>{
            // console.log(data.data,"get info");
            setAllDayoff(data.data)
        })
    }

    function workSchedule(Dayoff,selectDate,user) {
        const notWorkingDay = Dayoff.filter((dayoffs)=>(dayoffs.started.slice(0,10)==addOneDay(selectDate.toISOString().slice(0,10)).toISOString().slice(0,10)
        && dayoffs.condition=="yes" ))
        if(notWorkingDay==""){
            return user==undefined || user ==""?<tr></tr>:user.map(user=>(
            user.role=="admin" ?
            <tr></tr>: user.start =="" || user.start==undefined?<tr></tr>: user.stop ==""||user.stop==undefined?<tr>
                <td>{user.username}</td>
                <td>{user.fullname}</td>
            </tr>: user.start.slice(0,10) <= addOneDay(selectDate.toISOString().slice(0,10)).toISOString().slice(0,10)
            && user.stop.slice(0,10) >= addOneDay(selectDate.toISOString().slice(0,10)).toISOString().slice(0,10)?
            <tr>
                <td>{user.username}</td>
                <td>{user.fullname}</td>
            </tr>:<tr></tr>
        ))}
        else{
            const workingEmployee = notWorkingDay.map(workingDay=>workingDay.user.username)
            const uniqueEmployee = workingEmployee.filter(function(elem, pos) {
                return workingEmployee.indexOf(elem) == pos;
            });
            const displayEmployee = 
                user.filter(user=>(uniqueEmployee.find(uniqueEmployee=>uniqueEmployee==user.username)))
            const userDisplay = user.filter(val => !displayEmployee.includes(val))
            // console.log(userDisplay,"workSchedule")
            return userDisplay.map(user=>(
                user.role=="admin"?
                <tr></tr>:
                <tr>
                    <td>{user.username}</td>
                    <td>{user.fullname}</td>
                </tr>
            ))
        }

    }   

    const setLoading = React.useCallback(nextLoading => dispatch({
      type: 'setLoading', payload: nextLoading,
    }), [dispatch]);

    useEffect(()=>{
        getDayoffInfo(setDayoff)
        getUserInfo(setUser)
        getAllDayoffInfo(setAllDayoff)
    },[setDayoff,setUser,setAllDayoff])

    

  return (
    <div id="wrapper">

<ul  class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

    <a class="sidebar-brand d-flex align-items-center justify-content-center" href="/home">
        <div class="sidebar-brand-icon rotate-n-15">
            <i class="fas fa-laugh-wink"></i>
        </div>
        <div class="sidebar-brand-text mx-3">Employee Page<sup></sup></div>
    </a>

    <hr class="sidebar-divider my-0"></hr>

    <li class="nav-item">
            <a class="nav" >
                <i class="fas fa-fw fa-tachometer-alt"></i>
                <span><Link className="nav-link " to={'/home'}>Home Page</Link></span></a>
        </li>
    <hr class="sidebar-divider my-0"></hr>
    
    <li class="nav-item">
        <a class="nav" >
                <i class="fas fa-fw fa-tachometer-alt"></i>
                <span><Link className="nav-link " to={'/user-details'}> Users Management</Link></span></a>
        </li>
        <hr class="sidebar-divider my-0"></hr>

        <li class="nav-item">
        <a class="nav" >
                <i class="fas fa-fw fa-tachometer-alt"></i>
                <span><Link className="nav-link " to={'/detection-details'}>Timekeeping Details</Link></span></a>
        </li>
        
        <hr class="sidebar-divider my-0"></hr>

        <li class="nav-item active">
        <a class="nav" >
                <i class="fas fa-fw fa-tachometer-alt"></i>
                <span className="px py bg-gradient-focus text-white"><Link className="nav-link " to={'/user-details'}> Work Schedule</Link></span></a>
        </li>
        <hr class="sidebar-divider my-0"></hr>

        <li class="nav-item">
        <a class="nav" >
                <i class="fas fa-fw fa-tachometer-alt"></i>
                <span><Link className="nav-link " to={'/company-details'}> Company Details</Link></span></a>
        </li>
        <hr class="sidebar-divider my-0"></hr>

        <li class="nav-item">
        <a class="nav" >
                <i class="fas fa-fw fa-tachometer-alt"></i>
                <span><Link className="nav-link " to={'/change-password'}> Change Password</Link></span></a>
        </li>
        <hr class="sidebar-divider my-0"></hr>


    <li class="nav-item">
        <a class="nav-link" >
            <i class="fas fa-fw fa-tachometer-alt"></i>
           <button onClick={logOut} class="btn btn-primary btn-user ">Log out</button></a>
    </li>

    <hr class="sidebar-divider"></hr>            

</ul>

    <div id="content-wrapper" class="d-flex flex-column">

        <div id="content">
        <nav class="  navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow ">
            <p class=" h3 mb-0 text-gray-800 text-center" >User Work Schedule: {userData.userData.fullname}</p>
          
            </nav>

            <div class="container-fluid">
                
                <div class="d-sm-flex align-items-center justify-content-between mb-4">
                    <button class="h5 mb-0 text-gray-800" onClick={() => navigate(-1)}><u>Back</u></button>
                    <button class="btn btn-primary btn-user" onClick={()=>setButtonPopupDayoff(true)}>
                        <span class="text">Request for Dayoff</span>
                    </button>
                    <PopupDayoff userID={userData.userData._id} trigger={buttonPopupDayoff} setTrigger={setButtonPopupDayoff}></PopupDayoff>
                </div>

                <div class="row">
                    <div class="col-xl-3 col-lg-20">

                        <div class="card shadow mb-4">
                            <div class="card-header py-3">
                                <h6 class="m-0 font-weight-bold text-primary">Employee Work Schedule</h6>
                            </div>
                            <div class="card-body">
                            <div className="w-60 h-96 ">
                                <div className="flex justify-between items-center">
                                    <h10 className="select-none font-semibold">
                                        {months[today.month()]}, {today.year()}
                                    </h10>
                                    <div className="flex gap-10 items-center ">
                                        <GrFormPrevious
                                            className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
                                            onClick={() => {
                                                setToday(today.month(today.month() - 1));
                                            }}
                                        />
                                        <h10
                                            className=" cursor-pointer hover:scale-105 transition-all"
                                            onClick={() => {
                                                setToday(thisDate);
                                            }}
                                        >
                                            Today
                                        </h10>
                                        <GrFormNext
                                            className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
                                            onClick={() => {
                                                setToday(today.month(today.month() + 1));
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-7 ">
                                    {days.map((day, index) => {
                                        return (
                                            <h10
                                                key={index}
                                                className="text-sm text-center h-14 w-14 grid place-content-center text-gray-500 select-none"
                                            >
                                                {day}
                                            </h10>
                                        );
                                    })}
                                </div>

                                <div className=" grid grid-cols-7 ">
                                    {generateDate(today.month(), today.year()).map(
                                        ({ date, currentMonth, today }, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className="p-2 text-center h-12 grid place-content-center text-sm border-t"
                                                >
                                                    <h10
                                                        className={cn(
                                                            currentMonth ? "" : "text-gray-400",
                                                            today
                                                                ? "bg-red-600 text-white"
                                                                : "",
                                                            selectDate
                                                                .toDate()
                                                                .toDateString() ===
                                                                date.toDate().toDateString()
                                                                ? "bg-black text-white"
                                                                : "",
                                                            "h-7 w-7 rounded-full grid place-content-center hover:bg-black hover:text-white transition-all cursor-pointer select-none"
                                                        )}
                                                        onClick={() => {
                                                            setSelectDate(date);
                                                        }}
                                                    >
                                                        {date.date()}
                                                    </h10>
                                                </div>
                                            );
                                        }
                                    )}
                                </div>
                            </div>
                            </div>
                        </div>

                    </div>
                    

                    <div class="col-xl-9 col-lg-10">
                        <div class="card shadow mb-4">
                            <div class="bloc-tabs">
                                <button  className={toggleState === 1 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(1)}>
                                <h6 class="m-0 font-weight-bold text-primary">Work Schedule</h6>
                                </button>
                                <button className={toggleState === 2 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(2)}>
                                <h6 class="m-0 font-weight-bold text-primary">Requested Dayoff</h6>
                                </button>
                            </div>
                            <div class="card-body d-sm-flex">
                                <div className={toggleState === 1 ? "content  active-content" : "content"}>
                                <table class="table table-bordered" id="dataTable" width="10" cellspacing="10">                                
                                                <thead>
                                                    <tr>
                                                        <th>Username </th>
                                                        <th>Fullname</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    { allDayoff=="" || allDayoff == undefined || allDayoff==null  ? 
                                                    "":workSchedule(allDayoff,selectDate,user)}
                                                </tbody>
                                            </table>
                                </div>

                                <div className={toggleState === 2 ? "content  active-content" : "content"} >
                                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">                                
                                        <thead>
                                            <tr>
                                                <th>Started </th>
                                                <th>Timespan</th>
                                                <th>Description </th>
                                                <th>Condition</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Dayoff == "" || Dayoff == null ? "" :  
                                                Dayoff.map((dayoffs, index) => 
                                                    ( 
                                                        dayoffs.started.slice(0,7)==selectDate.toISOString().slice(0,7)?
                                                        // console.log("ok"):console.log("no")
                                                        <tr>
                                                            <td >{dayoffs.started.slice(0,10)}</td>
                                                            <td>{dayoffs.timespan}</td> 
                                                            <td >{dayoffs.description}</td>
                                                            <td>{dayoffs.condition}</td>                                                         
                                                        </tr>:<tr></tr>
                                                    ))}
                                           
                                        </tbody>

                                    </table>
                                </div>
                            </div>
                        
                        </div>
                        
                        
                    </div>
                </div>
            </div>

        </div>

    </div>

    </div>
  );
};

export default UserWorkSchedule;
