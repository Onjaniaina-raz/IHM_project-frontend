import { Box, Grid, Paper } from "@mui/material"
import { useNavigate } from "react-router-dom";

const Home = () => {

    const navigate = useNavigate();

    return (
        <>
            <div className="h-full w-full cursor-default">
                <Grid container>
                    <Grid container className="px-24 bg-theme-color-3 pt-10">

                        <Grid item xs={12} sm={6} >

                            <h1 className="text-theme-color-2 font-barlow font-bold text-7xl pt-16 text-center pe-20">MAKE PAYROLL </h1>
                            <h1 className="text-white font-quicksand text-4xl pt-12 text-center ps-20">PROCESSING EASY ,</h1>
                            <h1 className="text-theme-color-3 font-quicksand text-lg text-center ps-16 mt-16 z-50 shadow-sm shadow-theme-color-1 bg-white">
                                W
                                <span className="ps-1"> i </span>
                                <span className="ps-1"> t </span>
                                <span className="ps-1"> h </span>
                                <span className="px-4"> o
                                    <span className="ps-1"> u </span>
                                    <span className="ps-1"> r </span></span>
                                a
                                <span className="ps-1"> p </span>
                                <span className="ps-1"> p </span>
                                <span className="ps-1"> s </span>
                            </h1>

                        </Grid>

                        <Grid item xs={12} sm={6} className="px-8 pt-6 mx-auto bg-white" >
                            <Paper className="border-white " style={{ marginTop: '1px', marginBottom: '1px' }}>
                                <img src="/assets/images/stacks-coins-arranged-bar-graph.jpg" className=" object-cover h-96 w-full" />
                            </Paper>
                        </Grid>
                    </Grid>

                    <Grid container>
                        <Grid item xs={12} className="text-center pt-32">
                            <h1 className="font-quicksand font-bold text-5xl"> H o w <span className="px-5"> a b o u t </span> t h e <span className="px-5"> a p p </span> ?</h1>
                        </Grid>

                        <Grid item xs={12} className=" px-48 pt-20">

                            <Grid className="pb-24 font-barlow text-xl font-light">
                                <p className="px-12"> <span className="ps-10">In</span> this app, we manage to follow every payup of each employee related to our Entreprise. This app is designed make the process easier and for the administrator to save easily every datas but also to follow them well.<span className="ps-1"> We've</span> implemented some things you might need for <span className="ps-1">. . .</span> </p>
                            </Grid>

                            <Grid container >

                                <Grid item xs={8} sm={4} className="px-12">
                                    <Box className="w-full mx-auto relative ">
                                        <img src="/assets/images/close-up-businessman-s-hand-typing-laptop.jpg" className=" object-cover h-60 w-full " />
                                        <div className=" pt-10 pb-2 px-5 border">
                                            <Grid container>
                                                <Grid item xs={12} className="pb-2 font-barlow text-lg">
                                                    This section was built to manage well our employees
                                                </Grid>

                                                <button onClick={(e) => { e.preventDefault(); navigate('/employee-management') }} className="view-more-btn">View More</button>
                                            </Grid>
                                        </div>

                                        <div className="card-title" >
                                            Employee Management
                                        </div>

                                    </Box>
                                </Grid>

                                <Grid item xs={8} sm={4} className="px-12">
                                    <Box className="w-full mx-auto relative ">
                                        <img src="/assets/images/top-view-payroll-concept-with-cash.jpg" className=" object-cover h-60 w-full " />
                                        <div className=" pt-10 pb-2 px-5 border">
                                            <Grid container>
                                                <Grid item xs={12} className="pb-2 font-barlow text-lg">
                                                    Also, to manage well our employee and to relate to their payment and rolls
                                                </Grid>

                                                <button onClick={(e) => { e.preventDefault(); navigate('/salary-management') }} className="view-more-btn">View More</button>
                                            </Grid>
                                        </div>

                                        <div className="card-title" >
                                            Salary Management
                                        </div>

                                    </Box>
                                </Grid>

                                <Grid item xs={8} sm={4} className="px-12">
                                    <Box className="w-full mx-auto relative ">
                                        <img src="/assets/images/business-man-financial-inspector-secretary-making-report-calculating-checking-balance-internal-revenue-service-inspector-checking-document-audit-concept.jpg" className=" object-cover h-60 w-full " />
                                        <div className=" pt-10 pb-2 px-5 border">
                                            <Grid container>
                                                <Grid item xs={12} className="pb-2 font-barlow text-lg">
                                                    In this part, we manage to review our datas with a better much visuality
                                                </Grid>

                                                <a href="#" className="view-more-btn">View More</a>
                                            </Grid>
                                        </div>

                                        <div className="card-title" >
                                            Review Statistics
                                        </div>

                                    </Box>
                                </Grid>

                            </Grid>

                            <Grid item xs={12} className="text-center pt-24 pb-20 font-barlow text-xl font-light">
                                <p> <span className="ps-10">Notice</span> that nothing isn't related to how the process makes the pay. This app is only dedicated to follow the salary management but the pay is regulated somewhere else.</p>
                            </Grid>

                        </Grid>

                        <Grid className="w-full h-24 bg-theme-color-3 flex items-center justify-center text-theme-color-1 text-xl">
                            <p>&#169; <span className="ps-2">All Rights Reserved</span></p>
                        </Grid>

                    </Grid>

                </Grid>
            </div>
        </>
    )
}

export default Home
