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

import PopupCatured from"./popupCaptured"
const AdminDetections = (_) => {
    // console.log("ViewUserDetail",months)
    const [detection, setDetectionData] = useState("");
    const days = ["S", "M", "T", "W", "T", "F", "S"];
	const thisDate = dayjs();
	const [today, setToday] = useState(thisDate);
	const [selectDate, setSelectDate] = useState(thisDate);
    const [previousSelectDate, setPreviousSelectDate] = useState();
    const [buttonPopupCaptured, setButtonPopupCaptured] = useState(false)
    const [detectionID, setDetectionID] = useState()
    const [Dayoff, setDayoff] = useState()
    const [dayoffCount, setDayoffCount] = useState()
    const [salary, setSalary] = useState()    
    
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
            fetch("http://localhost:5000/getAllDetections",{
            method:"GET"})
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
        case 'setData':
          return { ...state, data: action.payload.map(DetectionsData) };
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

    const setLoading = React.useCallback(nextLoading => dispatch({
      type: 'setLoading', payload: nextLoading,
    }), [dispatch]);

    



    useEffect(()=>{
        getData(setData, setLoading);
    },[setData, currentViewName, currentDate,setDayoff,setSalary])

    

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

        <li class="nav-item active">
        <a class="nav" >
                <i class="fas fa-fw fa-tachometer-alt"></i>
                <span className="px py bg-gradient-focus text-white"><Link className="nav-link " to={'/detection-details'}>Detections Management</Link></span></a>
        </li>
        
        <hr class="sidebar-divider my-0"></hr>

        <li class="nav-item">
        <a class="nav" >
                <i class="fas fa-fw fa-tachometer-alt"></i>
                <span><Link className="nav-link " to={'/work-schedule'}> Work Schedule</Link></span></a>
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
            <p class=" h3 mb-0 text-gray-800 text-center" >All Detections Details: </p>
          
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
                        <div class="card-body d-sm-flex">
                                            <div class="col-xl-4 col-lg-10 ">
                                                <div class="card shadow mb-1"> 
                                                    <Paper>
                                                        <Scheduler
                                                        data={data} 
                                                        >
                                                        <ViewState
                                                            currentDate={selectDate.toDate()}
                                                        />
                                                        <DayView
                                                            startDayHour={0}
                                                            endDayHour={12}
                                                            cellDuration={60}
                                                        />
                                                        <Appointments />
                                                        
                                                        </Scheduler>
                                                    </Paper>
                                                </div>
                                            </div>
                                            <div class="col-xl-4 col-lg-10 ">
                                                <div class="card shadow mb-1">
                                                    <Paper>
                                                        <Scheduler
                                                        data={data}
                                                        >
                                                        <ViewState
                                                            currentDate={selectDate.toDate()}
                                                        />
                                                        <DayView
                                                            startDayHour={12}
                                                            endDayHour={24}
                                                            cellDuration={60}
                                                        />
                                                        <Appointments />
                                                        
                                                        </Scheduler>
                                                    </Paper>
                                                </div>
                                            </div>
                                            <div class="col-xl-4 col-lg-10 ">
                                                <div class="card shadow mb-1">
                                                    <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">                                
                                                        <thead>
                                                            <tr>
                                                                <th>Username</th>
                                                                <th>Time </th>
                                                                <th>Type</th>
                                                                <th>View Info</th>
                                                                
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {detection == "" || detection == null ? "" :  
                                                                detection.map((detections, index) => 
                                                                    ( 
                                                                        detections.time.slice(0,10)==addOneDay(selectDate.toISOString().slice(0,10)).toISOString().slice(0,10)?
                                                                        // console.log("ok"):console.log("no")
                                                                        <tr>
                                                                            <td>{detections.user.username}</td>
                                                                            <td >{detections.time.slice(11,19)}</td>
                                                                            <td>{detections.type}</td>
                                                                            <td ><button className="text-primary"  onClick={()=>setDetectionID(detections._id) }>
                                                                                <span class="text">View</span>
                                                                            </button>
                                                                            <PopupCatured trigger={detectionID==detections._id} detections={detections} setTrigger={setDetectionID}>
                                                                            </PopupCatured>
                                                                            </td>                                                            
                                                                        </tr>:
                                                                        <tr></tr>
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

    </div>
  );
};

export default AdminDetections;
