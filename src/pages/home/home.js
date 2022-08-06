import React, { useState, useEffect, useMemo } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import MenuSection from './menuSection/menuSection'
import { connect } from 'react-redux'
import * as actions from '../../redux/actions/home'
import * as layoutActions from '../../redux/actions/layout'
import { useParams } from 'react-router-dom'
import OrderModal from './orderModal/orderModal'
import CartSection from './cartSection/cartSection'
import SubmitModal from './submitModal/submitModal'
import StoreMallDirectoryOutlinedIcon from '@mui/icons-material/StoreMallDirectoryOutlined'
import AppBar from '@mui/material/AppBar'
import { styled } from '@mui/material/styles'
import Badge from '@mui/material/Badge'
import SwipeableViews from 'react-swipeable-views'
import debounce from 'lodash.debounce'
// import ConfirmCodeModal from './confirmCodeModal/confirmCodeModal'
import { useTheme } from '@mui/material/styles'
export const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}))
const _handleFilterChange = debounce((props) => {
    props.dispatch(actions.handleFilterChange())
}, 300)
const Home = (props) => {
    let { storeID } = useParams()
    useEffect(() => {
        props.dispatch(actions.makeRequests(storeID))
    }, [])
    const theme = useTheme()
    const [value, setValue] = useState(0)
    const handleChange = (event, newValue) => {
        setValue(newValue)
    }
    const handleChangeIndex = (index) => {
        setValue(index)
    }
    function TabPanel(props) {
        const { children, value, index, id, ...other } = props

        return (
            <div
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && <Box sx={{ py: 2 }}>{children}</Box>}
            </div>
        )
    }

    const handleCategoryInputValueChange = (value) => {
        props.dispatch(actions.handleCategoryInputValueChange(value))
    }
    const handleCloseOrderModal = (event, reason) => {
        if (reason && reason === 'backdropClick') return
        props.dispatch(actions.orderModal({ show: false, qty: 1, forName: '' }))
    }
    const handleItemListClick = (item) => {
        props.dispatch(actions.handleItemListClick(item))
    }
    const handlePrefChange = (value, index) => {
        props.dispatch(actions.handlePrefChange(value, index))
    }
    const handleForNameChange = (value) => {
        props.dispatch(
            actions.orderModal({ forName: value, forNameErrMsg: '' })
        )
    }
    const handleQtyChange = ({ id }) => {
        let qty = props.orderModal.qty
        if (id === 'add') {
            qty = qty + 1
        } else if (qty !== 1) {
            qty = qty - 1
        }
        props.dispatch(actions.orderModal({ qty }))
    }
    const addToCart = () => {
        if (props.orderModal.forName.trim() === '') {
            props.dispatch(
                actions.orderModal({ forNameErrMsg: 'يجب تعبأة الحقل' })
            )
            return
        }
        props.dispatch(actions.addToCart())
    }
    const handleRemoveProduct = (index) => {
        props.dispatch(actions.removeFromCart(index))
    }
    const handleToggleSubmitModal = (event, reason) => {
        if (reason && reason === 'backdropClick') return
        if (!props.submitModal.show && !props.loggedIn) {
            props.dispatch(layoutActions.signinModal({ show: true }))
            return
        }
        props.dispatch(actions.submitModal({ show: !props.submitModal.show }))
    }
    const handleSubmitModalInputChange = ({ id, value }) => {
        props.dispatch(actions.submitModal({ [id]: value }))
    }
    const submit = () => {
        props.dispatch(actions.submit(storeID))
    }

    const handleCartQtyChange = ({ id, index }) => {
        props.dispatch(actions.handleCartQtyChange({ id, index }))
    }
    const getCartLength = () => {
        let cartQty = 0
        props.cart.forEach((item) => {
            cartQty += item.qty
        })
        return cartQty
    }
    const forNameAutocompleteChange = (value) => {
        props.dispatch(actions.orderModal({ forNameErrMsg: '' }))
        let listItemIndex = value.items.findIndex(
            (item) => item.Id === props.orderModal.listItem.Id
        )
        if (listItemIndex !== -1) {
            props.dispatch(
                actions.orderModal({
                    forName: value.forName,
                    listItem: value.items[listItemIndex],
                })
            )
        } else {
            props.dispatch(
                actions.orderModal({
                    forName: value.forName,
                    listItem: getDefaultPreferences(),
                })
            )
        }
    }
    const getDefaultPreferences = () => {
        return {
            ...props.orderModal.listItem,
            preferences: props.orderModal.listItem.preferences.map((pref) => {
                return {
                    ...pref,
                    choices: pref.choices.map((choice) => {
                        return { ...choice }
                    }),
                    choiceValue: { ...pref.choice },
                    choice: { ...pref.choice },
                }
            }),
        }
    }
    const handleFilterChange = (value) => {
        props.dispatch({ type: 'home_page-filterValue', data: value })
        _handleFilterChange(props)
    }
    const handleMarkerClick = (item) => {
        props.dispatch(actions.handleMarkerClick(item))
    }
    const handleAddLocation = () => {
        props.dispatch(
            layoutActions.locationModal({ showGuide: true, show: true })
        )
    }
    // const handleToggleConfirmCodeModal = (event, reason) => {
    //     if (reason && reason === 'backdropClick') return
    //     props.dispatch(
    //         actions.confirmCodeModal({ show: !props.confirmCodeModal.show })
    //     )
    // }
    // const handleConfirmCodeModalInputChange = ({ id, value }) => {
    //     props.dispatch(actions.confirmCodeModal({ [id]: value }))
    // }
    // const handleConfirmCodeSubmit = () => {
    //     props.dispatch(actions.handleConfirmCodeSubmit())
    // }
    // const resendConfirmationCode = () => {
    //     props.dispatch(actions.resendConfirmationCode())
    // }
    return (
        <Box>
            <AppBar
                position="static"
                variant={'outlined'}
                elevation={0}
                color={'default'}
            >
                <Typography
                    variant="h5"
                    component="div"
                    py={1}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    <StoreMallDirectoryOutlinedIcon
                        sx={{ fontSize: 'inherit' }}
                    />
                    &nbsp;
                    {props.name}
                </Typography>
            </AppBar>
            <SubmitModal
                handleAddLocation={handleAddLocation}
                handleMarkerClick={handleMarkerClick}
                locations={props.currentUser?.Locations}
                submit={submit}
                handleSubmitModalInputChange={handleSubmitModalInputChange}
                handleToggleSubmitModal={handleToggleSubmitModal}
                submitModal={props.submitModal}
            />

            <OrderModal
                forNameAutocompleteChange={forNameAutocompleteChange}
                forNameOptions={props.forNameOptions}
                addToCart={addToCart}
                handleQtyChange={handleQtyChange}
                handleForNameChange={handleForNameChange}
                handlePrefChange={handlePrefChange}
                handleCloseOrderModal={handleCloseOrderModal}
                orderModal={props.orderModal}
            />
            {/* <ConfirmCodeModal
                resendConfirmationCode={resendConfirmationCode}
                handleConfirmCodeSubmit={handleConfirmCodeSubmit}
                handleConfirmCodeModalInputChange={
                    handleConfirmCodeModalInputChange
                }
                handleToggleConfirmCodeModal={handleToggleConfirmCodeModal}
                confirmCodeModal={props.confirmCodeModal}
            /> */}
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    centered
                    value={value}
                    onChange={handleChange}
                    aria-label="icon tabs example"
                >
                    <Tab icon={<FormatListBulletedIcon />} />
                    <Tab
                        icon={
                            <StyledBadge
                                badgeContent={getCartLength()}
                                color="secondary"
                            >
                                <ShoppingCartIcon />
                            </StyledBadge>
                        }
                    />
                </Tabs>
            </Box>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                {/* <TabPanel value={value} index={0} dir={theme.direction}> */}
                <Box p={1} dir={theme.direction}>
                    <MenuSection
                        isAvailable={props.isAvailable}
                        isLoading={props.isLoading}
                        handleFilterChange={handleFilterChange}
                        filterValue={props.filterValue}
                        cart={props.cart}
                        handleItemListClick={handleItemListClick}
                        filteredListItems={props.filteredListItems}
                        categoryInputValue={props.categoryInputValue}
                        handleCategoryInputValueChange={
                            handleCategoryInputValueChange
                        }
                        categories={props.categories ?? []}
                    />
                </Box>
                {/* </TabPanel> */}
                <Box p={1} dir={theme.direction}>
                    {/* <TabPanel value={value} index={1} dir={theme.direction}> */}
                    <CartSection
                        handleCartQtyChange={handleCartQtyChange}
                        handleToggleSubmitModal={handleToggleSubmitModal}
                        handleRemoveProduct={handleRemoveProduct}
                        cart={props.cart}
                    />
                    {/* </TabPanel> */}
                </Box>
            </SwipeableViews>
        </Box>
    )
}

export default connect(
    ({ home_page_reducer, authorization_reducer }, props) => {
        return {
            data: home_page_reducer.data,
            loggedIn: authorization_reducer.loggedIn,
            currentUser: authorization_reducer.currentUser,
            isLoading: home_page_reducer.isLoading,
            categories: home_page_reducer.data?.StoreMenue?.categories,
            name: home_page_reducer.data?.StoreMenue?.Name,
            isAvailable: home_page_reducer.data?.StoreMenue?.IsAvailable,
            ID: home_page_reducer.data?.StoreMenue?.IsAvailable.ID,
            categoryInputValue: home_page_reducer.categoryInputValue,
            filteredListItems: home_page_reducer.filteredListItems,
            orderModal: home_page_reducer.orderModal,
            submitModal: home_page_reducer.submitModal,
            cart: home_page_reducer.cart,
            forNameOptions: home_page_reducer.forNameOptions,
            filterValue: home_page_reducer.filterValue,
            // confirmCodeModal: home_page_reducer.confirmCodeModal,
        }
    }
)(Home)
