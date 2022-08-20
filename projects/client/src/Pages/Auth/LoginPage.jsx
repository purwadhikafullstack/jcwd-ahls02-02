import { AppBar, Box, Button, Container, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, TextField, Toolbar, Typography, Unstable_Grid2 } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AuthNavbar from "./Partials/InitialNavbar";
import { useState } from 'react'
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { API_URL } from "../../helper";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginAction } from "../../Redux/Actions/userAction";
import Cookies from "js-cookie";
import ResetPasswordModal from "./Partials/ResetPasswordModal";

const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState("")
    const [emailValidity, setEmailValidity] = useState("null")
    const [emailInfo, setEmailInfo] = useState()

    const [password, setPassword] = useState("")
    const [passwordValidity, setPasswordValidity] = useState("null")
    const [passwordInfo, setPasswordInfo] = useState()
    const [showPassword, setShowPassword] = useState(false)

    const [openModal, setOpenModal] = useState(false)

    const [disableButton, setDisableButton] = useState(false)


    const handleCheckEmail = (email) => {
        if (email == "") {
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
            setDisableButton(true)
            let login = await axios.post(`${API_URL}/users/login`, { email, password })
            dispatch(loginAction(login.data))
            navigate('/')
            Cookies.set('userToken', login.data.token, { expires: 1 })

        } catch (error) {
            if (error.response.data.message === "User not found") {
                setDisableButton(false)
                console.log('Email is not registered')
                setEmailValidity(false)
                setEmailInfo("This email is not registered")
            } else if (error.response.data.message === "Password Incorrect") {
                setDisableButton(false)
                console.log('Password is incorrect')
                setPasswordValidity(false)
                setPasswordInfo('Incorrect password')
            } else {
                setDisableButton(false)
                console.log(error)
            }
        }
    }

    return <div>
        <AuthNavbar />

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
                        autoFocus
                        onChange={(e) => {
                            setEmail(e.target.value)
                            handleCheckEmail(e.target.value)
                        }}
                        helperText={emailInfo}
                        error={emailValidity == "null" ? null : !emailValidity}
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
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 2, mb: 2 }}
                        color="primary"
                        onClick={() => handleLogin(email, password)}
                        disabled={disableButton}
                    >

                        Login
                    </Button>
                    <Button
                        type="button"
                        fullWidth
                        variant="outlined"
                        sx={{ mb: 2 }}
                        color="primary"
                    >

                        Login with Google
                    </Button>
                    {/* <Typography variant='body' color='grey.800'>
                        Don't have an account?
                    </Typography>
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 2, mb: 2 }}
                        color="primary"
                    >

                        Sign Up
                    </Button> */}
                </Grid>
                <Grid item md={7} sx={{ display: { xs: 'none', md: 'block' } }}>
                    <img src='https://i.ibb.co/qsKyN61/Capture2.png' style={{ width: '80%' }} />
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