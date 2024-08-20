import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NavBar = () => {

    const navigate = useNavigate();

    return (
        <>

            <Grid className="w-screen overflow-hidden flex items-center justify-center z-20 border-b-2 border-theme-color-2 shadow-md">
                <nav className="flex w-screen justify-between ps-12 pe-20 py-7 items-center ">
                    <h1 className="text-xl font-bold cursor-default text-theme-color-3 font-quicksand">Salary Management</h1>
                    <div className="flex items-center">
                        <ul className="flex items-center space-x-6 ">
                            <li className="nav-btn" onClick={(e) => {e.preventDefault(); navigate('/')}}>Home</li>
                            <li className="nav-btn" onClick={(e) => {e.preventDefault(); navigate('/employee-management')}}>Employee</li>
                            <li className="nav-btn" onClick={(e) => {e.preventDefault(); navigate('/salary-management')}}>Salary</li>
                            <li className="nav-btn" onClick={(e) => {e.preventDefault(); navigate('/dashboard')}}>DashBoard</li>
                        </ul>
                    </div>
                </nav>
            </Grid>

        </>
    )
}

export default NavBar
