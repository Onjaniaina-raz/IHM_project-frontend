import { Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EmployeeHistory = () => {

    const navigate = useNavigate();

    const [selectedHistory, setSelectedHistory] = useState([]);

    const [history, setHistory] = useState([]);
    const [employee, setEmployee] = useState([]);

    const numberWithSpaces = (number) => {
        return number.toLocaleString('en-US');
    }

    const fetchHistory = async () => {

        const response = await axios.get(`http://localhost:8080/api/history/list/${parseInt(localStorage.getItem('employeeId'), 10)}`);
        setHistory(response.data)
    }

    const fetchEmployee = async () => {

        const response = await axios.get(`http://localhost:8080/api/employee/list/${parseInt(localStorage.getItem('employeeId'), 10)}`);
        setEmployee(response.data)
    }

    const dateDay = (dateString) => {
        const date = new Date(dateString);
        return `${date.getDate()}`;
    }

    const dateMonth = (dateString) => {
        const date = new Date(dateString);
        return `${date.toLocaleString('default', { month: 'long' })}`;
    }

    const dateYear = (dateString) => {
        const date = new Date(dateString);
        return `${date.getFullYear()}`;
    }

    useEffect(() => {
        fetchHistory();
        fetchEmployee();
    }, [])

    const handleButtonClick = async (e, historyId) => {

        e.preventDefault();

        const response = await axios.get(`http://localhost:8080/api/history/${historyId}`);
        setSelectedHistory(response.data);

    }

    return (
        <>
            <Grid container className="w-full cursor-default">

                <Grid container className="py-5 mx-16 mt-3 w-full bg-theme-color-2">
                    <h1 className="font-quicksand text-white font-bold text-xl ps-16 hover:text-opacity-60 transition-all ease-out duration-150 cursor-pointer" onClick={(e) => { e.preventDefault(); navigate('/salary-management') }}>SALARY MANAGEMENT</h1>
                    <h1 className="relative bottom-0.5 cursor-default"><span className="ps-4 pe-3 text-theme-color-1 font-bold text-2xl">&gt;</span> <span className="font-quicksand font-medium text-white text-xl">Employee History</span> </h1>
                </Grid>

                <Grid container className="w-full mx-16 " style={{ height: '762px' }}>

                    <Grid container className="mt-7">

                        <Grid container className="w-full h-full px-0 py-0">

                            <Grid item xs={12} md={8} className="h-full pe-4">

                                <Grid item className="px-0 h-full ">
                                    <Grid container className="w-full py-2 h-fit text-xl border">

                                        <Grid item container className="w-full" xs={9}>

                                            <Grid item xs={2} className="h-full flex justify-center place-items-center relative right-1" >
                                                <img src={"/assets/uploaded/" + employee.imageUrl} className="w-auto" style={{ height: '43px' }} />
                                            </Grid>

                                            <Grid item xs={4}>
                                                <p className="relative top-2 right-2 font-semibold"> {employee.fname} <span className="ps-1"> {employee.lname} </span></p>
                                            </Grid>

                                        </Grid>

                                        <Grid item xs={3} className="w-full">

                                        </Grid>

                                    </Grid>

                                    <Grid className="border mt-3 h-full" style={{ maxHeight: "660.2px", overflowY: 'auto' }}>

                                        {history.map((historyData) => (

                                            <Grid className="h-20 w-full px-2 mt-2 " key={historyData.id}>

                                                <div className="w-full h-full border text-xl hover:border-theme-color-3 cursor-pointer transition-all ease-out duration-150" onClick={(e) => handleButtonClick(e, historyData.id)}>
                                                    <Grid container className="h-full">

                                                        <Grid item className="flex place-items-center font-barlow font-light justify-center border-e" style={{ width: '17.2%' }}>
                                                            <p>{dateDay(historyData.dateHistory)} {dateMonth(historyData.dateHistory)} {dateYear(historyData.dateHistory)}</p>
                                                        </Grid>

                                                        <Grid item className="flex place-items-center text-center">
                                                            <p className="ps-6" style={{ width: '480px', maxWidth: '480px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}> {historyData.description} </p>
                                                        </Grid>

                                                        <Grid item className="flex place-items-center justify-center text-2xl font-quicksand font-semibold" style={{ width: '22.5%' }}>
                                                            <p> {numberWithSpaces(historyData.amount)} Ar </p>
                                                        </Grid>

                                                        <Grid item className="flex place-items-center justify-center font-barlow " style={{ width: '18.7%' }}>
                                                            {historyData.nature === 'ask' && <p className="relative right-5 text-visa-selective-yellow">ASK</p>}
                                                            {historyData.nature === 'promotion' && <p className="relative right-5 text-green-500">PROMOTION</p>}
                                                            {historyData.nature === 'report' && <p className="relative right-5 text-red-500">REPORT</p>}
                                                        </Grid>

                                                    </Grid>
                                                </div>

                                            </Grid>

                                        ))}

                                    </Grid>

                                </Grid>

                            </Grid>



                            <Grid item xs={12} md={4} className=" relative top-10 border " style={{ height: '540px', fontSize: '21px' }}>

                                {selectedHistory.length !== 0 ? (
                                    <>
                                        <Grid container className="w-full flex text-4xl mt-6 text-center font-semibold  text-white" >
                                            {selectedHistory.nature === 'ask' && <p className="bg-visa-selective-yellow w-full "> A S K </p>}
                                            {selectedHistory.nature === 'promotion' && <p className="bg-green-500 w-full "> P R O M O T I O N </p>}
                                            {selectedHistory.nature === 'report' && <p className="bg-red-500 w-full "> R E P O R T </p>}
                                        </Grid>

                                        <Grid className="w-full h-fit text-center font-barlow py-5 text-4xl font-light mt-10 underline">
                                            <p> {dateDay(selectedHistory.dateHistory)} {dateMonth(selectedHistory.dateHistory)} {dateYear(selectedHistory.dateHistory)} </p>
                                        </Grid>

                                        <Grid className="w-full flex place-items-center px-5 justify-center" style={{ height: '240px' }}>
                                            <p className="text-3xl font-quicksand font-medium"> " {selectedHistory.description} "  </p>
                                        </Grid>

                                        <Grid className="font-quicksand absolute bottom-4 right-3 text-theme-color-3 text-2xl">
                                            <p> {numberWithSpaces(selectedHistory.amount)} Ar </p>
                                        </Grid>
                                    </>
                                ) : (
                                    <>

                                        <Grid>
                                            <div className="text-center font-quicksand text-7xl font-semibold px-2 text-theme-color-1">
                                                <p className="text-center text-7xl pt-10">Here we save </p>
                                                <p className="text-center text-7xl pt-4">every data </p>
                                                <p className="text-center text-7xl pt-4">according to the</p>
                                                <p className="text-center text-7xl pt-4">timeline</p>
                                                <p className="font-barlow font-light text-center text-3xl text-theme-color-2 pt-16 underline ">Notice that the payup is regulated at the end of every month</p>
                                            </div>
                                        </Grid>

                                    </>
                                )}

                            </Grid>

                        </Grid>

                    </Grid>

                </Grid>

            </Grid>
        </>
    )
}

export default EmployeeHistory
