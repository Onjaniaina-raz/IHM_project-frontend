import { Grid } from "@mui/material"
import { IconMinus, IconPlus } from "@tabler/icons-react"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import JobsModal from "../../components/JobsModal";
import axios from "axios";
import dayjs from "dayjs";

const Employee = () => {

    const navigate = useNavigate();

    const [employees, setEmployees] = useState([]);
    const [jobs, setJobs] = useState([]);

    const [jobsOpen, setJobsOpen] = useState(false);

    const handleJobsClose = () => {
        setJobsOpen(false);
    }

    const numberWithSpaces = (number) => {
        return number.toLocaleString('en-US');
    }

    const handleJobsClick = (e) => {
        e.preventDefault();
        setJobsOpen(true);
    }

    const calculateAge = (birthdate) => {

        const birthDate = dayjs(birthdate);
        const today = dayjs();
        return today.diff(birthDate, "year");
    }

    const fetchEmployee = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/employee/list");
            setEmployees(response.data);
        }
        catch (error) {
            console.log("Error while retrieving employees' list", error)
        }
    }

    const fetchJobs = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/jobs/list");
            setJobs(response.data);
        }
        catch (error) {
            console.log("Error while retrieving jobs' list", error)
        }
    }

    useEffect(() => {
        fetchEmployee();
        fetchJobs();
    }, [])

    return (
        <>
            <Grid className="mx-16 mt-3 cursor-default" >

                <JobsModal open={jobsOpen} handleClose={handleJobsClose} handleJobsSubmit={fetchJobs()} />

                <Grid style={{ paddingTop: '20.5px', paddingBottom: '23.5px' }} className="bg-theme-color-2">
                    <h1 className="font-quicksand text-white font-bold text-xl ps-16 ">EMPLOYEE MANAGEMENT</h1>
                </Grid>

                <Grid container className="w-full pt-7" style={{ height: '762px' }}>

                    <Grid item xs={8} className="w-full pe-6" >
                        <Grid container className="w-full h-fit py-4 ps-10 text-xl text-theme-color-1 font-bold border">

                            <Grid item className="w-full" xs={8}>
                                <p>List of employee</p>
                            </Grid>

                            <Grid item className="w-full font-medium text-black text-regular" xs={3}>
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 pt-0.5 text-theme-color-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    <input className="ml-2 outline-none bg-transparent font-" type="text" name="search" id="search" placeholder="Search..." />
                                </div>
                            </Grid>

                            <Grid item className="w-full flex justify-center" xs={1}>
                                <button className="bg-theme-color-3 text-white px-2 py-2 hover:text-theme-color-2 hover:bg-white border border-theme-color-2 transition duration-200 ease-out" onClick={(e) => { e.preventDefault(); navigate('/employee-assignement') }}>
                                    <IconPlus className="h-5" />
                                </button>
                            </Grid>

                        </Grid>

                        <Grid className="border mt-3 h-full" style={{ maxHeight: "650px", overflowY: 'auto' }}>

                            <Grid className="h-20 w-full px-2 mt-2 ">

                                {employees.map((employee) => (

                                    <Grid container className="w-full h-full border text-xl mt-2" key={employee.id}>
                                        <Grid item className="w-full h-full flex justify-center place-items-center" style={{ width: '10.4%' }}>
                                            <img src={"/assets/uploaded/" + employee.imageUrl} className="w-auto h-16" />
                                        </Grid>

                                        <Grid item className="flex justify-center place-items-center font-barlow" style={{ width: '10.4%' }}>
                                            <p>{employee.fname}</p>
                                        </Grid>

                                        <Grid item className="flex justify-center place-items-center font-barlow" style={{ width: '10.4%' }}>
                                            <p>{employee.lname}</p>
                                        </Grid>

                                        <Grid item className="flex justify-center place-items-center font-barlow" style={{ width: '26.1%' }}>
                                            <p>{employee.email}</p>
                                        </Grid>

                                        <Grid item className="flex justify-center place-items-center" style={{ width: '13.9%' }}>
                                            <p>{calculateAge(employee.birthDate)} years old</p>
                                        </Grid>

                                        <Grid item className="flex justify-center place-items-center font-paypal-sans" style={{ width: '28.8%' }}>

                                            {employee.card === 'paypal' ?
                                                <p className=" border border-paypal-resolution-blue px-20 py-4 text-paypal-resolution-blue relative left-2">PayPal</p>
                                                :
                                                <p className=" border border-visa-lucky-point px-20 py-4 text-visa-lucky-point font-bold relative left-2">V I S A</p>
                                            }

                                        </Grid>

                                    </Grid>

                                ))}

                            </Grid>

                        </Grid>

                    </Grid>

                    <Grid item xs={4} className="w-full h-full border">

                        <Grid container className="w-full h-fit py-4 ps-10 text-xl text-theme-color-1 font-bold border-b">

                            <Grid item className="w-full" xs={5}>
                                <p>List of jobs</p>
                            </Grid>

                            <Grid item className="w-fit font-medium text-black text-regular" style={{ width: '250px' }}>
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 pt-0.5 text-theme-color-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    <input className="ml-2 outline-none bg-transparent w-40" type="text" name="search" id="search" placeholder="Search..." />
                                </div>
                            </Grid>

                            <Grid item className="w-full flex justify-center" xs={1}>
                                <button className="bg-theme-color-3 text-white px-2 py-2 hover:text-theme-color-2 hover:bg-white border border-theme-color-2 transition duration-200 ease-out" onClick={handleJobsClick}>
                                    <IconPlus className="h-5" />
                                </button>
                            </Grid>

                        </Grid>



                        <Grid container className=" w-full ">

                            <Grid item className="h-full w-full px-2">

                                {jobs.map((job) => (

                                    <Grid container className="h-20 w-full mt-2 border flex items-center text-lg font-semibold font-quicksand">

                                        <Grid item xs={7} className="ps-6"><p>{job.duty}</p></Grid>

                                        <Grid item xs={1} className=" text-neutral-400 " > <IconMinus /> </Grid>

                                        <Grid item xs={4} className=" flex h-full justify-end items-center pe-6"> {numberWithSpaces(job.amount)} Ar </Grid>

                                    </Grid>

                                ))}

                            </Grid>

                        </Grid>

                    </Grid>

                </Grid>

            </Grid>
        </>
    )
}

export default Employee
