import {
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import Button from "../../../Components/atoms/Button";
import Text from "../../../Components/atoms/Text";

const MyProfile = () => {
  const [value, setValue] = useState(null);
  return (
    <>
      <Grid xs={12} container spacing={2} alignItems="center">
        <Grid xs={12}>
          <Text fontSize="h5">My Profile</Text>
        </Grid>

        <Container>
          <FormControl>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={3} alignItems="center">
                <Text textAlign="left">Name</Text>
              </Grid>
              <Grid item xs={9} alignItems="center" justifyContent="flex-start">
                <TextField
                  id="user-name"
                  placeholder="Name"
                  variant="outlined"
                  fullWidth
                />
              </Grid>

              <Grid item xs={3} alignItems="center">
                <Text textAlign="left">Gender</Text>
              </Grid>
              <Grid item xs={9} alignItems="center" justifyContent="flex-start">
                <RadioGroup row name="user-gender">
                  <FormControlLabel
                    value="female"
                    control={<Radio size="small" />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio size="small" />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="others"
                    control={<Radio size="small" />}
                    label="Others"
                  />
                </RadioGroup>
              </Grid>

              <Grid item xs={3} alignItems="center">
                <Text textAlign="left">Birthdate</Text>
              </Grid>
              <Grid item xs={9} textAlign="left" justifyContent="flex-start">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={value}
                    onChange={(newValue) => {
                      setValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={3} alignItems="center">
                <Text textAlign="left">Email</Text>
              </Grid>
              <Grid item xs={9} alignItems="center" justifyContent="flex-start">
                <TextField
                  id="user-email"
                  placeholder="Email"
                  variant="outlined"
                  type="email"
                  fullWidth
                />
              </Grid>

              <Grid item xs={3} alignItems="center">
                <Text textAlign="left">Phone Number</Text>
              </Grid>
              <Grid item xs={9} alignItems="center" justifyContent="flex-start">
                <TextField
                  id="user-phone"
                  placeholder="Phone Number"
                  variant="outlined"
                  type="tel"
                  fullWidth
                />
              </Grid>
              <Grid xs={12} container justifyContent="flex-end" sx={{ py: 3 }}>
                <Grid xs={3} item />
                <Grid
                  xs={9}
                  item
                  textAlign="left"
                  sx={{ pt: "16px", pr: 0, pb: 0, pl: "16px" }}
                >
                  <Button
                    width="150px"
                    variant="contained"
                    color="primary"
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </FormControl>
        </Container>
      </Grid>
    </>
  );
};

export default MyProfile;
