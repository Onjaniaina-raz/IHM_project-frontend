import { Card, Grid, InputAdornment, Modal, TextField, ThemeProvider } from "@mui/material";
import { IconArrowRight, IconInfoCircle } from "@tabler/icons-react";
import { useState } from "react";
import { theme_input } from "./ThemeProvide";
import axios from "axios";
import { Toast } from "./Toast";

const AskModal = ({ open, handleClose, employeeData, handleAskSubmit }) => {

    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [buttonClicked, setButtonClicked] = useState(false);

    const isAmountEmpty = amount === '' && buttonClicked && amount < employeeData.jobs.amount;
    const isDescriptionEmpty = description === '' && buttonClicked;

    const dateDay = (dateString: string = new Date().toISOString()) => {
        const date = new Date(dateString);
        return `${date.getDate()}`
    }

    const dateMonth = (dateString: string = new Date().toISOString()) => {
        const date = new Date(dateString);
        return `${date.toLocaleString('default', { month: 'long' })}`;
    }

    const dateYear = (dateString: string = new Date().toISOString()) => {
        const date = new Date(dateString);
        return `${date.getFullYear()}`;
    }

    const handleInputChange = (e, setInput) => {
        const value = e.target.value;
        setInput(value);
    }

    const numberWithSpaces = (number) => {
        return number.toLocaleString('en-US');
    }

    const quitClick = () => {
        handleClose();
        setAmount('');
        setDescription('');
        setButtonClicked(false);
    }

    const handleClick = (e) => {
        e.preventDefault();
        setButtonClicked(true);
        if (!isAmountEmpty && !isAmountEmpty) {
            handleFormSubmit(e)
        }
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        await axios.post("http://localhost:8080/api/history/save", {
            nature: 'ask',
            description: description,
            amount: amount,
            employeeId: employeeData.id
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
                    title: 'Request submitted successfully'
                });
                quitClick();
                handleAskSubmit(e, employeeData.id);
            })
            .catch((error) => {
                Toast.fire({
                    icon: "error",
                    title: "Error handling your request"
                });
                console.log(error);
                quitClick();
            })
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
                        width: 700,
                        height: 540
                    }}
                >

                    <Grid className="h-full w-full">

                        <Grid xs={12} className="h-fit py-6 text-center font-barlow font-semibold text-theme-color-3 text-3xl">
                            <p>Register <span className="px-2"> the </span> employee's <span className="px-2"> advance ask </span> ! </p>
                        </Grid>

                        <Grid container xs={12} className=" w-full px-8 font-quicksand h-full" >

                            <form className="w-full" onSubmit={(e) => {handleFormSubmit(e)}}>

                                <ThemeProvider theme={theme_input}>

                                    <Grid item xs={12} className=" text-gray-700 pt-8 underline">
                                        <p >New request on date {dateDay()} {dateMonth()} {dateYear()} </p>
                                    </Grid>

                                    <Grid item xs={12} className="pt-12">

                                        <TextField
                                            fullWidth
                                            multiline
                                            value={description}
                                            onChange={(e) => { handleInputChange(e, setDescription) }}
                                            label="What is the advance asked for?"
                                            color={isDescriptionEmpty ? 'error' : 'primary'}
                                        />

                                        <Grid container className="relative top-2 text-red-500">

                                            <Grid item className="pe-2">
                                                {isDescriptionEmpty ? <IconInfoCircle /> : <span> <IconInfoCircle className="text-white" /> </span>}
                                            </Grid>

                                            <Grid item>
                                                {isDescriptionEmpty ? <p className="relative top-0.5">Request for an advance ask must be filled</p> : <span className="text-white cursor-default">`</span>}
                                            </Grid>

                                        </Grid>

                                    </Grid>

                                    <Grid item xs={12} className="pt-16">

                                        <TextField
                                            fullWidth
                                            label="Amount"
                                            value={amount}
                                            onChange={(e) => { handleInputChange(e, setAmount) }}
                                            color={isAmountEmpty ? 'error' : 'primary'}
                                            InputProps={{
                                                endAdornment:
                                                    <InputAdornment position='end'>
                                                        <p className='font-semibold pe-4 text-theme-color-3'> Ar </p>
                                                    </InputAdornment>
                                            }}
                                        />

                                        <Grid container className="relative top-2 text-red-500">

                                            <Grid item className="pe-2">
                                                {isAmountEmpty ? <IconInfoCircle /> : <span> <IconInfoCircle className="text-gray-500" /> </span>}
                                            </Grid>

                                            <Grid item>
                                                {isAmountEmpty ? <p className="relative top-0.5" >Amount cannot reach below {numberWithSpaces(2000000)} Ar</p> : <p className="relative top-0.5 text-gray-500" >Amount cannot reach below {numberWithSpaces(2000000)} Ar</p>}
                                            </Grid>

                                        </Grid>

                                    </Grid>

                                    <Grid item container xs={12} className="pt-14">

                                        <Grid item xs={6} className="flex justify-center place-items-start pe-6">

                                            <button className=" project-btn " onClick={quitClick}>
                                                C A N C E L
                                            </button>

                                        </Grid>

                                        <Grid item xs={6} className="flex justify-center place-items-start ps-6">

                                            <button className=" project-btn flex place-content-center" type="submit" onClick={handleClick}>
                                                <span className="ps-10"> F I N I S H </span><span className="ps-10 "> <IconArrowRight /> </span>
                                            </button>

                                        </Grid>

                                    </Grid>

                                </ThemeProvider>

                            </form>

                        </Grid>

                    </Grid>

                </Card>

            </Modal>
        </>
    )
}

export default AskModal
