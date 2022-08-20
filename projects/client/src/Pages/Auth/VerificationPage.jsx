import { AppBar, Box, Button, Container, Grid, Toolbar, Typography } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
import { API_URL } from "../../helper";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAction } from "../../Redux/Actions/userAction";


const VerificationPage = () => {
    let { token } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [userData, setUserData] = useState();
    const [disableButton, setDisableButton] = useState(false)

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

    const handleVerify = async () => {
        try {
            setDisableButton(true)
            let verify = await axios.patch(`${API_URL}/users/verify`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            Cookies.set('userToken', verify.data.finalToken, { expires: 1 })
            dispatch(loginAction(verify.data))
            navigate('/', { replace: true })

        } catch (error) {
            setDisableButton(false)
            console.log(error)
        }
    }

    return <div>
        {userData ? userData.token_verification == token ?
            <>
                <AppBar position="sticky" style={{ background: 'white', boxShadow: "none" }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Container>
                            <Toolbar disableGutters sx={{ height: 75 }}>
                                <Grid container sx={{ justifyContent: 'space-between' }}>
                                    <Grid item xs={2} >
                                        <img src='https://i.ibb.co/mv7cmnF/Life-Serve-Logo-1.png' style={{ maxWidth: 120 }} />
                                    </Grid>
                                </Grid>
                            </Toolbar>
                        </Container>
                    </Box>
                </AppBar>
                <Container>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5 }}>
                        <img src="https://cdni.iconscout.com/illustration/premium/thumb/face-recognition-security-5152134-4309034.png" alt="verification" style={{ width: '30%' }} />
                        <Typography variant='h4' sx={{ mt: 2 }}>You're one step closer</Typography>
                        <Typography variant='p' color='grey.600' sx={{ mt: 1 }}>Hi {userData ? userData.fullName : null}! Please verify your email address by clicking the button below, and you will get full access of the website</Typography>
                        <Button variant='contained' sx={{ mt: 5 }} disabled={disableButton} onClick={handleVerify}>Verify account</Button>
                    </Box >
                </Container>
            </>
            :
            <>
                <AppBar position="sticky" style={{ background: 'white', boxShadow: "none" }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Container>
                            <Toolbar disableGutters sx={{ height: 75 }}>
                                <Grid container sx={{ justifyContent: 'space-between' }}>
                                    <Grid item xs={2} >
                                        <img src='https://i.ibb.co/mv7cmnF/Life-Serve-Logo-1.png' style={{ maxWidth: 120 }} />
                                    </Grid>
                                </Grid>
                            </Toolbar>
                        </Container>
                    </Box>
                </AppBar>
                <Container>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5 }}>
                        <img src="https://i.ibb.co/HdpFrG2/token-expired.png" alt="verification" style={{ width: '20%' }} />
                        <Typography variant='h4' sx={{ mt: 2 }}>Sorry, the link has expired</Typography>
                        <Typography variant='p' color='grey.600' sx={{ mt: 1 }}>Please login to your account and send the verification link again</Typography>
                        <Button variant='contained' sx={{ mt: 5 }} onClick={() => navigate('/')}>Go to homepage</Button>
                    </Box >
                </Container>
            </>
            :
            <>
                <AppBar position="sticky" style={{ background: 'white', boxShadow: "none" }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Container>
                            <Toolbar disableGutters sx={{ height: 75 }}>
                                <Grid container sx={{ justifyContent: 'space-between' }}>
                                    <Grid item xs={2} >
                                        <img src='https://i.ibb.co/mv7cmnF/Life-Serve-Logo-1.png' style={{ maxWidth: 120 }} />
                                    </Grid>
                                </Grid>
                            </Toolbar>
                        </Container>
                    </Box>
                </AppBar>
                <Container>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5 }}>
                        <img src="https://i.ibb.co/HdpFrG2/token-expired.png" alt="verification" style={{ width: '20%' }} />
                        <Typography variant='h4' sx={{ mt: 2 }}>Sorry, the link has expired</Typography>
                        <Typography variant='p' color='grey.600' sx={{ mt: 1 }}>Please login to your account and send the verification link again</Typography>
                        <Button variant='contained' sx={{ mt: 5 }} disabled={disableButton} onClick={() => navigate('/')}>Go to homepage</Button>
                    </Box >
                </Container>
            </>
        }

    </div >
}

export default VerificationPage;