import { Box, Container, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, TextField, Tooltip, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from 'react'
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { API_URL } from "../../helper";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getCartAction, loginAction } from "../../Redux/Actions/userAction";
import Cookies from "js-cookie";
import ResetPasswordModal from "./Partials/ResetPasswordModal";
import Button from '../../Components/atoms/Button'
import toast from "react-hot-toast";

const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState("")
    const [emailValidity, setEmailValidity] = useState("null")
    const [emailInfo, setEmailInfo] = useState()

    const [password, setPassword] = useState("")
    const [passwordInfo, setPasswordInfo] = useState()
    const [showPassword, setShowPassword] = useState(false)

    const [openModal, setOpenModal] = useState(false)

    const [submitData, setSubmitData] = useState(false)


    const handleCheckEmail = (email) => {
        if (email === "") {
            setEmailValidity("null")
            setEmailInfo()
        } else if (email.includes("@") && email.includes(".com")) {
            setEmailValidity(true)
            setEmailInfo()
        } else {
            setEmailInfo("Please fill in with a proper email address")
            setEmailValidity(false)
        }
    }

    const handleLogin = async (email, password) => {
        try {
            setSubmitData(true)
            // setDisableButton(true)
            let login = await axios.post(`${API_URL}/users/login`, { email, password })
            dispatch(loginAction(login.data))
            navigate('/')
            Cookies.set('userToken', login.data.token, { expires: 1, secure: true })

        } catch (error) {
            if (error.response.data.message === "User not found") {
                setSubmitData(false)
                setPasswordInfo("Email or password is incorrect")
            } else if (error.response.data.message === "Password Incorrect") {
                setSubmitData(false)
                setPasswordInfo("Email or password is incorrect")
            } else {
                setSubmitData(false)
                console.log(error)
                toast.error("Something went wrong, please try again");
            }
        }
    }

    return <div>
        <Container sx={{ mt: 2 }}>
            <Grid container spacing={1}>
                <Grid item xs={12} md={5}>
                    <Box sx={{ mt: 3, mb: 3 }}>
                        <Typography variant='h5' color='grey.700'>LOGIN</Typography>
                        {/* <img src='https://i.ibb.co/mv7cmnF/Life-Serve-Logo-1.png' style={{ maxWidth: '40%' }} /> */}
                    </Box>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Enter your email"
                        name="email"
                        autoComplete="email"
                        onChange={(e) => {
                            setEmail(e.target.value)
                            handleCheckEmail(e.target.value)
                        }}
                        helperText={emailInfo}
                        error={emailValidity === "null" ? null : !emailValidity}
                    />
                    <FormControl fullWidth variant="outlined" margin="normal">
                        <InputLabel
                            htmlFor="outlined-adornment-password"
                            required
                        >Enter your password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        // onMouseDown={handleMouseDownPassword}
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                            onChange={(e) => {
                                setPassword(e.target.value)
                                setPasswordInfo()
                            }}
                            type={showPassword ? 'text' : 'password'}
                            error={passwordInfo ? true : false}
                        />
                        <FormHelperText>{passwordInfo}</FormHelperText>
                    </FormControl>
                    <Box textAlign='right'>
                        <Link color='grey.800' underline='hover' href="#" onClick={() => setOpenModal(!openModal)}>Forgot password?</Link>
                    </Box>
                    <Box sx={{ mt: 2, mb: 2 }}>
                        <Button
                            type="button"
                            width='100%'
                            variant="contained"
                            // sx={{ mt: 2, mb: 2 }}
                            color="primary"
                            onClick={() => handleLogin(email, password)}
                            isSubmitting={submitData}
                        >

                            LOGIN
                        </Button>
                    </Box>
                </Grid>
                <Grid item md={7} sx={{ display: { xs: 'none', md: 'block' } }}>
                    <img src='https://i.ibb.co/qsKyN61/Capture2.png' alt='login' style={{ width: '80%' }} />
                </Grid>
            </Grid>
        </Container>
        <ResetPasswordModal
            isOpen={openModal}
            setOpen={setOpenModal}
            toggle={() => setOpenModal(!openModal)}
        />
    </div >
}

export default LoginPage;