import { Box, Container, Paper, TextField, ThemeProvider } from "@mui/material";
import { theme_input } from "./components/ThemeProvide";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {

    const navigate = useNavigate();

    const [userMail, setUserMail] = useState('');

    const handleInputChange = (e, setInput) => {
        e.preventDefault();
        setInput(e.target.value);
    }

    const handleButtonClick = (e) => {
        e.preventDefault();
        if (userMail === 'super.admin@gmail.com') {
            navigate("/")
        }
    }

    return (
        <>

            <div className="h-screen xl:grid xl:grid-cols-12 xl:bg-theme-color-1">
                <div className='flex flex-1 justify-center items-center flex-col py-10 xl:col-span-6 '>

                    <Container>

                        <Box className="pagination f">
                            <Container maxWidth="sm" className=" mt-6 xl:mt-0 text-center py-10 bx-36 bg-stone-100 rounded" sx={{ borderLeftWidth: 10, borderRightWidth: 10, borderBottomWidth: 10, borderColor: 'rgb(245 245 244)' }} >
                                <Paper className=" h-28 w-28 mx-auto mb-32" >

                                    <img src="/assets/images/3045433_tea_office_drink_coffee_mug_icon.png" className="bg-stone-200 w-fit h-fit object-cover border-8 rounded-md border-theme-color-3" />

                                </Paper>

                                <div className=" mb-16 text-3xl ">

                                    <h1 className="ps-5 font-barlow"> P A Y R O L L<span className="mx-10">M A N A G E M E N T</span></h1>

                                </div>

                                <form >
                                    <ThemeProvider theme={theme_input}>
                                        <TextField
                                            id="email"
                                            label="User Mail"
                                            fullWidth
                                            color="primary"
                                            value={userMail}
                                            onChange={(e) => handleInputChange(e, setUserMail)}
                                        />

                                        <div className="my-20"></div>

                                        <TextField
                                            id="password"
                                            type="password"
                                            label="Password"
                                            fullWidth
                                            color="primary"
                                        />

                                    </ThemeProvider>
                                    <div className=" mt-14"></div>
                                    <div className="d-grid gap-2 col-6 mx-auto justify-content-center">

                                        <button onClick={(e) => handleButtonClick(e)} className="font-barlow text-xl px-20 bg-theme-color-3 text-white py-2 hover:bg-white hover:border hover:border-theme-color-2 hover:text-theme-color-2 transition duration-150 ease-in" >S I G N<span className="ms-3">I N</span></button>

                                    </div>
                                </form>
                            </Container>
                        </Box>

                    </Container>

                </div>
                <div className='xl:col-span-6 rounded '>
                    <div className='xl:flex-1 rounded-l-lg overflow-hidden hidden xl:flex '>
                        <Paper className="mt-16" style={{ "height": "825px" }}>
                            <img
                                src="/assets/images/tree-grows-coin-glass-jar-with-copy-space.jpg"
                                alt="logo"
                                className=" bg-no-repeat bg-stone-500 w-full h-screen object-cover rounded-md  " />
                        </Paper>
                    </div>
                </div>
            </div>

        </>
    )
}

export default SignIn
