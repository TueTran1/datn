import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import './sb-admin-2.css'
import './sb-admin-2.min.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Login from './components/login.component'
import SignUp from './components/signup.component'
import UserDetail from './components/userSplit.component'
import DetectionDetail from './components/detectionSplit.component'
import AllUsers from './components/allUsersSplit.component'
import ChangePassword from './components/changePasswordSplit.component'
import EmployeeManagement from './components/employeeManagementSplit.component'
import CompanyManagement from './components/companySplit.component'
import PositionCreate from './components/positionCreate'
import DepartmentCreate from './components/departmentCreate'
import UserCreate from './components/userCreateSplit'
import SalaryInfo from './components/salaryInfoSplit'
import WorkSchedule from './components/workScheduleSplit'

function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn")
  return (
    <Router>
      <div className="App">
        {}

        
            <Routes>
              <Route exact path="/" element={isLoggedIn =="true"?<UserDetail />:<Login />} />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/home" element={<UserDetail />} />
              <Route path="/detection-details" element={<DetectionDetail />} />
              <Route path="/user-details" element={<AllUsers />} />
              <Route path="/change-password" element={<ChangePassword />} />
              <Route path="/user-details/:id"  element={<EmployeeManagement />}/>              
              <Route path="/user-details/create"  element={<UserCreate />}/>
              <Route path="/company-details"  element={<CompanyManagement />}/>
              <Route path="/company-details/create-position"  element={<PositionCreate />}/>
              <Route path="/company-details/create-department"  element={<DepartmentCreate />}/>
              <Route path="/user-details/:id/salary"  element={<SalaryInfo />}/>
              <Route path="/work-schedule"  element={<WorkSchedule />}/>
            </Routes>
        
      </div>
    </Router>
  )
}

export default App
