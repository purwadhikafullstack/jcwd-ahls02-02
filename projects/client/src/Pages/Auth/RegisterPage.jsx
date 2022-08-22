import { Box, Button, Container, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { VisibilityOff, Visibility } from '@mui/icons-material';
import axios from "axios";
import { API_URL } from "../../helper";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { loginAction } from "../../Redux/Actions/userAction";

const RegisterPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [phone, setPhone] = useState()
    const [password, setPassword] = useState()

    const [emailValidity, setEmailValidity] = useState("null")
    const [emailInfo, setEmailInfo] = useState()
    const [emailAvailability, setEmailAvailability] = useState(false)
    const [disableAvailability, setDisableAvailability] = useState(true)

    const [showPassword, setShowPassword] = useState(false)
    const [passwordValidity, setPasswordValidity] = useState("null")
    const [passwordInfo, setPasswordInfo] = useState("")
    const [passwordConf, setPasswordConf] = useState("")

    const [PasswordConfValidity, setPasswordConfValidity] = useState("null")

    const [disableSignUp, setDisableSignUp] = useState(false)

    const handleButtonAvailability = (email) => {
        if (email === "") {
            setEmailValidity("null")
            setEmailInfo()
            setDisableAvailability(true)
        } else if (email.includes("@") && email.includes(".com")) {
            setEmailValidity("null")
            setDisableAvailability(false)
            setEmailInfo()
        } else {
            setEmailInfo("Please fill in with a proper email address")
            setEmailValidity(false)
            setDisableAvailability(true)
        }
    }

    const handleCheckEmail = async (email) => {
        try {
            let dataEmail = await axios.get(`${API_URL}/users/userData`)
            let index = dataEmail.data.findIndex(val => val.email === email)
            if (index > 0) {
                setDisableAvailability(true)
                setEmailAvailability(false)
                setEmailValidity(false)
                setEmailInfo("This email is already registered")
            } else {
                setDisableAvailability(true)
                setEmailAvailability(true)
                setEmailValidity("null")
                setEmailInfo("Nice! This email is available")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleCheckPassword = (password) => {
        let temp = password.split("")
        let checkNumber = "";
        let checkLowerCase = "";
        let checkUpperCase = "";
        let checkSymbol = "";

        let symbols = `~!@#$%^&*()_-+={[}]|\:;"'<,>.?/`
        let arraySymbols = symbols.split("")

        temp.forEach((value) => {
            if (value / 2) {
                checkNumber = true;
            }
        })

        temp.forEach((value) => {
            if (value.toLowerCase() !== value.toUpperCase()) {
                if (value.toLowerCase() === value) {
                    checkLowerCase = true;
                }
            }
        })

        temp.forEach((value) => {
            if (value.toLowerCase() !== value.toUpperCase()) {
                if (value.toUpperCase() === value) {
                    checkUpperCase = true;
                }
            }
        })


        for (let i = 0; i < temp.length; i++) {
            for (let k = 0; k < arraySymbols.length; k++) {
                if (temp[i] === arraySymbols[k]) {
                    checkSymbol = true;
                }
            }
        }

        if (password === "") {
            setPasswordValidity("null")
        }

        if (checkLowerCase !== true) {
            setPasswordValidity(false)
            setPasswordInfo("Password must include a lowercase")
        }

        if (checkUpperCase !== true) {
            setPasswordValidity(false)
            setPasswordInfo("Password must include an uppercase")
        }

        if (checkNumber !== true) {
            setPasswordValidity(false)
            setPasswordInfo("Password must include a number")
        }

        if (checkSymbol !== true) {
            setPasswordValidity(false)
            setPasswordInfo("Password must include a symbol")
        }

        if (temp.length < 8) {
            setPasswordValidity(false)
            setPasswordInfo("Password must at least contain 8 characters")
        }

        if (checkLowerCase && checkUpperCase && checkNumber && checkSymbol && temp.length >= 8) {
            setPasswordInfo("Your password is strong!")
            setPasswordValidity(true)
            setPasswordConf(password)
            setPassword(password)
        }

    }

    const handleRecheckPassword = (passwordConfirmation) => {
        if (passwordConfirmation === passwordConf) {
            setPasswordConfValidity(true)
        } else if (passwordConfirmation !== passwordConf) {
            setPasswordConfValidity(false)
        }
    }

    const handleRegister = async (name, email, phone_number, password) => {
        try {
            if (name && emailAvailability && passwordValidity && PasswordConfValidity) {
                setDisableSignUp(true)
                let signup = await axios.post(`${API_URL}/users/register`, {
                    name,
                    email,
                    phone_number,
                    password
                })
                navigate('/')
                dispatch(loginAction(signup.data))

                Cookies.set('userToken', signup.data.token, { expires: 1 })
            }
        } catch (error) {
            setDisableSignUp(false)
            console.log(error)
        }
    }

    return <div>
        {/* <AuthNavbar /> */}

        <Container sx={{ mt: 2 }}>
            <Grid container spacing={1}>
                <Grid item xs={12} md={5}>
                    <Box sx={{ mt: 3, mb: 3 }}>
                        <Typography variant='h5' color='grey.700'>REGISTER</Typography>
                    </Box>
                    <form>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="fullName"
                            label="Enter your full name"
                            name="fullName"
                            autoComplete="fullName"
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ flexGrow: 1, mr: 1 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Enter your email"
                                    name="email"
                                    autoComplete="email"
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        handleButtonAvailability(e.target.value)
                                        setEmailAvailability(false)
                                    }}
                                    helperText={emailInfo}
                                    color={emailAvailability ? "success" : null}
                                    error={emailValidity === "null" ? null : !emailValidity}
                                />
                            </Box>
                            <Box>
                                <Button variant='contained' disabled={disableAvailability} onClick={() => handleCheckEmail(email)}>Check Availability</Button>
                            </Box>
                        </Box>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="phoneNumber"
                            label="Enter your phone number"
                            name="phoneNumber"
                            autoComplete="phoneNumber"
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <FormControl fullWidth variant="outlined" margin="normal">
                            <InputLabel
                                htmlFor="outlined-adornment-password"
                                required
                            >Enter your password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                onChange={(e) => handleCheckPassword(e.target.value)}
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                            aria-label="toggle password visibility"
                                            // onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                                error={passwordValidity === "null" ? null : !passwordValidity}
                                color={passwordInfo ? "success" : null}
                            />
                            <FormHelperText>{passwordInfo}</FormHelperText>
                        </FormControl>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="passConf"
                            label="Enter your password confirmation"
                            name="passConf"
                            autoComplete="passConf"
                            type="password"
                            onChange={(e) => handleRecheckPassword(e.target.value)}
                            error={PasswordConfValidity === "null" ? null : !PasswordConfValidity}
                            color={PasswordConfValidity ? "success" : null}
                        />
                    </form>
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 2, mb: 2 }}
                        color="primary"
                        disabled={name && emailAvailability && phone && passwordValidity === true && PasswordConfValidity === true ? disableSignUp : true}
                        onClick={() => handleRegister(name, email, phone, password)}
                    >
                        Sign Up
                    </Button>
                    <Button
                        type="button"
                        fullWidth
                        variant="outlined"
                        sx={{ mb: 2 }}
                        color="primary"
                    >

                        Sign Up with Google
                    </Button>
                </Grid>
                <Grid item md={7} sx={{ display: { xs: 'none', md: 'block' } }}>
                    <img src='https://static.vecteezy.com/system/resources/previews/005/867/677/non_2x/online-registration-illustration-design-concept-vector.jpg' alt='registration' style={{ width: '90%' }} />
                </Grid>
            </Grid>
        </Container>
    </div>
}

export default RegisterPage;