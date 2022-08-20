import { Modal, Backdrop, Fade, Box, Grid, Avatar, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";

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
    const { isOpen, setOpen, toggle } = props;
    const [email, setEmail] = useState()
    const [helperText, setHelperText] = useState()
    const [emailSent, setEmailSent] = useState(false)
    const [emailError, setEmailError] = useState(false)

    const [statusDisabled, setStatusDisabled] = useState(false)


    const handleCloseModal = () => {
        toggle();
        setEmailSent(false)
    }

    const handleSendLink = () => {

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
                            <Avatar
                                flexItem
                                src="https://i.kym-cdn.com/entries/icons/original/000/024/027/blog_image_3822_4926_Webcomic_Name_April_Fools_Day_201703231756.jpg"
                                sx={{ width: 80, height: 80, mb: 1 }}
                            />
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
                            <Avatar
                                flexItem
                                src="https://i.kym-cdn.com/entries/icons/original/000/024/027/blog_image_3822_4926_Webcomic_Name_April_Fools_Day_201703231756.jpg"
                                sx={{ width: 80, height: 80, mb: 1 }}
                            />
                        </Grid>
                        <Typography id="transition-modal-title" variant="h5" component="h1" textAlign="center" sx={{ mb: 2 }}>
                            Don't worry, we got you!
                        </Typography>
                        <Typography id="transition-modal-title" variant="body2" component="h1" textAlign="center" color="grey.600" >
                            Enter your email and we'll send the reset link
                        </Typography>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Enter your email address"
                            name="emailAddress"
                            autoComplete="emailAddress"
                            autoFocus
                            onChange={(e) => setEmail(e.target.value)}
                            error={emailError}
                            helperText={helperText}
                        />

                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 2, mb: 2 }}
                            color="primary"
                            onClick={handleSendLink}
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