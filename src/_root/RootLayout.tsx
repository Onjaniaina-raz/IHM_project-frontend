import { Grid } from "@mui/material"
import NavBar from "../components/NavBar"
import { Outlet } from "react-router-dom"

const RootLayout = () => {
    return (
        <>
            <div className="h-full w-full">
                <Grid>
                    <Grid item>
                        <NavBar />
                    </Grid>
                    <Grid item style={{ maxHeight: '865px', overflowY: 'auto' }}>
                        <Outlet />
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default RootLayout
