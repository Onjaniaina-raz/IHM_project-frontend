import { Card, Grid, Modal, TextField, ThemeProvider } from "@mui/material";
import { IconArrowRight, IconInfoCircle } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import FileUploader from "./FileUploader";
import { theme_visa } from "./ThemeProvide";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Toast } from "./Toast";

const VisaModal = ({ open, handleClose, handleVisaSubmit, employeeData }) => {

    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [birthDate, setBirthDate] = useState('');

    const [cardNumber, setCardNumber] = useState('');
    const [securityCode, setSecurityCode] = useState('');
    const [buttonClicked, setButtonClicked] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);

    const isCardNumber = cardNumber === '' && buttonClicked;
    const isSecurityCode = securityCode === '' && buttonClicked;

    useEffect(() => {
        setCurrentStep(1);
        setButtonClicked(false);
        setCardNumber('');
        setSecurityCode('');

        if (employeeData) {
            setFname(employeeData.fname);
            setLname(employeeData.lname);
            setEmail(employeeData.email);
            setBirthDate(employeeData.birthDate);
        }

        console.log(employeeData);

    }, [employeeData])

    const handleClick = (e) => {
        e.preventDefault();
        setButtonClicked(true);

        if (currentStep === 1 && cardNumber !== '' && securityCode !== '') {
            setCurrentStep(2);
        }
    }

    const quitClick = () => {
        handleClose();
        setButtonClicked(false);
        setCardNumber('');
        setSecurityCode('');
        setCurrentStep(1);
    }

    const handleInputChange = (e, setInput) => {
        const value = e.target.value;
        setInput(value);
    }

    /* File Uploader */

    const formData = new FormData();

    const handleFileChange = (files: File[]) => {
        formData.append('image', files[0]);
        localStorage.setItem('imageUrl', files[0].name);
    }

    const handleMediaUrlChange = (url: string) => {
        console.log("New media URL:", url);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:8080/api/employee/uploadImage", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        )

            .then(async () => {

                await axios.post("http://localhost:8080/api/employee/save", {
                    fname: fname,
                    lname: lname,
                    email: email,
                    birthDate: birthDate,
                    cardNumber: parseInt(cardNumber, 10),
                    cardPass: parseInt(securityCode, 10),
                    imageUrl: localStorage.getItem('imageUrl'),
                    card: 'visa'
                },
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }

                )

                    .then(() => {
                        Toast.fire({
                            icon: 'success',
                            title: 'New employee saved !'
                        });
                        quitClick();
                        handleVisaSubmit();
                    })
                    .catch((error) => {
                        Toast.fire({
                            icon: "error",
                            title: "Error during exportation"
                        });
                        console.log(error);
                        quitClick();
                    })
            }
            )
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
                    className="rounded-none h-full shadow-sm "
                    style={{
                        position: 'absolute',
                        top: '42%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 640,
                        height: 510,
                        display: 'flex',
                        flexDirection: 'row'
                    }}
                >

                    <Grid container className="h-full w-full px-8 pt-2">
                        {currentStep === 1 ?
                            <Grid container xs={12} className="flex w-full h-fit">
                                <p className="font-visa-dialect font-semibold text-xl absolute top-12">Credit card</p>
                                <img src="/assets/images/visa-inverted_82058.png" className="w-auto h-16 mx-auto absolute end-2.5" />
                            </Grid>
                            : <p></p>
                        }


                        <Grid container xs={12} className=" w-full mt-10" style={{ height: '421px' }}>

                            <form onSubmit={(e) => {
                                handleFormSubmit(e);
                            }}
                                className="w-full">

                                <ThemeProvider theme={theme_visa}>

                                    {/* Current Step 1 */}

                                    <div style={{ flex: 1 }}>
                                        <div className="px-6" style={{ position: 'absolute', left: 0, transition: 'transform 0.3s', transform: `translateX(${currentStep === 1 ? '0' : '-100%'})`, width: '100%' }}>

                                            <Grid item xs={12} className="pt-14">

                                                <TextField
                                                    fullWidth
                                                    label="Card Number"
                                                    value={cardNumber}
                                                    onChange={(e) => {
                                                        handleInputChange(e, setCardNumber)
                                                    }}
                                                    color={isCardNumber ? 'error' : 'primary'}
                                                />
                                                <Grid container className="relative top-2 ">
                                                    <Grid item className="pe-2">
                                                        {isCardNumber ? <IconInfoCircle className="h-5 text-red-500" /> : <span className="text-gray-400 "> <IconInfoCircle className="h-5" /></span>}
                                                    </Grid>
                                                    <Grid item className="font-paypal-sans text-sm ">
                                                        {isCardNumber ? <p className="text-red-500">Must contain only numbers of a length equals to 16</p> : <p className="text-gray-400">Must contain only numbers of a length equals to 16</p>}
                                                    </Grid>
                                                </Grid>

                                            </Grid>

                                            <Grid item xs={12} className="pt-16">

                                                <TextField
                                                    fullWidth
                                                    label="CVV"
                                                    color={isSecurityCode ? 'error' : 'primary'}
                                                    value={securityCode}
                                                    onChange={(e) => {
                                                        handleInputChange(e, setSecurityCode)
                                                    }}
                                                />

                                                <Grid container className="relative top-2 ">
                                                    <Grid item className="pe-2">
                                                        {isSecurityCode ? <IconInfoCircle className="h-5 text-red-500" /> : <span className="text-gray-400 "> <IconInfoCircle className="h-5" /></span>}
                                                    </Grid>
                                                    <Grid item className="font-paypal-sans text-sm ">
                                                        {isSecurityCode ? <p className="text-red-500">Must contain only numbers (3 characters)</p> : <p className="text-gray-400">Must contain only numbers (3 characters)</p>}
                                                    </Grid>
                                                </Grid>

                                            </Grid>

                                            <Grid container xs={12} className="flex justify-center pt-10">

                                                <Grid item xs={12} className="text-white font-visa-dialect font-extrabold">
                                                    <button className=" visa-btn bg-visa-selective-yellow py-3 text-lg" onClick={handleClick}>N E X T</button>
                                                    <button className="visa-btn bg-visa-lucky-point mt-4 py-2 " onClick={quitClick}>A b o r t</button>
                                                </Grid>

                                            </Grid>

                                        </div>
                                    </div>

                                    {/* Step 2 */}

                                    <div style={{ flex: 1 }}>
                                        <div className="h-fit" style={{ position: 'absolute', left: 0, top: 0, transition: 'transform 0.3s', transform: `translateX(${currentStep === 2 ? '0' : '100%'})`, width: '100%' }}>

                                            <p className="font-quicksand text-2xl font-semibold ps-6 text-theme-color-3 mt-6 underline ">You've reached the last step</p>

                                            <Grid container className="w-full flex justify-center place-items-end" style={{ height: ' 320px ' }}>
                                                <Grid xs={7} className="mt-10 border border-theme-color-1 py-6"  >

                                                    <FileUploader
                                                        fieldChange={handleFileChange}
                                                        setMediaUrl={handleMediaUrlChange}
                                                    />

                                                </Grid>
                                            </Grid>

                                            <Grid container className="w-full mt-16" style={{ height: '70px' }}>

                                                <Grid item xs={6} className="flex justify-center place-items-start px-6">

                                                    <button className=" project-btn ">
                                                        S K I P
                                                    </button>

                                                </Grid>

                                                <Grid item xs={6} className="flex justify-center place-items-start px-6">

                                                    <button className=" project-btn flex place-content-center" type="submit">
                                                        <span className="ps-10"> F I N I S H </span><span className="ps-10 "> <IconArrowRight /> </span>
                                                    </button>

                                                </Grid>

                                            </Grid>

                                        </div>
                                    </div>

                                </ThemeProvider>
                            </form>
                        </Grid>

                    </Grid>

                </Card>

            </Modal>
        </>
    )
}

export default VisaModal
