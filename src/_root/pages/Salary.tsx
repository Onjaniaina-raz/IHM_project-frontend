import { Grid } from "@mui/material"
import { IconInfoCircle } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import AskModal from "../../components/AskModal";
import PromotionModal from "../../components/PromotionModal";
import ReportModal from "../../components/ReportModal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AssignJobModal from "../../components/AssignJobModal";

const Salary = () => {

  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);

  const [selectedEmployee, setSelectedEmployee] = useState([]);

  const [ask, setAsk] = useState([]);
  const [promotion, setPromotion] = useState([]);
  const [report, setReport] = useState([]);

  const [askOpen, setAskOpen] = useState(false);
  const [promotionOpen, setPromotionOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);

  const [jobsOpen, setJobsOpen] = useState(false);

  const handleJobsClose = () => {
    setJobsOpen(false);
  }
 
  const handleAskClose = () => {
    setAskOpen(false);
  }

  const handlePromotionClose = () => {
    setPromotionOpen(false);
  }

  const handleReportClose = () => {
    setReportOpen(false);
  }

  const handleAskClick = (e) => {
    e.preventDefault();
    setAskOpen(true);
  }

  const handlePromotionClick = (e) => {
    e.preventDefault();
    setPromotionOpen(true);
  }

  const handleReportClick = (e) => {
    e.preventDefault();
    setReportOpen(true);
  }

  const handleJobsClick = (e) => {
    e.preventDefault();
    setJobsOpen(true);
  }

  const numberWithSpaces = (number) => {
    return number.toLocaleString('en-US');
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

  useEffect(() => {
    fetchEmployee();
    localStorage.clear();
  }, []);

  const handleInfoClicked = async (e, employeeId) => {

    e.preventDefault();

    try {

      const [response1, response2, response3, response4] = await Promise.all([

        axios.get(`http://localhost:8080/api/employee/list/${parseInt(employeeId, 10)}`),
        axios.get(`http://localhost:8080/api/history/list/ask/${parseInt(employeeId, 10)}`),
        axios.get(`http://localhost:8080/api/history/list/promotion/${parseInt(employeeId, 10)}`),
        axios.get(`http://localhost:8080/api/history/list/report/${parseInt(employeeId, 10)}`)

      ]);

      setSelectedEmployee(response1.data);
      setAsk(response2.data);
      setPromotion(response3.data);
      setReport(response4.data)

    } catch (error) {

      console.error('Error while fetching data:', error);

    }
  }


  return (
    <>

      <AskModal open={askOpen} handleClose={handleAskClose} employeeData={selectedEmployee} handleAskSubmit={(e) => handleInfoClicked(e, selectedEmployee.id)}/>
      <PromotionModal open={promotionOpen} handleClose={handlePromotionClose} employeeData={selectedEmployee} handlePromotionSubmit={(e) => handleInfoClicked(e, selectedEmployee.id)}/>
      <ReportModal open={reportOpen} handleClose={handleReportClose} employeeData={selectedEmployee} handleReportSubmit={(e) => handleInfoClicked(e, selectedEmployee.id)}/>

      <AssignJobModal open={jobsOpen} handleClose={handleJobsClose} employeeData={selectedEmployee} handleJobsAssigned={(e) => {handleInfoClicked(e, selectedEmployee.id); fetchEmployee()}}/>

      <Grid className="mx-16 mt-3 cursor-default">

        <Grid style={{ paddingTop: '20.5px', paddingBottom: '23.5px' }} className="bg-theme-color-2">
          <h1 className="font-quicksand text-white font-bold text-xl ps-16 ">SALARY MANAGEMENT</h1>
        </Grid>

        <Grid container className="w-full pt-7 " style={{ height: '762px' }}>

          <Grid container className="w-full h-full">

            <Grid item xs={12} md={8} className="h-full pe-4">

              <Grid item className="px-0 h-full ">

                <Grid container className="w-full h-fit py-4 ps-10 text-xl text-theme-color-1 font-bold border">

                  <Grid item className="w-full" xs={9}>
                    <p>List of employee</p>
                  </Grid>

                  <Grid item className="w-full font-medium text-black text-regular" xs={3}>
                    <div className="flex items-center justify-end">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 pt-0.5 text-theme-color-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <input className="ml-2 outline-none bg-transparent font-" type="text" name="search" id="search" placeholder="Search..." />
                    </div>
                  </Grid>

                </Grid>

                <Grid className="border mt-3 h-full" style={{ maxHeight: "660.2px", overflowY: 'auto' }}>

                  {employees.map((employee) => (

                    <Grid xs={12} className="h-20 w-full px-2 mt-2 " key={employee.id}>

                      <Grid container className="w-full h-full border text-xl ">
                        <Grid item className=" h-full flex justify-center place-items-center" style={{ width: '14%' }}>
                          <img src={"/assets/uploaded/" + employee.imageUrl} className="w-auto h-16" />
                        </Grid>

                        <Grid item className="flex justify-center place-items-center font-barlow" style={{ width: '13%' }}>
                          <p>{employee.fname}</p>
                        </Grid>

                        <Grid item className="flex justify-center place-items-center font-barlow" style={{ width: '13%' }}>
                          <p>{employee.lname}</p>
                        </Grid>

                        <Grid item className="flex justify-center place-items-center font-quicksand font-semibold" style={{ width: '30%' }}>
                          {employee.jobs ? (<p>{employee.jobs.duty}</p>) : (<p className="underline font-light"> Not Assigned yet</p>)}
                        </Grid>

                        <Grid item className="flex justify-center place-items-center font-semibold font-quicksand" style={{ width: '18%' }}>
                          {employee.jobs ? (<p> {numberWithSpaces(employee.jobs.amount)} Ar </p>) : (<p> - </p>)}
                        </Grid>

                        <Grid item className="flex justify-center place-items-center font-semibold font-quicksand" style={{ width: '130px' }}>
                          <IconInfoCircle className="transform hover:scale-110 transtion-all duration-150 ease-in cursor-pointer text-theme-color-1 hover:text-theme-color-3" style={{ height: '30px' }} onClick={(e) => { handleInfoClicked(e, employee.id) }} />
                        </Grid>

                      </Grid>

                    </Grid>

                  ))}

                </Grid>

              </Grid>

            </Grid>

            <Grid xs={12} md={4} className=" relative top-10 border " style={{ height: '540px', fontSize: '21px' }}>

              {selectedEmployee.length !== 0 ?
                (
                  <>

                    <Grid className="flex justify-center place-items-center w-full h-fit pt-6" >
                      <img src={"/assets/uploaded/" + selectedEmployee.imageUrl} className="w-auto" style={{ height: '120px' }} />
                    </Grid>

                    <Grid className="flex justify-center place-items-center w-full h-fit py-6" >
                      <p className="font-barlow text-3xl font-semibold">{selectedEmployee.fname}<span className="ps-2">{selectedEmployee.lname}</span> </p>
                    </Grid>

                    <Grid container className="flex w-full h-fit pt-6 font-quicksand px-12 text-center" >
                      <Grid item xs={12}>
                        <p style={{ fontSize: '23px' }}>
                          {selectedEmployee.jobs ?
                            (
                              <>
                                <span className="underline cursor-pointer hover:font-semibold transition-all duration-100 ease-in" onClick={(e) => {handleJobsClick(e)}}> {selectedEmployee.jobs.duty} </span>
                                <span className="ps-3 font-semibold font-barlow" > ( {numberWithSpaces(selectedEmployee.jobs.amount)} Ar ) </span>
                              </>
                            ) : (
                              <>
                                <span className="underline cursor-pointer hover:font-semibold transition-all duration-100 ease-in" onClick={(e) => {handleJobsClick(e)}}> Not Assigned </span>
                                <span className="ps-3 font-semibold font-barlow" > ( 0 Ar ) </span>
                              </>
                            )
                          }
                        </p>
                      </Grid>
                    </Grid>

                    <Grid container className="flex w-full h-fit pt-20 px-6" >

                      <Grid item className="w-fit font-quicksand font-light text-theme-color-2 underline pe-6">
                        <p> Overview . . . </p>
                      </Grid>

                      <Grid className="flex justify-between">

                        <Grid item className="w-fit relative top-1">
                          <p style={{ fontSize: '18px' }}> <span className=" border-4 border-visa-selective-yellow bg-visa-selective-yellow text-white font-semibold rounded-full px-2" style={{ fontSize: '16px' }}>{ask.nature}</span> <span className="ps-2 cursor-pointer hover:text-visa-selective-yellow transition-all duration-150 hover:underline" onClick={handleAskClick}>Ask</span> </p>
                        </Grid>

                        <Grid item className="px-8 relative top-1 w-fit">
                          <p style={{ fontSize: '18px' }}> <span className=" border-4 rounded-full bg-green-500 border-green-500 px-2 text-white font-semibold" style={{ fontSize: '16px' }}>{promotion.nature}</span> <span className="ps-2 transition-all duration-150 hover:underline cursor-pointer hover:text-green-500" onClick={handlePromotionClick}>Promotion</span> </p>
                        </Grid>

                        <Grid item className=" relative top-1 w-fit">
                          <p style={{ fontSize: '18px' }}> <span className=" border-4 rounded-full bg-red-500 border-red-500 px-2 text-white font-semibold" style={{ fontSize: '16px' }}>{report.nature}</span> <span className="ps-2 transition-all duration-150 hover:underline cursor-pointer hover:text-red-500" onClick={handleReportClick}>Report</span> </p>
                        </Grid>

                      </Grid>

                    </Grid>

                    <Grid container className="mt-9 h-20 font-semibold px-6 font-quicksand flex place-items-end">

                      <Grid item xs={8}>
                        {selectedEmployee.jobs ? (
                          <p><span className="font-light">Total salary</span> <span className="ps-2 pe-3"> : </span> {numberWithSpaces((selectedEmployee.jobs.amount+promotion.total)-(ask.total+report.total))} Ar </p>
                        ) : (
                          <p><span className="font-light">Total salary</span> <span className="ps-2 pe-3"> : </span> {<span> - </span> && numberWithSpaces((promotion.total-(ask.total+report.total)))} Ar </p>
                        )}
                        
                      </Grid>

                      <Grid item xs={4}>
                        <button onClick={(e) => { e.preventDefault(); navigate('/salary-employee-history'); localStorage.setItem('employeeId', selectedEmployee.id) }} className="font-sans text-lg border border-theme-color-1 px-4 py-2 ms-8 mt-2 text-theme-color-1 hover:text-white hover:bg-theme-color-1 transition duration-200 ease-out hover:border-theme-color-1">View Details</button>
                      </Grid>

                    </Grid>

                  </>
                ) : (
                  <>
                    <div className="text-center font-quicksand text-7xl font-semibold text-theme-color-1">
                      <h1 className="pt-24 ">EVERYTHING</h1>
                      <h1 className="py-14">ABOUT</h1>
                      <h1 >THE EMPLOYEE</h1>
                    </div>
                  </>
                )
              }

            </Grid>

          </Grid>

        </Grid>

      </Grid>
    </>
  )
}

export default Salary
