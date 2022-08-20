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
  const [name, setName] = useState("John Doe");
  const [gender, setGender] = useState("male");
  const [dateOfBirth, setDateOfBirth] = useState("2022-01-04T15:11:33.000Z");
  const email = "johndoe@mail.com";
  const [phoneNumber, setPhoneNumber] = useState("081111111");

  const handleSubmit = () => {
    console.log(name);
    console.log(gender);
    console.log(dateOfBirth);
    console.log(email);
    console.log(phoneNumber);
  };

  return (
    <>
      <Grid container spacing={2} alignItems="center">
        <Grid>
          <Text fontSize="h5">My Profile</Text>
        </Grid>

        <Container>
          <FormControl>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={3} alignItems="center">
                <Text textAlign="right">Name</Text>
              </Grid>
              <Grid item xs={9} alignItems="center" justifyContent="flex-start">
                <TextField
                  id="user-name"
                  placeholder="Name"
                  variant="outlined"
                  defaultValue={name}
                  fullWidth
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>

              <Grid item xs={3} alignItems="center">
                <Text textAlign="right">Gender</Text>
              </Grid>
              <Grid item xs={9} alignItems="center" justifyContent="flex-start">
                <RadioGroup
                  row
                  name="user-gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
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
                <Text textAlign="right">Birthdate</Text>
              </Grid>
              <Grid item xs={9} textAlign="left" justifyContent="flex-start">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={dateOfBirth}
                    onChange={(newValue) => {
                      setDateOfBirth(newValue);
                      console.log(JSON.stringify(newValue));
                      console.log(Object.keys(newValue));
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={3} alignItems="center">
                <Text textAlign="right">Email</Text>
              </Grid>
              <Grid item xs={9} alignItems="center" justifyContent="flex-start">
                <TextField
                  id="user-email"
                  placeholder="Email"
                  variant="outlined"
                  type="email"
                  fullWidth
                  defaultValue={email}
                  disabled
                />
              </Grid>

              <Grid item xs={3} alignItems="center">
                <Text textAlign="right">Phone Number</Text>
              </Grid>
              <Grid item xs={9} alignItems="center" justifyContent="flex-start">
                <TextField
                  id="user-phone"
                  placeholder="Phone Number"
                  variant="outlined"
                  type="tel"
                  fullWidth
                  defaultValue={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </Grid>
              <Grid container justifyContent="flex-end" sx={{ py: 3 }}>
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
                    onClick={() => handleSubmit()}
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
