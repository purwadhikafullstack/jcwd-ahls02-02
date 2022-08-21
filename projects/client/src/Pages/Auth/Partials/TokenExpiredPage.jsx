import { AppBar, Box, Button, Container, Grid, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const TokenExpiredPage = () => {
    const navigate = useNavigate();

    return <>
        <Container>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5 }}>
                <img src="https://i.ibb.co/HdpFrG2/token-expired.png" alt="verification" style={{ width: '20%' }} />
                <Typography variant='h4' sx={{ mt: 2 }}>Sorry, the link has expired</Typography>
                <Typography variant='p' color='grey.600' sx={{ mt: 1 }}>Please try again</Typography>
                <Button variant='contained' sx={{ mt: 5 }} onClick={() => navigate('/')}>Go to homepage</Button>
            </Box >
        </Container>
    </>
}

export default TokenExpiredPage;