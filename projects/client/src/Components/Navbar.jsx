import { useState } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem, Divider } from '@mui/material'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MedicationIcon from '@mui/icons-material/Medication';
import MenuIcon from '@mui/icons-material/Menu';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../Redux/Actions/userAction';
import Cookies from 'js-cookie';
import VerifiedIcon from '@mui/icons-material/Verified';
import { Send } from '@mui/icons-material';
import axios from 'axios'
import { API_URL } from '../helper';
import SnackBarStatus from './atoms/SnackBar';

const Navbar = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const { name, verified_status, role } = useSelector((state) => {
        return {
            name: state.userReducer.name,
            verified_status: state.userReducer.verified_status,
            role: state.userReducer.role
        }
    })

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [anchorElUserSmall, setAnchorElUserSmall] = useState(null);

    const [openSnackbar, setOpenSnackbar] = useState(false)

    const [disableResend, setDisableResend] = useState(false)

    const handleLogout = () => {
        dispatch(logoutAction())
        navigate('/auth/login')
        Cookies.remove("userToken");
    }

    const handleResend = () => {
        setDisableResend(true)
        let token = Cookies.get("userToken")
        axios.patch(`${API_URL}/users/verify/send`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            setOpenSnackbar(true)
            setDisableResend(false)
        }).catch((error) => {
            console.log(error)
            setDisableResend(false)

        })
    }

    const printOptions = () => {
        if (location.pathname.includes('verification') || location.pathname.includes('verification')) {
            return null
        } else {
            if (role) {
                if (role === 'user') {
                    return <>
                        <Button variant='text' sx={{ ml: 2, color: 'grey.800' }} onClick={() => navigate('/product')}>Product</Button>
                        <Button variant='text' sx={{ ml: 1, color: 'grey.800' }} onClick={() => navigate('/prescription')}>Upload Prescription</Button>
                    </>
                } else {
                    return null
                }
            }
        }
    }

    const printButton = () => {
        if (location.pathname.includes('verification') || location.pathname.includes('reset')) {
            return null
        } else {
            if (name) {
                return <>
                    <Box sx={{ flexGrow: 1, mr: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                            {verified_status === 'verified' ?
                                <VerifiedIcon sx={{ mr: 1 }} color='primary' />
                                :
                                null
                                // <Button variant="contained" sx={{ mr: 2 }}>Resend Verification</Button>
                            }
                            <Typography color='black' variant='subtitle2' sx={{ textAlign: 'right' }}>
                                {name ? name.toUpperCase() : null}
                            </Typography>

                        </Box>

                    </Box>
                    <Box>
                        <Tooltip title='Open settings'>
                            <IconButton onClick={(e) => setAnchorElUser(e.currentTarget)} sx={{ p: 0 }}>
                                <Avatar />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            PaperProps={{
                                sx: { width: 225 }
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={() => setAnchorElUser(null)}
                        >
                            {verified_status === 'verified' ?
                                null
                                :
                                <>
                                    <MenuItem>
                                        <Button variant="text" size="small" sx={{ mr: 2 }} startIcon={<Send />} disabled={disableResend} onClick={handleResend}>
                                            Resend Verification
                                        </Button>
                                    </MenuItem>
                                    <Divider />
                                </>

                            }
                            <MenuItem onClick={() => navigate('/profile')}>
                                <AccountCircleOutlinedIcon sx={{ mr: 1 }} />
                                <Typography textAlign="center">Profile</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => navigate('/prescription')}>
                                <MedicationIcon sx={{ mr: 1 }} />
                                <Typography textAlign="center">Prescription</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => navigate('/cart')}>
                                <ShoppingCartIcon sx={{ mr: 1 }} />
                                <Typography textAlign="center">Cart</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => navigate('/order')}>
                                <ShoppingBagIcon sx={{ mr: 1 }} />
                                <Typography textAlign="center">Order</Typography>
                            </MenuItem>
                            <Divider />
                            <MenuItem onClick={handleLogout}>
                                <Typography textAlign="center">Log Out</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </>
            } else {
                return <Box sx={{ flexGrow: 1, textAlign: 'right' }}>
                    <Button variant="outlined" sx={{ mr: 1 }} onClick={() => navigate('/auth/login')}>Login</Button>
                    <Button variant="contained" onClick={() => navigate('/auth/register')}>Register</Button>
                </Box>
            }
        }
    }

    return (
        <AppBar position="sticky" style={{ background: 'white', boxShadow: "none", zIndex: 20 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Container>
                    <Toolbar disableGutters sx={{ height: 75 }}>
                        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', width: '100%' }}>
                            <Button onClick={() => navigate('/')}>
                                <img src='https://i.ibb.co/mv7cmnF/Life-Serve-Logo-1.png' alt='logo' style={{ maxWidth: 120 }} />
                            </Button>
                            <Box>
                                {printOptions()}
                            </Box>
                            {printButton()}
                        </Box>
                        <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', justifyContent: 'flex-end', width: '100%' }}>
                            <Box sx={{ width: '25%', textAlign: 'left' }}>
                                <Tooltip title='Open settings'>
                                    <IconButton onClick={(e) => setAnchorElNav(e.currentTarget)} sx={{ p: 0 }}>
                                        <MenuIcon />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElNav}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    PaperProps={{
                                        sx: { width: 225 }
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElNav)}
                                    onClose={() => setAnchorElNav(null)}
                                >
                                    <MenuItem>
                                        <MedicationIcon sx={{ mr: 1 }} />
                                        <Typography textAlign="center" onClick={() => navigate('/product')}>Product</Typography>
                                    </MenuItem>
                                    <MenuItem>
                                        <HealthAndSafetyIcon sx={{ mr: 1 }} />
                                        <Typography textAlign="center" onClick={() => navigate('/perscription')}>Upload Perscription</Typography>
                                    </MenuItem>
                                </Menu>
                            </Box>
                            <Box sx={{ width: '50%' }}>
                                <img src='https://i.ibb.co/mv7cmnF/Life-Serve-Logo-1.png' alt='logo' style={{ maxWidth: 120 }} />
                            </Box>
                            {name ?
                                <Box sx={{ flexGrow: 1, textAlign: 'right', width: '25%' }}>
                                    <Tooltip title='Open settings'>
                                        <IconButton onClick={(e) => setAnchorElUserSmall(e.currentTarget)} sx={{ p: 0 }}>
                                            {/* <IconButton sx={{ p: 0 }}> */}
                                            <Avatar />
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        sx={{ mt: '45px' }}
                                        id="menu-appbar"
                                        anchorEl={anchorElUserSmall}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        PaperProps={{
                                            sx: { width: 225 }
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorElUserSmall)}
                                        onClose={() => setAnchorElUserSmall(null)}
                                    >
                                        {verified_status === 'verified' ?
                                            null
                                            :
                                            <>
                                                <MenuItem>
                                                    <Button variant="text" size="small" sx={{ mr: 2 }} startIcon={<Send />} disabled={disableResend} onClick={handleResend}>
                                                        Resend Verification
                                                    </Button>
                                                </MenuItem>
                                                <Divider />
                                            </>
                                        }
                                        <MenuItem onClick={() => navigate('/profile')}>
                                            <AccountCircleOutlinedIcon sx={{ mr: 1 }} />
                                            <Typography textAlign="center" >Profile</Typography>
                                        </MenuItem>
                                        <MenuItem onClick={() => navigate('/prescription')}>
                                            <HealthAndSafetyIcon sx={{ mr: 1 }} />
                                            <Typography textAlign="center" >Prescription</Typography>
                                        </MenuItem>
                                        <MenuItem onClick={() => navigate('/cart')}>
                                            <ShoppingCartIcon sx={{ mr: 1 }} />
                                            <Typography textAlign="center" >Cart</Typography>
                                        </MenuItem>
                                        <MenuItem onClick={() => navigate('/order')}>
                                            <ShoppingBagIcon sx={{ mr: 1 }} />
                                            <Typography textAlign="center" >Order</Typography>
                                        </MenuItem>
                                        <Divider />
                                        <MenuItem onClick={handleLogout}>
                                            <Typography textAlign="center">Log Out</Typography>
                                        </MenuItem>
                                    </Menu>
                                </Box>
                                :
                                <Box sx={{ flexGrow: 1, textAlign: 'right', width: '25%' }}>
                                    <Button size='small' variant="outlined" sx={{ mr: 1 }} onClick={() => navigate('/auth/login')}>Login</Button>
                                    <Button size='small' variant="contained" onClick={() => navigate('/auth/register')}>Register</Button>
                                </Box>
                            }
                        </Box>
                    </Toolbar>
                </Container>
            </Box>
            <SnackBarStatus
                open={openSnackbar}
                setOpen={setOpenSnackbar}
                message='Verification email sent!'
                severity='success'
            />
        </AppBar>
    );
};

export default Navbar;