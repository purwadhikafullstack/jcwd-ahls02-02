import { Modal, Backdrop, Fade, Box, Grid, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { API_URL } from "../../../helper";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ResetPasswordModal = (props) => {
    const { isOpen, toggle } = props;
    const [email, setEmail] = useState()
    const [helperText, setHelperText] = useState()
    const [emailSent, setEmailSent] = useState(false)
    const [emailError, setEmailError] = useState(false)

    const [statusDisabled, setStatusDisabled] = useState(false)


    const handleCloseModal = () => {
        toggle();
        setEmail()
        setHelperText();
        setEmailSent(false);
        setEmailError(false);
    }

    const handleSendLink = (email) => {
        setStatusDisabled(true)
        axios.patch(`${API_URL}/users/forgotPassword`, { email })
            .then((res) => {
                setEmailError(false)
                setEmailSent(true)
                setHelperText()
                setStatusDisabled(false)
            }).catch((error) => {
                console.log(error)
                setStatusDisabled(false)
                setEmailError(true)
                setHelperText("Email not found")
            })


    }

    return <div>
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={isOpen}
            onClose={handleCloseModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={isOpen}>
                {emailSent ?
                    <Box sx={style}>
                        <Grid container
                            spacing={0}
                            direction="column"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <img src='https://img.freepik.com/free-vector/confirmed-concept-illustration_114360-5400.jpg?w=2000' alt='forgot password' style={{ width: '100%' }} />
                        </Grid>
                        <Typography id="transition-modal-title" variant="h5" component="h1" textAlign="center" sx={{ mb: 2 }}>
                            It's all done!
                        </Typography>
                        <Typography id="transition-modal-title" variant="body2" component="h1" textAlign="center" color="grey.600" >
                            We've sent the reset link, please check your email inbox!
                        </Typography>
                    </Box>
                    :
                    <Box sx={style}>
                        <Grid container
                            spacing={0}
                            direction="column"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <img src='https://img.freepik.com/free-vector/forgot-password-concept-illustration_114360-4652.jpg?w=2000' alt='forgot password' style={{ width: '100%' }} />
                        </Grid>
                        <Typography id="transition-modal-title" variant="h5" component="h1" textAlign="center" sx={{ mb: 2 }}>
                            Forgot your password?
                        </Typography>
                        <Typography id="transition-modal-title" variant="body2" component="h1" textAlign="center" color="grey.600" >
                            Don't worry. Just enter your email and we'll send the reset link
                        </Typography>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Enter your email address"
                            name="emailAddress"
                            autoComplete="emailAddress"
                            onChange={(e) => {
                                setEmail(e.target.value)
                                setHelperText();
                                setEmailError(false);
                            }}
                            error={emailError}
                            helperText={helperText}
                        />

                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 2, mb: 2 }}
                            color="secondary"
                            onClick={() => handleSendLink(email)}
                            disabled={statusDisabled}
                        >
                            Send reset link!
                        </Button>
                    </Box>
                }
            </Fade>
        </Modal>
    </div>
}

export default ResetPasswordModal;