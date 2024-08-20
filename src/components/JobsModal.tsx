import { Card, Grid, InputAdornment, Modal, TextField, ThemeProvider } from '@mui/material'
import { IconArrowRight, IconInfoCircle } from '@tabler/icons-react'
import { theme_input } from './ThemeProvide'
import { useState } from 'react'
import axios from 'axios'
import { Toast } from './Toast'

const JobsModal = ({ open, handleClose, handleJobsSubmit }) => {

  const [jobs, setJobs] = useState('');
  const [amount, setAmount] = useState('');
  const [buttonClicked, setButtonClicked] = useState(false);

  const isJobsEmpty = jobs === '' && buttonClicked;
  const isAmountEmpty = amount === '' && buttonClicked;

  const handleInputChange = (e, setInput) => {
    const value = e.target.value;
    setInput(value);
  }

  const quitClick = () => {
    handleClose();
    setJobs('');
    setAmount('');
    setButtonClicked(false);
  }

  const handleClick = (e) => {
    e.preventDefault();
    setButtonClicked(true);

    if (jobs !== '' && amount !== '') {
      handleFormSubmit();
    }
  }

  const handleFormSubmit = async () => {

    await axios.post("http://localhost:8080/api/jobs/save", {
      duty: jobs,
      amount: amount
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
          title: 'New job saved !'
        });
        handleJobsSubmit();
        quitClick();
      }
      )

      .catch((error) => {
        Toast.fire({
          icon: 'error',
          title: 'Error while saving your job'
        });
        quitClick();
        console.log(error);
      })
  }

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
      >

        <Card
          className="h-full shadow-sm"
          style={{
            position: 'absolute',
            top: '42%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 640,
            height: 510
          }}>

          <Grid container className='w-full h-full'>
            <p className="font-quicksand text-2xl font-semibold ps-6 text-theme-color-3 mt-6 underline ">Define jobs and payment</p>

            <form className='h-full w-full' >

              <Grid container className="w-full flex justify-center place-items-end" style={{ height: ' 320px ' }}>

                <ThemeProvider theme={theme_input}>
                  <Grid xs={10} className="mt-10 h-full py-6"  >

                    <Grid item xs={12} >

                      <TextField
                        fullWidth
                        label="Employee's duty"
                        value={jobs}
                        onChange={(e) => { handleInputChange(e, setJobs) }}
                        color={isJobsEmpty ? 'error' : 'primary'}
                      />

                      <Grid container className="relative top-2">
                        <Grid item className="text-red-500 pe-4">
                          {isJobsEmpty ? <IconInfoCircle /> : <span className='text-white'> <IconInfoCircle /> </span>}
                        </Grid>
                        <Grid item>
                          {isJobsEmpty ? <p className=" text-red-500 relative bottom-0.5" style={{ fontSize: '18px' }}> Please define the job</p> : <p>.</p>}
                        </Grid>
                      </Grid>

                    </Grid>

                    <Grid item xs={12} className='pt-24'>

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

                      <Grid container className="relative top-2">
                        <Grid item className="text-red-500 pe-4">
                          {isAmountEmpty ? <IconInfoCircle /> : <span className='text-white'> <IconInfoCircle /> </span>}
                        </Grid>
                        <Grid item>
                          {isAmountEmpty ? <p className=" text-red-500 relative bottom-0.5" style={{ fontSize: '18px' }}> Please define the pay</p> : <p>.</p>}
                        </Grid>
                      </Grid>

                    </Grid>

                  </Grid>
                </ThemeProvider>

              </Grid>

              <Grid container className="w-full mt-12" style={{ height: '70px' }}>

                <Grid item xs={6} className="flex justify-center place-items-start px-6">

                  <button className=" project-btn " onClick={quitClick}>
                    C A N C E L
                  </button>

                </Grid>

                <Grid item xs={6} className="flex justify-center place-items-start px-6">

                  <button className=" project-btn flex place-content-center" type="submit" onClick={handleClick}>
                    <span className="ps-10"> F I N I S H </span><span className="ps-10 "> <IconArrowRight /> </span>
                  </button>

                </Grid>

              </Grid>


            </form>
          </Grid>

        </Card>

      </Modal >
    </>
  )
}

export default JobsModal
