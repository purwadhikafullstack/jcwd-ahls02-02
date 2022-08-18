import { AppBar, Box, Button, Container, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Toolbar, Typography, Unstable_Grid2 } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AuthNavbar from "./Partials/InitialNavbar";

const LoginPage = () => {
    const navigate = useNavigate();
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
                                        edge="end"
                                    >
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 2, mb: 2 }}
                        color="primary"
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
    </div>
}

export default LoginPage;