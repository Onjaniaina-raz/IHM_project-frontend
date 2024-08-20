import { Grid, TextField, ThemeProvider } from "@mui/material";
import { IconInfoCircle } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PaypalModal from "../../components/PaypalModal";
import { theme_input } from "../../components/ThemeProvide";
import VisaModal from "../../components/VisaModal";

const AssignEmployee = () => {

    const [paypalOpen, setPaypalOpen] = useState(false);
    const [visaOpen, setVisaOpen] = useState(false);

    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [buttonClicked, setButtonClicked] = useState(false);

    const navigate = useNavigate();

    const handlePaypalClose = () => {
        setPaypalOpen(false);
    }

    const handleVisaClose = () => {
        setVisaOpen(false);
    }

    const handleInputChange = (e, setInput) => {
        const value = e.target.value;
        setInput(value);
    }

    const handlePaypalClick = (e) => {
        e.preventDefault();
        setButtonClicked(true);

        if (fname !== '' && lname !== '' && email !== '' && birthDate !== '') {
            setPaypalOpen(true);
        }
    }

    const handleVisaClick = (e) => {
        e.preventDefault();
        setButtonClicked(true);

        if (fname !== '' && lname !== '' && email !== '' && birthDate !== '') {
            setVisaOpen(true);
        }
    }

    const handleModalSubmit = () => {
        setFname('');
        setLname('');
        setEmail('');
        setBirthDate('');
        setButtonClicked(false);
    } 

    const isFnameEmpty = fname === '' && buttonClicked;
    const isLnameEmpty = lname === '' && buttonClicked;
    const isEmailEmpty = email === '' && buttonClicked;
    const isBirthDateEmpty = birthDate === '' && buttonClicked;

    const employeeDatas = {
        fname: fname,
        lname: lname,
        email: email,
        birthDate: birthDate
    }

    return (
        <>

            <PaypalModal open={paypalOpen} handleClose={handlePaypalClose} employeeData={employeeDatas} handlePaypalSubmit={handleModalSubmit}/>
            <VisaModal open={visaOpen} handleClose={handleVisaClose} employeeData={employeeDatas} handleVisaSubmit={handleModalSubmit}/>

            <Grid container className="w-full">

                <Grid container className="py-5 mx-16 mt-3 w-full bg-theme-color-2">
                    <h1 className="font-quicksand text-white font-bold text-xl ps-16 hover:text-opacity-60 transition-all ease-out duration-150 cursor-pointer" onClick={(e) => {e.preventDefault(); navigate('/employee-management')}}>EMPLOYEE MANAGEMENT</h1>
                    <h1 className="relative bottom-0.5 cursor-default"><span className="ps-4 pe-3 text-theme-color-1 font-bold text-2xl">&gt;</span> <span className="font-quicksand font-medium text-white text-xl">Assign Employee</span> </h1>
                </Grid>

                <Grid container className="w-full mx-16 mt-7" style={{ height: '742px' }}>
                    <Grid item xs={12} md={4} className="pb-20 relative top-16 text-center font-quicksand text-7xl font-semibold text-theme-color-1 border h-fit bg-opacity-65 text-opacity-100">
                        <h1 className="pt-20 ">WORKING</h1>
                        <h1 className="py-14">WITH</h1>
                        <h1>THE COMPANY,</h1>

                        <h1 className="font-barlow ps-12 text-start text-theme-color-3 text-4xl pt-12 font-light"> to manage well our employee . . .</h1>

                    </Grid>

                    <Grid item xs={12} md={8} className="font-quicksand text-2xl font-semibold ps-6 text-theme-color-3 h-fit bg-opacity-65 text-opacity-100">
                        <Grid item className="border px-12" style={{ maxHeight: '715px', overflowY: 'auto' }}>

                            <h1 className="pt-12 underline ">Everything about the Employee ...</h1>

                            <form>
                                <ThemeProvider theme={theme_input}>
                                    <Grid container className="pt-16">

                                        <Grid item xs={6} className="pe-6">
                                            <TextField
                                                fullWidth
                                                label="First Name"
                                                value={fname}
                                                color={isFnameEmpty ? 'error' : 'primary'}
                                                onChange={(e) => {
                                                    handleInputChange(e, setFname);
                                                }}
                                            />

                                            <Grid container className="relative top-2">
                                                <Grid item className="text-red-500 pe-4">
                                                    {isFnameEmpty ? <IconInfoCircle /> : <span className="text-white"> <IconInfoCircle /></span>}
                                                </Grid>
                                                <Grid item>
                                                    {isFnameEmpty ? <p className=" text-red-500 relative bottom-0.5" style={{ fontSize: '18px' }}> First Name field cannot be empty</p> : <p className=" text-white relative bottom-0.5 cursor-default" style={{ fontSize: '18px' }}>.</p>}
                                                </Grid>
                                            </Grid>

                                        </Grid>

                                        <Grid item xs={6} className="ps-6">
                                            <TextField
                                                label="Last Name"
                                                fullWidth
                                                value={lname}
                                                color={isLnameEmpty ? 'error' : 'primary'}
                                                onChange={(e) => {
                                                    handleInputChange(e, setLname);
                                                }}
                                            />

                                            <Grid container className="relative top-2">
                                                <Grid item className="text-red-500 pe-4">
                                                    {isLnameEmpty ? <IconInfoCircle /> : <span className="text-white"> <IconInfoCircle /></span>}
                                                </Grid>
                                                <Grid item>
                                                    {isLnameEmpty ? <p className=" text-red-500 relative bottom-0.5" style={{ fontSize: '18px' }}> Last Name field cannot be empty</p> : <p className=" text-white relative bottom-0.5 cursor-default" style={{ fontSize: '18px' }}>.</p>}
                                                </Grid>
                                            </Grid>

                                        </Grid>

                                    </Grid>

                                    <Grid container className="pt-20 pb-16">

                                        <Grid item xs={6} className="pe-6">
                                            <TextField
                                                fullWidth
                                                label="Email"
                                                type="email"
                                                value={email}
                                                onChange={(e) => {
                                                    handleInputChange(e, setEmail);
                                                }}
                                                color={isEmailEmpty ? 'error' : 'primary'}
                                            />

                                            <Grid container className="relative top-2">
                                                <Grid item className="text-red-500 pe-4">
                                                    {isEmailEmpty ? <IconInfoCircle /> : <span className="text-white"> <IconInfoCircle /></span>}
                                                </Grid>
                                                <Grid item>
                                                    {isEmailEmpty ? <p className=" text-red-500 relative bottom-0.5" style={{ fontSize: '18px' }}> Contact field cannot be empty</p> : <p className=" text-white relative bottom-0.5 cursor-default" style={{ fontSize: '18px' }}>.</p>}
                                                </Grid>
                                            </Grid>

                                        </Grid>

                                        <Grid item xs={6} className="ps-6">
                                            <TextField
                                                fullWidth
                                                type="date"
                                                value={birthDate}
                                                color={isBirthDateEmpty ? 'error' : 'primary'}
                                                onChange={(e) => {
                                                    handleInputChange(e, setBirthDate);
                                                }}
                                            />

                                            <Grid container className="relative top-2">
                                                <Grid item className="text-red-500 pe-4">
                                                    {isBirthDateEmpty ? <IconInfoCircle /> : <span className="text-white"> <IconInfoCircle /></span>}
                                                </Grid>
                                                <Grid item>
                                                    {isBirthDateEmpty ? <p className=" text-red-500 relative bottom-0.5" style={{ fontSize: '18px' }}> Date of Birth field cannot be empty</p> : <p className=" text-white relative bottom-0.5 cursor-default" style={{ fontSize: '18px' }}>.</p>}
                                                </Grid>
                                            </Grid>

                                        </Grid>

                                    </Grid>


                                </ThemeProvider>

                                <h1 className="pt-3 underline ">Choose to get paid with ...</h1>

                                <Grid container className="pt-16 px-20 pb-6">

                                    <Grid item xs={12} lg={6} className="flex justify-center">
                                        <button type="submit" className="logo-btn px-8" onClick={handlePaypalClick}>
                                            <img src="/assets/images/PayPal-Logo.png" className=" h-28 w-auto mx-auto" />
                                        </button>
                                    </Grid>

                                    <Grid item xs={12} lg={6} className="flex justify-center">
                                        <button type="submit" className="logo-btn px-16" onClick={handleVisaClick}>
                                            <img src="/assets/images/visa-Logo.png" className=" h-16 w-auto mx-auto" />
                                        </button>
                                    </Grid>

                                </Grid>

                            </form>
                        </Grid>
                    </Grid>

                </Grid>

            </Grid >
        </>
    )
}

export default AssignEmployee
