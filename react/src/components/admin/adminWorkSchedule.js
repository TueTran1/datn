import React from "react";
import {useEffect,useState} from "react";
import { useLocation, Link,useNavigate} from "react-router-dom";
import dayjs from "dayjs";
import { generateDate, months } from "../util/calendar";
import cn from "../util/cn";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';
import DatePicker from "react-datepicker";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import PopupApprove from"./popupApprove"
import PopuppRemove from"./popupRemove"

const AdminWorkSchedule = (userData) => {
    
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
    const [user, setUser] = useState();  
    const [dayoffID, setDayoffID] = useState()
    const [approve, setApprove] = useState(true)

    function addOneDay(date ) {
        date = new Date(date); 

        date.setDate(date.getDate() + 1);
      
        return date;
      }

    function addSpanDay(date,span ) {
        date = new Date(date); 

        date.setDate(date.getDate() + span);
        
        return date;
    }
      
    const navigate = useNavigate();
    const logOut=()=>{
            window.localStorage.clear()
            window.location.href="/sign-in"
    }

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


    function getDayoffInfo(setDayoff) {
        fetch("http://localhost:5000/get-all-dayoff",{
            method:"GET"
        }).then((res) => res.json())
        .then((data) =>{
            // console.log(data.data,"get info");
            setDayoff(data.data)
        })
    }

    function getUserInfo(setUser) {
        fetch("http://localhost:5000/getAllUsers",{
            method:"GET"
        }).then((res) => res.json())
        .then((data) =>{
            setUser(data.data)
        })
    }

    function workSchedule(Dayoff,selectDate,user) {
        const notWorkingDay = Dayoff.filter((dayoffs)=>(dayoffs.started.slice(0,10)==addOneDay(selectDate.toISOString().slice(0,10)).toISOString().slice(0,10)
        && dayoffs.condition=="yes" ))
        if(notWorkingDay==""){return user==undefined || user ==""?<tr></tr>:
        user.map(user=>(
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

    useEffect(()=>{
        getDayoffInfo(setDayoff)
        getUserInfo(setUser)
    },[setDayoff,setUser])

    

  return (
    <div id="wrapper">

<ul  class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

    <a class="sidebar-brand d-flex align-items-center justify-content-center" href="/home">
        <div class="sidebar-brand-icon rotate-n-15">
            <i class="fas fa-laugh-wink"></i>
        </div>
        <div class="sidebar-brand-text mx-3">Admin Page<sup></sup></div>
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
                <span><Link className="nav-link " to={'/detection-details'}>Detections Management</Link></span></a>
        </li>
        
        <hr class="sidebar-divider my-0"></hr>

        <li class="nav-item active">
        <a class="nav" >
                <i class="fas fa-fw fa-tachometer-alt"></i>
                <span className="px py bg-gradient-focus text-white"><Link className="nav-link " to={'#'}> Work Schedule</Link></span></a>
        </li>
        <hr class="sidebar-divider my-0"></hr>

        <li class="nav-item">
        <a class="nav" >
                <i class="fas fa-fw fa-tachometer-alt"></i>
                <span><Link className="nav-link " to={'/company-details'}> Company Management</Link></span></a>
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
            <p class=" h3 mb-0 text-gray-800 text-center" >Work Schedule Details: {detection.fullname}</p>
          
            </nav>

            <div class="container-fluid">
                
                <div class="d-sm-flex align-items-center justify-content-between mb-4">
                    <button class="h5 mb-0 text-gray-800" onClick={() => navigate(-1)}><u>Back</u></button>
                   
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
                            
                            <Tabs style={{ width: '850px' }}>
                                <TabList style={{
                                    fontSize: '20px',
                                    margin: '20px',                                    
                                }}>
                                    <Tab><h4 class="m-0 font-weight-bold text-primary">Work Schedule</h4></Tab>
                                    <Tab><h4 class="m-0 font-weight-bold text-primary"> Dayoffs Management</h4></Tab>
                                </TabList>
                                <TabPanel style={{ fontSize: '20px', margin: '20px' }}>
                                <table class="table table-bordered" id="dataTable" width="10" cellspacing="10">                                
                                                <thead>
                                                    <tr>
                                                        <th>Username </th>
                                                        <th>Fullname</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {Dayoff=="" || Dayoff == undefined || Dayoff==null  ? 
                                                    "":workSchedule(Dayoff,selectDate,user)}
                                                </tbody>
                                            </table>
                                </TabPanel>
                                <TabPanel style={{ fontSize: '20px', margin: '20px' }}>
                                    <Tabs>
                                        <TabList>
                                            <Tab ><h6 class="m-0 font-weight-bold text">Approved Dayoffs</h6></Tab>
                                            <Tab ><h6 class="m-0 font-weight-bold text"> Waiting Dayoffs</h6></Tab>
                                            <Tab ><h6 class="m-0 font-weight-bold text"> Removed Dayoffs</h6></Tab>
                                        </TabList>
                                        <TabPanel>
                                            <table class="table table-bordered" id="dataTable" width="10" cellspacing="10">                                
                                                <thead>
                                                    <tr>
                                                        <th>Username </th>
                                                        <th>Fullname</th>
                                                        <th>Started </th>
                                                        <th>Timespan</th>
                                                        <th>Description </th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {Dayoff == "" || Dayoff == null ? "" :  
                                                        Dayoff.map((dayoffs, index) => 
                                                            ( 
                                                                dayoffs.started.slice(0,7)==addOneDay(selectDate.toISOString().slice(0,7)).toISOString().slice(0,7)
                                                                && dayoffs.condition=="yes"?
                                                                // console.log("ok"):console.log("no")
                                                                <tr>
                                                                    <td>{dayoffs.user.username}</td>
                                                                    <td>{dayoffs.user.fullname}</td>
                                                                    <td >{dayoffs.started.slice(0,10)}</td>
                                                                    <td>{dayoffs.timespan}</td> 
                                                                    <td >{dayoffs.description}</td>
                                                                    <td><button className="btn btn-danger btn-user" onClick={()=>{setDayoffID(dayoffs._id);setApprove(false);} }>Remove</button>
                                                                    <PopuppRemove trigger={dayoffID==dayoffs._id} dayoffID={dayoffs._id} useEffect={useEffect} approve={approve} setTrigger={setDayoffID}>
                                                                    </PopuppRemove></td>                                                         
                                                                </tr>:<tr></tr>
                                                            ))}
                                                
                                                </tbody>
                                            </table>
                
                                        </TabPanel>
                                        <TabPanel>
                                            <table class="table table-bordered" id="dataTable" width="10" cellspacing="10">                                
                                                <thead>
                                                    <tr>
                                                        <th>Username </th>
                                                        <th>Fullname</th>
                                                        <th>Started </th>
                                                        <th>Timespan</th>
                                                        <th>Description </th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {Dayoff == "" || Dayoff == null ? "" :  
                                                        Dayoff.map((dayoffs, index) => 
                                                            ( 
                                                                dayoffs.started.slice(0,7)==addOneDay(selectDate.toISOString().slice(0,7)).toISOString().slice(0,7)
                                                                && dayoffs.condition=="wait"?
                                                                // console.log("ok"):console.log("no")
                                                                <tr>
                                                                    <td>{dayoffs.user.username}</td>
                                                                    <td>{dayoffs.user.fullname}</td>
                                                                    <td >{dayoffs.started.slice(0,10)}</td>
                                                                    <td>{dayoffs.timespan}</td> 
                                                                    <td >{dayoffs.description}</td>
                                                                    <td><button className="btn btn-primary btn-user" onClick={()=>{setDayoffID(dayoffs._id);setApprove(true);} }>Approve</button>
                                                                    <PopupApprove trigger={dayoffID==dayoffs._id} dayoffID={dayoffs._id} approve={approve} useEffect={useEffect} setTrigger={setDayoffID}>
                                                                    </PopupApprove>
                                                                    <button className="btn btn-danger btn-user" onClick={()=>{setDayoffID(dayoffs._id);setApprove(false);} }>Remove</button>
                                                                    <PopuppRemove trigger={dayoffID==dayoffs._id} dayoffID={dayoffs._id} approve={approve} setTrigger={setDayoffID}>
                                                                    </PopuppRemove></td>                                                                 
                                                                </tr>:<tr></tr>
                                                            ))}
                                                
                                                </tbody>
                                            </table>
                                        </TabPanel>
                                        <TabPanel>
                                        <table class="table table-bordered" id="dataTable" width="10" cellspacing="10">                                
                                                <thead>
                                                    <tr>
                                                        <th>Username </th>
                                                        <th>Fullname</th>
                                                        <th>Started </th>
                                                        <th>Timespan</th>
                                                        <th>Description </th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {Dayoff == "" || Dayoff == null ? "" :  
                                                        Dayoff.map((dayoffs, index) => 
                                                            ( 
                                                                dayoffs.started.slice(0,7)==addOneDay(selectDate.toISOString().slice(0,7)).toISOString().slice(0,7)
                                                                && dayoffs.condition=="no"?
                                                                // console.log("ok"):console.log("no")
                                                                <tr>
                                                                    <td>{dayoffs.user.username}</td>
                                                                    <td>{dayoffs.user.fullname}</td>
                                                                    <td >{dayoffs.started.slice(0,10)}</td>
                                                                    <td>{dayoffs.timespan}</td> 
                                                                    <td >{dayoffs.description}</td>
                                                                    <td><button className="btn btn-primary btn-user" onClick={()=>{setDayoffID(dayoffs._id);setApprove(true);} }>Approve</button>
                                                                    <PopupApprove trigger={dayoffID==dayoffs._id} dayoffID={dayoffs._id} approve={approve} setTrigger={setDayoffID}>
                                                                    </PopupApprove></td>                                                         
                                                                </tr>:<tr></tr>
                                                            ))}
                                                
                                                </tbody>
                                            </table>
                
                                        </TabPanel>
                                    </Tabs>
                                </TabPanel>
                            </Tabs>
                        </div>                        
                    </div>
                </div>
            </div>

        </div>

    </div>

    </div>
  );
};

export default AdminWorkSchedule;
