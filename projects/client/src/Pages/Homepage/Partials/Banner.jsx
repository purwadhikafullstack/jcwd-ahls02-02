import { Box, Button, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";

const Banner = () => {
    return <Container sx={{ mt: 5 }}>
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <img src='https://i.pinimg.com/originals/6e/e3/d8/6ee3d82861aab581d7f7d044b335a840.png' alt='banner' style={{ width: '100%' }} />
            </Grid>
            <Grid item xs={12} md={6}>
                {/* <Box sx={{ display: 'flex', justifyContent: 'space-between' }}> */}
                <Box sx={{ ml: 3, textAlign: 'left', display: 'flex', flexDirection: 'column', mt: { xs: 0, md: 8 } }}>
                    {/* <Box> */}
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
                            Online pharmacy store that delivers medicine and medical product within 24 hours. We can also provide you with your perscription!
                        </Typography>
                        <Typography variant='subtitle2' color='grey.600'>
                            Order now and get a free bottle of vitamin D3
                        </Typography>
                    </Box>
                    <Button variant='contained'>Get Your Perscription Now</Button>
                </Box>
                {/* </Box> */}
                {/* </Box> */}
            </Grid>
        </Grid>
    </Container>
}

export default Banner;