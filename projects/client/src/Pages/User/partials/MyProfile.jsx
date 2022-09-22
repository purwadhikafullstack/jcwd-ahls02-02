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
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../Components/atoms/Button";
import Text from "../../../Components/atoms/Text";
import { API_URL } from "../../../helper";
import { editProfileAction } from "../../../Redux/Actions/userAction";
import { ToastNotification } from "../../../Components/Toast";
import dayjs from "dayjs";

const MyProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.userReducer;
  });

  const [name, setName] = useState(user.name);
  const [gender, setGender] = useState(user.gender);
  const [dateOfBirth, setDateOfBirth] = useState(
    user.birthdate ? JSON.parse(user.birthdate) : null
  );
  const [email, setEmail] = useState(user.email);
  const currentEmail = user.email
  const [phoneNumber, setPhoneNumber] = useState(user.phone_number);
  const [formIsChanged, setFormIsChanged] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const birthdate = JSON.stringify(dateOfBirth);
      const data = {
        name,
        gender,
        birthdate,
        email,
        currentEmail,
        phone_number: phoneNumber,
      };
      const token = Cookies.get("userToken");
      const res = await axios.patch(
        `${API_URL}/users/profile/${user.id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.success) {
        setIsSubmitting(false);
        toast.success("Your profile successfully updated!");
        Cookies.set("userToken", res.data.token, { expires: 1, secure: true });
        dispatch(editProfileAction(res.data.data));
      } else {
        setIsSubmitting(false);
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong, please try again");
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <ToastNotification />
      <Grid container spacing={2} alignItems="center">
        <Grid sx={{ pb: 2 }}>
          <Text fontSize="h5" fontWeight="bold">
            My Profile
          </Text>
          <Text>Manage your personal information</Text>
        </Grid>

        <FormControl>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={2} alignItems="center">
              <Text textAlign="left" fontWeight="medium">
                Name
              </Text>
            </Grid>
            <Grid
              item
              xs={12}
              md={10}
              alignItems="center"
              justifyContent="flex-start"
            >
              <TextField
                id="user-name"
                placeholder="Name"
                variant="outlined"
                defaultValue={name}
                fullWidth
                onChange={(e) => {
                  setName(e.target.value);
                  setFormIsChanged(true);
                }}
              />
            </Grid>

            <Grid item xs={12} md={2} alignItems="center">
              <Text textAlign="left" fontWeight="medium">
                Gender
              </Text>
            </Grid>
            <Grid
              item
              xs={12}
              md={10}
              alignItems="center"
              justifyContent="flex-start"
            >
              <RadioGroup
                row
                name="user-gender"
                value={gender}
                onChange={(e) => {
                  setGender(e.target.value);
                  setFormIsChanged(true);
                }}
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

            <Grid item xs={12} md={2} alignItems="center">
              <Text textAlign="left" fontWeight="medium">
                Birthdate
              </Text>
            </Grid>
            <Grid
              item
              xs={12}
              md={10}
              textAlign="left"
              justifyContent="flex-start"
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={dateOfBirth}
                  onChange={(newValue) => {
                    setDateOfBirth(newValue);
                    setFormIsChanged(true);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                  maxDate={dayjs()}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} md={2} alignItems="center">
              <Text textAlign="left" fontWeight="medium">
                Email
              </Text>
            </Grid>
            <Grid
              item
              xs={12}
              md={10}
              alignItems="center"
              justifyContent="flex-start"
            >
              <TextField
                id="user-email"
                placeholder="Email"
                variant="outlined"
                type="email"
                fullWidth
                defaultValue={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setFormIsChanged(true);
                }}
              />
            </Grid>

            <Grid item xs={12} md={2} alignItems="center">
              <Text textAlign="left" fontWeight="medium">
                Phone Number
              </Text>
            </Grid>
            <Grid
              item
              xs={12}
              md={10}
              alignItems="center"
              justifyContent="flex-start"
            >
              <TextField
                id="user-phone"
                placeholder="Phone Number"
                variant="outlined"
                type="tel"
                fullWidth
                defaultValue={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                  setFormIsChanged(true);
                }}
              />
            </Grid>
            <Grid container justifyContent="flex-end" sx={{ py: 3 }}>
              <Grid xs={2} item />
              <Grid
                xs={12}
                md={10}
                item
                textAlign="left"
                sx={{ pt: "16px", pr: 0, pb: 0, pl: "16px" }}
              >
                <Button
                  width="150px"
                  variant="contained"
                  color="primary"
                  onClick={() => handleSubmit()}
                  disabled={!formIsChanged}
                  isSubmitting={isSubmitting}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </FormControl>
      </Grid>
    </>
  );
};

export default MyProfile;
