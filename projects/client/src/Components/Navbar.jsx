import { useState } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem, Divider } from '@mui/material'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MedicationIcon from '@mui/icons-material/Medication';
import MenuIcon from '@mui/icons-material/Menu';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../Redux/Actions/userAction';
import Cookies from 'js-cookie';

const Navbar = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { name } = useSelector((state) => {
        return {
            name: state.userReducer.name
        }
    })

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        dispatch(logoutAction())
        Cookies.remove("userToken");
    }

    return (
        <AppBar position="sticky" style={{ background: 'white', boxShadow: "none" }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Container>
                    <Toolbar disableGutters sx={{ height: 75 }}>
                        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', justifyContent: 'flex-end', width: '100%' }}>
                            <Box>
                                <img src='https://i.ibb.co/mv7cmnF/Life-Serve-Logo-1.png' style={{ maxWidth: 120 }} />
                            </Box>
                            <Box>
                                <Button variant='text' sx={{ ml: 2, color: 'grey.800' }} onClick={() => navigate('/product')}>Product</Button>
                                <Button variant='text' sx={{ ml: 1, color: 'grey.800' }} onClick={() => navigate('/prescription')}>Upload Prescription</Button>
                            </Box>
                            {name ?
                                <>
                                    <Box sx={{ flexGrow: 1, mr: 2 }}>
                                        <Typography color='black' variant='subtitle2' sx={{ textAlign: 'right' }}>
                                            {name ? name.toUpperCase() : null}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Tooltip title='Open settings'>
                                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
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
                                                sx: { width: 200 }
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            open={Boolean(anchorElUser)}
                                            onClose={handleCloseUserMenu}
                                        >
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
                                :
                                <Box sx={{ flexGrow: 1, textAlign: 'right' }}>
                                    <Button variant="outlined" sx={{ mr: 1 }} onClick={() => navigate('/auth/login')}>Login</Button>
                                    <Button variant="contained" onClick={() => navigate('/auth/register')}>Register</Button>
                                </Box>
                            }
                        </Box>
                        <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', justifyContent: 'flex-end', width: '100%' }}>
                            <Box sx={{ width: '25%', textAlign: 'left' }}>
                                <Tooltip title='Open settings'>
                                    <IconButton onClick={handleOpenNavMenu} sx={{ p: 0 }}>
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
                                        sx: { width: 200 }
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElNav)}
                                    onClose={handleCloseNavMenu}
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
                                <img src='https://i.ibb.co/mv7cmnF/Life-Serve-Logo-1.png' style={{ maxWidth: 120 }} />
                            </Box>
                            {name ?
                                <Box>
                                    <Tooltip title='Open settings'>
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
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
                                            sx: { width: 200 }
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >
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
        </AppBar>
    );
};

export default Navbar;