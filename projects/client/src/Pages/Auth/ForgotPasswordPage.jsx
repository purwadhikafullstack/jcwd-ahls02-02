import { Visibility, VisibilityOff } from "@mui/icons-material";
import { AppBar, Box, Button, Container, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Toolbar, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../../helper";
import TokenExpired from "./Partials/TokenExpired";
import { useNavigate } from "react-router-dom";
import SnackBarStatus from "../../Components/atoms/SnackBar";

const ForgotPasswordPage = () => {
    let { token } = useParams();
    const navigate = useNavigate();

    const [userData, setUserData] = useState()

    const [password, setPassword] = useState()

    const [showPassword, setShowPassword] = useState(false)
    const [passwordValidity, setPasswordValidity] = useState("null")
    const [passwordInfo, setPasswordInfo] = useState("")
    const [passwordConf, setPasswordConf] = useState("")

    const [PasswordConfValidity, setPasswordConfValidity] = useState("null")

    const [disableButton, setDisableButton] = useState(false)

    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [showLogin, setShowLogin] = useState(false)

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        try {
            let userData = await axios.get(`${API_URL}/users/tokenData`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            setUserData(userData.data)
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

    const handleReset = (password) => {
        setDisableButton(true)
        axios.patch(`${API_URL}/users/resetPassword`, { password }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((res) => {
            setOpenSnackbar(true)
            setShowLogin(true)
            // navigate('/auth/login')
        }).catch((error) => {
            console.log(error)
            setDisableButton(false)
        })
    }

    return <div>
        {userData ? userData.token_reset === token ?
            <>
                <AppBar position="sticky" style={{ background: 'white', boxShadow: "none" }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Container>
                            <Toolbar disableGutters sx={{ height: 75 }}>
                                <Grid container sx={{ justifyContent: 'space-between' }}>
                                    <Grid item xs={2} >
                                        <img src='https://i.ibb.co/mv7cmnF/Life-Serve-Logo-1.png' alt='logo' style={{ maxWidth: 120 }} />
                                    </Grid>
                                </Grid>
                            </Toolbar>
                        </Container>
                    </Box>
                </AppBar>
                <Container sx={{ mt: 2 }}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={5}>
                            <Box sx={{ mt: 3, mb: 3 }}>
                                <Typography variant='h5' color='grey.700'>RESET PASSWORD</Typography>
                            </Box>
                            <FormControl fullWidth variant="outlined" margin="normal">
                                <InputLabel
                                    htmlFor="outlined-adornment-password"
                                    required
                                >Enter new password</InputLabel>
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
                                label="Enter password confirmation"
                                name="passConf"
                                autoComplete="passConf"
                                type="password"
                                onChange={(e) => handleRecheckPassword(e.target.value)}
                                error={PasswordConfValidity === "null" ? null : !PasswordConfValidity}
                                color={PasswordConfValidity ? "success" : null}
                            />
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 2, mb: 2 }}
                                color="secondary"
                                onClick={() => handleReset(password)}
                                disabled={passwordValidity === true && PasswordConfValidity === true ? disableButton : true}
                            >

                                Reset Password
                            </Button>
                            {showLogin ?
                                <Button
                                    type="button"
                                    fullWidth
                                    variant="contained"
                                    color='primary'
                                    onClick={() => {
                                        navigate('/auth/login')
                                        setShowLogin(false)
                                    }} >
                                    Login
                                </Button>
                                : null}
                        </Grid>
                        <Grid item md={7} sx={{ display: { xs: 'none', md: 'block' } }}>
                            <img src='https://img.freepik.com/free-vector/my-password-concept-illustration_114360-6924.jpg?w=2000' alt='login' style={{ width: '60%' }} />
                        </Grid>
                    </Grid>
                    <SnackBarStatus
                        open={openSnackbar}
                        setOpen={setOpenSnackbar}
                        message='Reset password successful'
                        severity='success'
                    />
                </Container>
            </>
            :
            <TokenExpired />
            :
            <TokenExpired />
        }
        {/* {showLogin ?
            <>
                <AppBar position="sticky" style={{ background: 'white', boxShadow: "none" }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Container>
                            <Toolbar disableGutters sx={{ height: 75 }}>
                                <Grid container sx={{ justifyContent: 'space-between' }}>
                                    <Grid item xs={2} >
                                        <img src='https://i.ibb.co/mv7cmnF/Life-Serve-Logo-1.png' alt='logo' style={{ maxWidth: 120 }} />
                                    </Grid>
                                </Grid>
                            </Toolbar>
                        </Container>
                    </Box>
                </AppBar>
                <Container sx={{ mt: 2 }}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={5}>
                            <Box sx={{ mt: 3, mb: 3 }}>
                                <Typography variant='h5' color='grey.700'>SUCCESS!</Typography>
                                <Typography variant='p' color='grey.700'>Reset password was successful. Please go to the login page and use your new password to log in!</Typography>
                            </Box>
                            <Button variant="contained" color='primary' onClick={() => navigate('/auth/login')} >Login</Button>
                        </Grid>
                        <Grid item md={7} sx={{ display: { xs: 'none', md: 'block' } }}>
                            <img src='https://img.freepik.com/free-vector/my-password-concept-illustration_114360-6924.jpg?w=2000' alt='login' style={{ width: '60%' }} />
                        </Grid>
                    </Grid>

                </Container>
                <SnackBarStatus
                    open={openSnackbar}
                    setOpen={setOpenSnackbar}
                    message='Reset password successful'
                />
            </>
            : null} */}
    </div>
}

export default ForgotPasswordPage;