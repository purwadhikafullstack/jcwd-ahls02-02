import { Box, Button, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useNavigate } from "react-router-dom";

const Banner = (props) => {
    const { idUser } = props
    const navigate = useNavigate();

    const handleGetPrescription = () => {
        if (idUser) {
            navigate('/prescription/upload')
        } else {
            navigate('/auth/login')
        }
    }

    return <Container sx={{ mt: 5 }}>
        <Box sx={{ display: { xs: 'flex', md: 'none' }, flexDirection: 'column' }}>
            <img src='https://i.pinimg.com/originals/6e/e3/d8/6ee3d82861aab581d7f7d044b335a840.png' alt='banner' style={{ width: '100%' }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', mt: { xs: 0, md: 8 } }}>
                <Box sx={{ display: 'flex', mb: 3, justifyContent: 'center' }}>
                    <Typography variant='h6' component='span'>
                        Welcome to
                    </Typography>
                    <Typography variant='h6' component='span' sx={{ ml: 1 }} color='primary'>
                        Life
                    </Typography>
                    <Typography variant='h6' component='span' color='#4872A4'>
                        Serve
                    </Typography>
                </Box>
                <Box sx={{ mb: 3, textAlign: 'justify' }}>
                    <Typography variant='subtitle2' fontSize='12px' sx={{ mb: 2 }} color='grey.600'>
                        Online pharmacy store that delivers medicine and medical product within 24 hours. We can also provide you with your prescription!
                    </Typography>
                    <Typography variant='subtitle2' fontSize='12px' color='grey.600'>
                        Order now and get a free bottle of vitamin D3
                    </Typography>
                </Box>
                <Button variant='contained' onClick={handleGetPrescription}>
                    <Typography fontSize='12px'>
                        Get Your Prescription Now
                    </Typography>
                </Button>
            </Box>
            {/* </Grid> */}
            {/* </Grid> */}
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <img src='https://i.pinimg.com/originals/6e/e3/d8/6ee3d82861aab581d7f7d044b335a840.png' alt='banner' style={{ width: '100%' }} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={{ ml: 3, textAlign: 'left', display: 'flex', flexDirection: 'column', mt: { xs: 0, md: 8 } }}>
                        <Box sx={{ display: 'flex', mb: 3 }}>
                            <Typography variant='h4' component='span'>
                                Welcome to
                            </Typography>
                            <Typography variant='h4' component='span' sx={{ ml: 1 }} color='primary'>
                                Life
                            </Typography>
                            <Typography variant='h4' component='span' color='#4872A4'>
                                Serve
                            </Typography>
                        </Box>
                        <Box sx={{ mb: 3 }}>
                            <Typography variant='subtitle2' sx={{ mb: 2 }} color='grey.600'>
                                Online pharmacy store that delivers medicine and medical product within 24 hours. We can also provide you with your prescription!
                            </Typography>
                            <Typography variant='subtitle2' color='grey.600'>
                                Order now and get a free bottle of vitamin D3
                            </Typography>
                        </Box>
                        <Button variant='contained' onClick={handleGetPrescription}>Get Your Prescription Now</Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    </Container>
}

export default Banner;