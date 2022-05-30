import * as React from 'react'
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
import { Link, Outlet } from 'react-router-dom'
import { connect } from 'react-redux'
import { snackBar } from '../redux/actions/home'
import SnackBar from '../components/snackBar/snackBar'
const pages = [
    { name: 'حول الشركة', to: 'https://umbrella.ly/about', isExternal: true },
    // { name: 'cart', to: '/cart', isExternal: false },
]

const Layout = (props) => {
    const closeSnackBar = () => {
        props.dispatch(snackBar({ show: false }))
    }
    const [anchorElNav, setAnchorElNav] = React.useState(null)

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget)
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }

    return (
        <Container sx={{ px: 1 }}>
            <SnackBar closeSnackBar={closeSnackBar} snackBar={props.snackBar} />
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
                    </Toolbar>
                </Container>
            </AppBar>
            <Outlet />
        </Container>
    )
}
export default connect(({ home_page_reducer }) => {
    return {
        snackBar: home_page_reducer.snackBar,
    }
})(Layout)
