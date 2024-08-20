import { Grid } from "@mui/material"
import AmountChart from "../../components/AmountChart"

const DashBoard = () => {

  return (
    <>

      <Grid container className="w-full pt-6" style={{ height: "861px" }}>
        <AmountChart/>
      </Grid>

    </>
  )
}

export default DashBoard
