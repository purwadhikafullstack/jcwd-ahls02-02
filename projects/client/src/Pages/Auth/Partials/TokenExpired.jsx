import { AppBar, Box, Button, Container, Grid, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";


const TokenExpired = () => {
    const navigate = useNavigate();

    return <div>
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
        <Container>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5 }}>
                <img src="https://i.ibb.co/HdpFrG2/token-expired.png" alt="verification" style={{ width: '20%' }} />
                <Typography variant='h4' sx={{ mt: 2 }}>Sorry, the link has expired</Typography>
                <Typography variant='p' color='grey.600' sx={{ mt: 1 }}>Please try again</Typography>
                <Button variant='contained' sx={{ mt: 5 }} onClick={() => navigate('/')}>Go to homepage</Button>
            </Box >
        </Container>
    </div >
}

export default TokenExpired;