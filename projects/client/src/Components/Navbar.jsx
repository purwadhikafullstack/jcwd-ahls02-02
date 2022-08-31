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
import { Category, History, HowToReg, LoginRounded, Medication, Send } from '@mui/icons-material';
import axios from 'axios'
import { API_URL } from '../helper';
import { toast } from "react-hot-toast"
import { ToastNotification } from './Toast';

const Navbar = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const { name, verified_status, role, profile_picture } = useSelector((state) => {
        return {
            name: state.userReducer.name,
            verified_status: state.userReducer.verified_status,
            role: state.userReducer.role,
            profile_picture: state.userReducer.profile_picture
        }
    })

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(false);
    const [anchorElUserSmall, setAnchorElUserSmall] = useState(null);

    const [disableResend, setDisableResend] = useState(false)

    const handleNavigateProfile = () => {
        setAnchorElUserSmall(false)
        setAnchorElUser(false)
        navigate('/profile')
    }

    const handleNavigateLogin = () => {
        setAnchorElUserSmall(false)
        setAnchorElNav(false)
        setAnchorElUser(false)
        navigate('/auth/login')
    }

    const handleNavigateRegister = () => {
        setAnchorElUserSmall(false)
        setAnchorElNav(false)
        setAnchorElUser(false)
        navigate('/auth/register')
    }

    const handleNavigateProduct = () => {
        setAnchorElUserSmall(false)
        setAnchorElNav(false)
        setAnchorElUser(false)
        navigate('/product')
    }

    const handleNavigatePrescription = () => {
        setAnchorElUserSmall(false)
        setAnchorElNav(false)
        setAnchorElUser(false)
        navigate('/prescription')
    }

    const handleNavigateCart = () => {
        setAnchorElUserSmall(false)
        setAnchorElNav(false)
        setAnchorElUser(false)
        navigate('/cart')
    }

    const handleNavigateOrder = () => {
        setAnchorElUserSmall(false)
        setAnchorElNav(false)
        setAnchorElUser(false)
        navigate('/order')
    }

    const handleNavigateAdminProduct = () => {
        navigate('/admin/product')
        setAnchorElUserSmall(false)
        setAnchorElNav(false)
        setAnchorElUser(false)
    }

    const handleNavigateAdminCategory = () => {
        navigate('/admin/product/category')
        setAnchorElUserSmall(false)
        setAnchorElNav(false)
        setAnchorElUser(false)
    }

    const handleNavigateAdminOrder = () => {
        navigate('/admin/order')
        setAnchorElUserSmall(false)
        setAnchorElNav(false)
        setAnchorElUser(false)
    }

    const handleNavigateAdminHistory = () => {
        navigate('/admin/report')
        setAnchorElUserSmall(false)
        setAnchorElNav(false)
        setAnchorElUser(false)
    }

    const handleLogout = () => {
        dispatch(logoutAction())
        navigate('/auth/login')
        Cookies.remove("userToken");
        setAnchorElNav(false)
        setAnchorElUser(false)
        setAnchorElUserSmall(false)
    }

    const handleResend = () => {
        setDisableResend(true)
        let token = Cookies.get("userToken")
        axios.patch(`${API_URL}/users/verify/send`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            toast.success('Verification sent!')
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
                    if (verified_status === 'verified') {
                        return <>
                            <Button variant='text' sx={{ ml: 2, color: 'grey.800' }} onClick={handleNavigateProduct}>Product</Button>
                            <Button variant='text' sx={{ ml: 1, color: 'grey.800' }} onClick={handleNavigatePrescription}>Upload Prescription</Button>
                        </>
                    } else {
                        return <>
                            <Button variant='text' sx={{ ml: 2, color: 'grey.800' }} onClick={handleNavigateProduct}>Product</Button>
                        </>
                    }
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
                if (role === 'user') {
                    return <>
                        <Box sx={{ flexGrow: 1, mr: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                {verified_status === 'verified' ?
                                    <VerifiedIcon sx={{ mr: 1 }} color='primary' />
                                    :
                                    null
                                }
                                <Typography color='black' variant='subtitle2' sx={{ textAlign: 'right' }}>
                                    {name ? name.toUpperCase() : null}
                                </Typography>
                            </Box>
                        </Box>
                        <Box>
                            <Tooltip title='Open settings'>
                                <IconButton onClick={(e) => setAnchorElUser(e.currentTarget)} sx={{ p: 0 }}>
                                    <Avatar alt={`profile-picture-${name}`} src={profile_picture && `${API_URL}${profile_picture}`} />
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
                                open={anchorElUser}
                                onClose={() => setAnchorElUser(false)}
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
                                <MenuItem onClick={handleNavigateProfile}>
                                    <AccountCircleOutlinedIcon sx={{ mr: 1 }} />
                                    <Typography textAlign="center">Profile</Typography>
                                </MenuItem>
                                {verified_status === 'verified' ?
                                    <>
                                        <MenuItem onClick={handleNavigatePrescription}>
                                            <MedicationIcon sx={{ mr: 1 }} />
                                            <Typography textAlign="center">Prescription</Typography>
                                        </MenuItem>
                                        <MenuItem onClick={handleNavigateCart}>
                                            <ShoppingCartIcon sx={{ mr: 1 }} />
                                            <Typography textAlign="center">Cart</Typography>
                                        </MenuItem>
                                        <MenuItem onClick={handleNavigateOrder}>
                                            <ShoppingBagIcon sx={{ mr: 1 }} />
                                            <Typography textAlign="center">Order</Typography>
                                        </MenuItem>
                                    </>
                                    :
                                    <>
                                        <MenuItem disabled onClick={handleNavigatePrescription}>
                                            <MedicationIcon sx={{ mr: 1 }} />
                                            <Typography textAlign="center">Prescription</Typography>
                                        </MenuItem>
                                        <MenuItem disabled onClick={handleNavigateCart}>
                                            <ShoppingCartIcon sx={{ mr: 1 }} />
                                            <Typography textAlign="center">Cart</Typography>
                                        </MenuItem>
                                        <MenuItem disabled onClick={handleNavigateOrder}>
                                            <ShoppingBagIcon sx={{ mr: 1 }} />
                                            <Typography textAlign="center">Order</Typography>
                                        </MenuItem>
                                    </>
                                }
                                <Divider />
                                <MenuItem onClick={handleLogout}>
                                    <Typography textAlign="center">Log Out</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    </>
                } else {
                    return <>
                        <Box sx={{ flexGrow: 1, mr: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                <Typography color='black' variant='subtitle2' sx={{ textAlign: 'right' }}>
                                    {name ? name.toUpperCase() : null}
                                </Typography>
                            </Box>
                        </Box>
                        <Box>
                            <Tooltip title='Open settings'>
                                <IconButton onClick={(e) => setAnchorElUser(e.currentTarget)} sx={{ p: 0 }}>
                                    <Avatar alt={`profile-picture-${name}`} src={profile_picture && `${API_URL}${profile_picture}`} />
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
                                open={anchorElUser}
                                onClose={() => setAnchorElUser(false)}
                            >
                                <MenuItem onClick={handleNavigateAdminProduct}>
                                    <Medication sx={{ mr: 1 }} />
                                    <Typography textAlign="center">Product Settings</Typography>
                                </MenuItem>
                                <MenuItem onClick={handleNavigateAdminCategory}>
                                    <Category sx={{ mr: 1 }} />
                                    <Typography textAlign="center">Category Settings</Typography>
                                </MenuItem>
                                <MenuItem onClick={handleNavigateAdminOrder}>
                                    <ShoppingBagIcon sx={{ mr: 1 }} />
                                    <Typography textAlign="center">Order</Typography>
                                </MenuItem>
                                <MenuItem onClick={handleNavigateAdminHistory}>
                                    <History sx={{ mr: 1 }} />
                                    <Typography textAlign="center">History</Typography>
                                </MenuItem>
                                <Divider />
                                <MenuItem onClick={handleLogout}>
                                    <Typography textAlign="center">Log Out</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    </>
                }
            } else {
                return <Box sx={{ flexGrow: 1, textAlign: 'right' }}>
                    <Button variant="outlined" sx={{ mr: 1 }} onClick={handleNavigateLogin}>Login</Button>
                    <Button variant="contained" onClick={handleNavigateRegister}>Register</Button>
                </Box>
            }
        }
    }

    const printButtonSmall = () => {
        if (location.pathname.includes('verification') || location.pathname.includes('reset')) {
            return null
        } else {
            if (name) {
                if (role === 'user') {
                    return <>
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
                                    <Typography textAlign="center" onClick={handleNavigateProduct}>Product</Typography>
                                </MenuItem>
                                <MenuItem>
                                    <HealthAndSafetyIcon sx={{ mr: 1 }} />
                                    <Typography textAlign="center" onClick={handleNavigatePrescription}>Upload Perscription</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                        <Box sx={{ width: '50%' }}>
                            <Button onClick={() => navigate('/')}>
                                <img src='https://i.ibb.co/mv7cmnF/Life-Serve-Logo-1.png' alt='logo' style={{ maxWidth: 120 }} />
                            </Button>
                        </Box>
                        <Box sx={{ flexGrow: 1, textAlign: 'right', width: '25%' }}>
                            <Tooltip title='Open settings'>
                                <IconButton onClick={(e) => setAnchorElUserSmall(e.currentTarget)} sx={{ p: 0 }}>
                                    <Avatar alt={`profile-picture-${name}`} src={profile_picture && `${API_URL}${profile_picture}`} />
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
                                <MenuItem onClick={handleNavigateProfile}>
                                    <AccountCircleOutlinedIcon sx={{ mr: 1 }} />
                                    <Typography textAlign="center" >Profile</Typography>
                                </MenuItem>
                                {verified_status === 'verified' ?
                                    <>
                                        <MenuItem onClick={handleNavigatePrescription}>
                                            <MedicationIcon sx={{ mr: 1 }} />
                                            <Typography textAlign="center">Prescription</Typography>
                                        </MenuItem>
                                        <MenuItem onClick={handleNavigateCart}>
                                            <ShoppingCartIcon sx={{ mr: 1 }} />
                                            <Typography textAlign="center">Cart</Typography>
                                        </MenuItem>
                                        <MenuItem onClick={handleNavigateOrder}>
                                            <ShoppingBagIcon sx={{ mr: 1 }} />
                                            <Typography textAlign="center">Order</Typography>
                                        </MenuItem>
                                    </>
                                    :
                                    <>
                                        <MenuItem disabled onClick={handleNavigatePrescription}>
                                            <MedicationIcon sx={{ mr: 1 }} />
                                            <Typography textAlign="center">Prescription</Typography>
                                        </MenuItem>
                                        <MenuItem disabled onClick={handleNavigateCart}>
                                            <ShoppingCartIcon sx={{ mr: 1 }} />
                                            <Typography textAlign="center">Cart</Typography>
                                        </MenuItem>
                                        <MenuItem disabled onClick={handleNavigateOrder}>
                                            <ShoppingBagIcon sx={{ mr: 1 }} />
                                            <Typography textAlign="center">Order</Typography>
                                        </MenuItem>
                                    </>
                                }
                                {/* <MenuItem onClick={handleNavigatePrescription}>
                                    <HealthAndSafetyIcon sx={{ mr: 1 }} />
                                    <Typography textAlign="center" >Prescription</Typography>
                                </MenuItem>
                                <MenuItem onClick={handleNavigateCart}>
                                    <ShoppingCartIcon sx={{ mr: 1 }} />
                                    <Typography textAlign="center" >Cart</Typography>
                                </MenuItem>
                                <MenuItem onClick={handleNavigateOrder}>
                                    <ShoppingBagIcon sx={{ mr: 1 }} />
                                    <Typography textAlign="center" >Order</Typography>
                                </MenuItem> */}
                                <Divider />
                                <MenuItem onClick={handleLogout}>
                                    <Typography textAlign="center">Log Out</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    </>
                } else {
                    return <>
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
                                    <Typography textAlign="center" onClick={handleNavigateProduct}>Product</Typography>
                                </MenuItem>
                                <MenuItem>
                                    <HealthAndSafetyIcon sx={{ mr: 1 }} />
                                    <Typography textAlign="center" onClick={handleNavigatePrescription}>Upload Perscription</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                        <Box sx={{ width: '50%' }}>
                            <Button onClick={() => navigate('/')}>
                                <img src='https://i.ibb.co/mv7cmnF/Life-Serve-Logo-1.png' alt='logo' style={{ maxWidth: 120 }} />
                            </Button>
                        </Box>
                        <Box sx={{ flexGrow: 1, textAlign: 'right', width: '25%' }}>
                            <Tooltip title='Open settings'>
                                <IconButton onClick={(e) => setAnchorElUserSmall(e.currentTarget)} sx={{ p: 0 }}>
                                    <Avatar alt={`profile-picture-${name}`} src={profile_picture && `${API_URL}${profile_picture}`} />
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
                                <MenuItem onClick={handleNavigateAdminProduct}>
                                    <Medication sx={{ mr: 1 }} />
                                    <Typography textAlign="center">Product Settings</Typography>
                                </MenuItem>
                                <MenuItem onClick={handleNavigateAdminCategory}>
                                    <Category sx={{ mr: 1 }} />
                                    <Typography textAlign="center">Category Settings</Typography>
                                </MenuItem>
                                <MenuItem onClick={handleNavigateAdminOrder}>
                                    <ShoppingBagIcon sx={{ mr: 1 }} />
                                    <Typography textAlign="center">Order</Typography>
                                </MenuItem>
                                <MenuItem onClick={handleNavigateAdminHistory}>
                                    <History sx={{ mr: 1 }} />
                                    <Typography textAlign="center">History</Typography>
                                </MenuItem>
                                <Divider />
                                <MenuItem onClick={handleLogout}>
                                    <Typography textAlign="center">Log Out</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    </>
                }

            } else {
                return <>
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
                                sx: { width: 175 }
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={() => setAnchorElNav(null)}
                        >
                            <MenuItem>
                                <LoginRounded sx={{ mr: 1 }} />
                                <Typography textAlign="center" onClick={handleNavigateLogin}>
                                    Login
                                </Typography>
                            </MenuItem>
                            <MenuItem>
                                <HowToReg sx={{ mr: 1 }} />
                                <Typography textAlign="center" onClick={handleNavigateRegister}>
                                    Register
                                </Typography>
                            </MenuItem>
                            <MenuItem>
                                <HealthAndSafetyIcon sx={{ mr: 1 }} />
                                <Typography textAlign="center" onClick={handleNavigateProduct}>
                                    Product</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                    <Box sx={{ width: '50%' }}>
                        <Button onClick={() => {
                            setAnchorElNav(false)
                            navigate('/')
                        }}>
                            <img src='https://i.ibb.co/mv7cmnF/Life-Serve-Logo-1.png' alt='logo' style={{ maxWidth: 120 }} />
                        </Button>
                    </Box>
                    <Box sx={{ width: '25%' }} />
                </>
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
                            {printButtonSmall()}
                        </Box>
                    </Toolbar>
                </Container>
            </Box>
            <ToastNotification />
        </AppBar>
    );
};

export default Navbar;