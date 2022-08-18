import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem, Divider, Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom';

const InitialNavbar = () => {
    const navigate = useNavigate();

    return (
        <AppBar position="sticky" style={{ background: 'white', boxShadow: "none" }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Container>
                    <Toolbar disableGutters sx={{ height: 75 }}>
                        <Grid container sx={{ justifyContent: 'space-between' }}>
                            <Grid item xs={2} >
                                <Button onClick={() => navigate('/')}>
                                    <img src='https://i.ibb.co/mv7cmnF/Life-Serve-Logo-1.png' style={{ maxWidth: 120 }} />
                                </Button>
                            </Grid>
                            <Grid item xs={4}>
                                <Button variant='outlined' sx={{ mr: 2 }} onClick={() => navigate('/auth/login')}>Login</Button>
                                <Button variant='contained' onClick={() => navigate('/auth/register')}>Register</Button>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </Container>
            </Box>
        </AppBar>
    );
};

export default InitialNavbar;