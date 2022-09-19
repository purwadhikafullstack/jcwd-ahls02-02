import { Call, Email, Facebook, Instagram, Twitter, YouTube } from "@mui/icons-material";
import { BottomNavigation, Box, Container, Divider, Grid, Typography } from "@mui/material";
import Button from "./atoms/Button";
import { useLocation, useNavigate } from 'react-router-dom';

const Footer = () => {
    const location = useLocation();

    return (
        <Box sx={{ position: 'absolute', bottom: 0, width: '100%', height: '2.5rem' }}>
            {(location.pathname.includes('auth') || location.pathname.includes('*') || location.pathname.includes('profile')) ? null :
                <Box fullWidth sx={{
                    height: { xs: 220, sm: 175 },
                    backgroundColor: 'primary.dark',
                }}>
                    <Container>
                        <Grid container sx={{ pt: 3, textAlign: "center" }} >
                            <Grid item xs={6} sm={4}>
                                <Box display="flex" sx={{ flexDirection: "column", alignItems: "start" }}>
                                    <Typography color="white" fontWeight="bold" fontSize="12px">LifeServe Medical Company</Typography>
                                    <Typography color="white" fontSize="12px">Asia Afrika, Gelora</Typography>
                                    <Typography color="white" fontSize="12px">Central Jakarta, 10270</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={6} sm={4}>
                                <Box display="flex" sx={{ alignItems: "center" }}>
                                    <Call fontSize="12px" sx={{ color: "white", mr: 1 }} />
                                    <Typography color="white" fontSize="12px">+62 21-8723-6473</Typography>
                                </Box>
                                <Box display="flex" sx={{ alignItems: "center" }}>
                                    <Call fontSize="12px" sx={{ color: "white", mr: 1 }} />
                                    <Typography color="white" fontSize="12px">+62 856-123-4567</Typography>
                                </Box>
                                <Box display="flex" sx={{ alignItems: "center" }}>
                                    <Email fontSize="12px" sx={{ color: "white", mr: 1 }} />
                                    <Typography color="white" fontSize="12px">help@lifeserve.com</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Box sx={{ display: { xs: "block", sm: "flex" }, justifyContent: { xs: "center", sm: "flex- end" }, mt: { xs: 2, sm: 0 } }}>
                                    <Button variant="contained">
                                        Contact & Services
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                        <Divider sx={{ bgcolor: "white", my: 2 }} />
                        <Box>
                            <Instagram sx={{ color: "white", mr: 1 }} />
                            <Facebook sx={{ color: "white", mr: 1 }} />
                            <Twitter sx={{ color: "white", mr: 1 }} />
                            <YouTube sx={{ color: "white", mr: 1 }} />
                        </Box>
                        <Box display="flex" sx={{ justifyContent: "center" }}>
                            <Typography color="white" fontSize="12px">©LIFESERVE, 2022. ALL RIGHTS RESERVED</Typography>
                        </Box>
                    </Container>
                </Box >
            }
        </Box >
    )
}

export default Footer;