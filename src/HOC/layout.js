import React, { useEffect } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import Divider from '@mui/material/Divider'
import LogoutIcon from '@mui/icons-material/Logout'
import { Link, Outlet } from 'react-router-dom'
import { connect } from 'react-redux'
import { snackBar } from '../redux/actions/home'
import SnackBar from '../components/snackBar/snackBar'
import { styled, alpha } from '@mui/material/styles'
import * as actions from '../redux/actions/layout'
import * as authActions from '../redux/actions/authorization'
import SigninModal from '../components/signinModal/signinModal'
import { useNavigate } from 'react-router-dom'
import ConfirmCodeModal from '../components/confirmCodeModal/confirmCodeModal'
import LocationModal from '../components/locationModal/locationModal'
import debounce from 'lodash.debounce'

const pages = [
    { name: 'حول الشركة', to: 'https://umbrella.ly/about', isExternal: true },
    // { name: 'cart', to: '/cart', isExternal: false },
]
const settings = ['Profile', 'Account', 'Dashboard', 'Logout']
const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        // marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light'
                ? 'rgb(55, 65, 81)'
                : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            fontSize: 15,
            '& .MuiSvgIcon-root': {
                fontSize: 19,
                color: theme.palette.secondary.main,
                // marginRight: theme.spacing(1),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity
                ),
            },
        },
    },
}))
const _updateMapCenter = debounce(({ lat, lng }, props) => {
    props.dispatch(actions.locationModal({ center: { lat, lng } }))
}, 300)

const _updateMapZoom = debounce(({ zoom }, props) => {
    props.dispatch(actions.locationModal({ zoom }))
}, 300)
const Layout = (props) => {
    useEffect(() => {
        props.dispatch(authActions.authCheck())
    }, [])
    const navigate = useNavigate()

    const closeSnackBar = () => {
        props.dispatch(snackBar({ show: false }))
    }
    const [anchorElNav, setAnchorElNav] = React.useState(null)
    const [anchorElUser, setAnchorElUser] = React.useState(null)
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget)
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget)
    }
    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }

    const handleToggleSigninModal = (event, reason) => {
        if (reason && reason === 'backdropClick') return
        props.dispatch(actions.signinModal({ show: !props.signinModal.show }))
    }
    const handleSigninModalInputChange = ({ id, value }) => {
        props.dispatch(
            actions.signinModal({ [id]: value, [id + 'ErrorMsg']: '' })
        )
    }

    const signin = () => {
        try {
            props.dispatch(authActions.handleSigninValidation())
            props.dispatch(authActions.handleSignin())
        } catch (err) {
            const errors = JSON.parse(err.message)
            errors.forEach((item) => {
                props.dispatch(
                    actions.signinModal({ [item.id]: item.errorMsg })
                )
            })
        }
    }
    const handleLoginClick = () => {
        props.dispatch(actions.signinModal({ show: true }))
    }
    const handleSignoutClick = () => {
        props.dispatch(authActions.signout())
    }

    const handleToggleConfirmCodeModal = (event, reason) => {
        if (reason && reason === 'backdropClick') return
        props.dispatch(
            actions.confirmCodeModal({ show: !props.confirmCodeModal.show })
        )
    }
    const handleConfirmCodeModalInputChange = ({ id, value }) => {
        props.dispatch(actions.confirmCodeModal({ [id]: value }))
    }
    const handleConfirmCodeSubmit = () => {
        props.dispatch(authActions.verifyOTP_and_signin())
    }
    const resendConfirmationCode = () => {
        props.dispatch(authActions.handleResendOTP())
    }

    const handleFindUserLocation = () => {
        props.dispatch(actions.handleFindUserLocation())
    }
    const updateMapZoom = ({ zoom }) => {
        _updateMapZoom({ zoom }, props)
    }
    const toggleLocationModal = () => {
        props.dispatch(
            actions.locationModal({ show: !props.locationModal.show })
        )
    }
    const updateMapCenter = ({ lat, lng }) => {
        _updateMapCenter({ lat, lng }, props)
        props.dispatch(
            actions.locationModal({ location: { lat, lng }, showGuide: false })
        )
    }
    const handleLocationSubmit = () => {
        props.dispatch(actions.handleLocationSubmit())
    }
    const handleLocationModalInputChange = ({ id, value }) => {
        props.dispatch(actions.locationModal({ [id]: value }))
    }
    return (
        <Container sx={{ px: 1 }}>
            <SnackBar closeSnackBar={closeSnackBar} snackBar={props.snackBar} />
            <LocationModal
                locations={props.currentUser?.Locations}
                handleFindUserLocation={handleFindUserLocation}
                handleLocationSubmit={handleLocationSubmit}
                updateMapCenter={updateMapCenter}
                updateMapZoom={updateMapZoom}
                locationModal={props.locationModal}
                toggleLocationModal={toggleLocationModal}
                handleLocationModalInputChange={handleLocationModalInputChange}
            />
            <SigninModal
                signin={signin}
                handleSigninModalInputChange={handleSigninModalInputChange}
                signinModal={props.signinModal}
                handleToggleSigninModal={handleToggleSigninModal}
            />
            <ConfirmCodeModal
                resendConfirmationCode={resendConfirmationCode}
                handleConfirmCodeSubmit={handleConfirmCodeSubmit}
                handleConfirmCodeModalInputChange={
                    handleConfirmCodeModalInputChange
                }
                handleToggleConfirmCodeModal={handleToggleConfirmCodeModal}
                confirmCodeModal={props.confirmCodeModal}
            />
            <AppBar position="static">
                <Container>
                    <Toolbar disableGutters>
                        <Box
                            sx={{
                                display: { xs: 'none', md: 'block' },
                            }}
                        >
                            <Typography
                                variant="h6"
                                noWrap
                                component="span"
                                href="/"
                                sx={{
                                    fontWeight: 700,
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }}
                            >
                                المظلة للخدمات الإلكترونية
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: { xs: 'flex', md: 'none' },
                            }}
                        >
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block' },
                                }}
                            >
                                {pages.map((page) => (
                                    <Typography
                                        key={page.name}
                                        onClick={handleCloseNavMenu}
                                        component={page.isExternal ? 'a' : Link}
                                        target={
                                            page.isExternal
                                                ? '_blank'
                                                : undefined
                                        }
                                        href={page.to}
                                        to={page.to}
                                        sx={{
                                            textDecoration: 'none',
                                            color: 'black',
                                        }}
                                    >
                                        <MenuItem>
                                            <Typography textAlign="center">
                                                {page.name}
                                            </Typography>
                                        </MenuItem>
                                    </Typography>
                                ))}
                            </Menu>
                        </Box>
                        <Typography
                            variant="h6"
                            noWrap
                            component="span"
                            sx={{
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontWeight: 700,
                                color: 'inherit',
                            }}
                        >
                            المظلة للخدمات الإلكترونية
                        </Typography>
                        <Box
                            sx={{
                                flexGrow: 1,
                                paddingRight: '1rem',
                                display: { xs: 'none', md: 'flex' },
                            }}
                        >
                            {pages.map((page) => (
                                <Typography
                                    key={page.name}
                                    onClick={handleCloseNavMenu}
                                    component={page.isExternal ? 'a' : Link}
                                    target={
                                        page.isExternal ? '_blank' : undefined
                                    }
                                    href={page.to}
                                    to={page.to}
                                    sx={{
                                        textDecoration: 'none',
                                        color: 'black',
                                    }}
                                >
                                    <Button
                                        sx={{
                                            my: 2,
                                            color: 'white',
                                            display: 'block',
                                        }}
                                    >
                                        {page.name}
                                    </Button>
                                </Typography>
                            ))}
                        </Box>
                        {/* <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton
                                    onClick={handleOpenUserMenu}
                                    sx={{ p: 0 }}
                                >
                                    <Avatar alt="Remy Sharp" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem
                                    onClick={() => {
                                        navigate('/location')
                                        handleCloseUserMenu()
                                    }}
                                >
                                    مواقعي
                                </MenuItem>
                                <Divider />
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <LogoutIcon />
                                    &nbsp;تسجيل خروج
                                </MenuItem>
                            </Menu>
                        </Box> */}
                        {props.authChecked ? (
                            props.loggedIn ? (
                                <Box sx={{ flexGrow: 0 }}>
                                    <Tooltip title="الخيارات">
                                        <IconButton
                                            onClick={handleOpenUserMenu}
                                            sx={{ p: 0 }}
                                        >
                                            <Avatar
                                                alt={
                                                    props.currentUser
                                                        ?.ClientName
                                                }
                                                src="/static/images/avatar/2.jpg"
                                            />
                                        </IconButton>
                                    </Tooltip>
                                    <StyledMenu
                                        id="demo-customized-menu"
                                        MenuListProps={{
                                            'aria-labelledby':
                                                'demo-customized-button',
                                        }}
                                        sx={{ mt: '45px' }}
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'left',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'left',
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        {/* <MenuItem
                                            onClick={() => {
                                                handleCloseUserMenu()
                                                handleTogglePersonalInfoModal()
                                            }}
                                            disableRipple
                                        >
                                            <InfoIcon />
                                            &nbsp; معلوماتي
                                        </MenuItem>
                                        <MenuItem
                                            disableRipple
                                            onClick={handleCloseUserMenu}
                                        >
                                            <FormatListBulletedIcon />
                                            &nbsp; طلباتي
                                        </MenuItem>
                                        <Divider /> */}
                                        <MenuItem
                                            disableRipple
                                            onClick={() => {
                                                handleSignoutClick()
                                                handleCloseUserMenu()
                                            }}
                                        >
                                            <LogoutIcon />
                                            &nbsp; تسجيل خروج
                                        </MenuItem>
                                    </StyledMenu>
                                </Box>
                            ) : (
                                <Button
                                    onClick={handleLoginClick}
                                    color="inherit"
                                >
                                    تسجيل دخول
                                </Button>
                            )
                        ) : null}
                    </Toolbar>
                </Container>
            </AppBar>

            <Outlet />
        </Container>
    )
}
export default connect(
    ({ home_page_reducer, layout_reducer, authorization_reducer }) => {
        return {
            snackBar: home_page_reducer.snackBar,
            signinModal: layout_reducer.signinModal,
            confirmCodeModal: layout_reducer.confirmCodeModal,
            loggedIn: authorization_reducer.loggedIn,
            authChecked: authorization_reducer.authChecked,
            currentUser: authorization_reducer.currentUser,
            locationModal: layout_reducer.locationModal,
        }
    }
)(Layout)
