import { Card, FormControl, Grid, InputLabel, MenuItem, Modal, Select, ThemeProvider } from "@mui/material"
import { IconArrowRight } from "@tabler/icons-react"
import { useEffect, useState } from "react";
import { theme_input } from "./ThemeProvide";
import axios from "axios";
import { Toast } from "./Toast";

const AssignJobModal = ({ open, handleClose, employeeData, handleJobsAssigned }) => {

    const [selectedValue, setSelectedValue] = useState(null);

    const [jobs, setJobs] = useState([]);

    const fetchJobs = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/jobs/list");
            setJobs(response.data);
        }
        catch (error) {
            console.log("Error while retrieving jobs' list", error)
        }
    }

    const handleChange = (e) => {
        setSelectedValue(e.target.value)
    }

    useEffect(() => {
        fetchJobs();
    }, [])

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (selectedValue !== null) {
            await axios.put(`http://localhost:8080/api/employee/setJob/${parseInt(employeeData.id, 10)}`,  parseInt(selectedValue, 10) , {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(() => {
                Toast.fire({
                    icon: 'success',
                    title: 'Request submitted successfully'
                });
                setSelectedValue(null);
                handleJobsAssigned(e, employeeData.id);
                handleClose();
            })
            .catch((error) => {
                Toast.fire({
                    icon: "error",
                    title: "Error handling your request"
                });
                setSelectedValue(null);
                handleClose();
                console.log(error);
            })
        }

    }

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >

                <Card
                    className="h-full shadow-sm"
                    style={{
                        position: 'absolute',
                        top: '42%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 640,
                        height: 250
                    }}
                >

                    <Grid container className="h-full w-full px-8 ">

                        <form className="w-full h-full mt-16" onSubmit={(e) => {handleFormSubmit(e)}}>

                            <Grid className="w-full flex items-center">

                                <ThemeProvider theme={theme_input}>

                                    <FormControl fullWidth>
                                        <InputLabel>Choose an option</InputLabel>
                                        <Select
                                            value={selectedValue}
                                            label="Choose an option"
                                            onChange={handleChange}
                                        >

                                            {jobs.map((data) => (
                                                <MenuItem key={parseInt(data.id, 10)} value={parseInt(data.id, 10)}>
                                                    {data.duty}
                                                </MenuItem>
                                            ))}

                                        </Select>
                                    </FormControl>

                                </ThemeProvider>

                            </Grid>

                            <Grid item container xs={12} className="pt-14">

                                <Grid item xs={6} className="flex justify-center place-items-start pe-6">

                                    <button className=" project-btn" onClick={(e) => {e.preventDefault(); handleClose();}}>
                                        C A N C E L
                                    </button>

                                </Grid>

                                <Grid item xs={6} className="flex justify-center place-items-start ps-6">

                                    <button className=" project-btn flex place-content-center" type="submit">
                                        <span className="ps-10"> F I N I S H </span><span className="ps-10 "> <IconArrowRight /> </span>
                                    </button>

                                </Grid>

                            </Grid>

                        </form>

                    </Grid>


                </Card>


            </Modal>
        </>
    )
}

export default AssignJobModal
