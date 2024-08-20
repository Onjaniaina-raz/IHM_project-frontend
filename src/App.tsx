import { Grid } from "@mui/material"
import { Route, Routes } from "react-router-dom"
import SignIn from "./SignIn"
import RootLayout from './_root/RootLayout'
import AssignEmployee from "./_root/pages/AssignEmployee"
import DashBoard from "./_root/pages/DashBoard"
import Employee from "./_root/pages/Employee"
import EmployeeHistory from "./_root/pages/EmployeeHistory"
import Home from "./_root/pages/Home"
import Salary from "./_root/pages/Salary"
import './globalstyle.css'

const App = () => {
  return (
    <>

      <Grid>

        <Routes>

          <Route element={ <RootLayout/> }>
              <Route path="/" element={ <Home/> }></Route>
              <Route path="/employee-management" element={ <Employee/> }></Route>
              <Route path="/employee-assignement" element={ <AssignEmployee/> }></Route>
              <Route path="/salary-management" element={ <Salary/> }></Route>
              <Route path="/salary-employee-history" element={ <EmployeeHistory/> }></Route>
              <Route path="/dashboard" element={ <DashBoard/> }></Route>
          </Route>

          <Route path="/login" element={<SignIn/>}></Route>

        </Routes>

      </Grid>

    </>
  )
}

export default App
