import React, { useState, useEffect } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import MenuSection from './menuSection/menuSection'
import { connect } from 'react-redux'
import * as actions from '../../redux/actions/home'
import { useParams } from 'react-router-dom'
import OrderModal from './orderModal/orderModal'
import CartSection from './cartSection/cartSection'
import SubmitModal from './submitModal/submitModal'
import StoreMallDirectoryOutlinedIcon from '@mui/icons-material/StoreMallDirectoryOutlined'
import AppBar from '@mui/material/AppBar'
import { styled } from '@mui/material/styles'
import Badge from '@mui/material/Badge'
export const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}))

const Home = (props) => {
    let { storeID } = useParams()
    useEffect(() => {
        props.dispatch(actions.makeRequests(storeID))
    }, [])
    const [value, setValue] = useState(0)
    const handleChange = (event, newValue) => {
        setValue(newValue)
    }
    function TabPanel(props) {
        const { children, value, index, id, ...other } = props

        return (
            <div
                role="tabpanel"
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
    const handleCloseOrderModal = () => {
        props.dispatch(actions.orderModal({ show: false }))
    }
    const handleItemListClick = (item) => {
        props.dispatch(actions.handleItemListClick(item))
    }
    const handlePrefChange = (value, index) => {
        props.dispatch(actions.handlePrefChange(value, index))
    }
    const handleForNameChange = (value) => {
        props.dispatch(actions.orderModal({ forName: value }))
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
        props.dispatch(actions.addToCart())
    }
    const handleRemoveProduct = (index) => {
        props.dispatch(actions.removeFromCart(index))
    }
    const handleToggleSubmitModal = (event, reason) => {
        if (reason && reason === 'backdropClick') return
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
    return (
        <Box sx={{ width: '100%' }}>
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
                    {props.data?.Name}
                </Typography>
            </AppBar>
            <SubmitModal
                submit={submit}
                handleSubmitModalInputChange={handleSubmitModalInputChange}
                handleToggleSubmitModal={handleToggleSubmitModal}
                submitModal={props.submitModal}
            />
            <OrderModal
                addToCart={addToCart}
                handleQtyChange={handleQtyChange}
                handleForNameChange={handleForNameChange}
                handlePrefChange={handlePrefChange}
                handleCloseOrderModal={handleCloseOrderModal}
                orderModal={props.orderModal}
            />
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
            <TabPanel value={value} index={0}>
                <MenuSection
                    cart={props.cart}
                    handleItemListClick={handleItemListClick}
                    listItems={props.listItems}
                    categoryInputValue={props.categoryInputValue}
                    handleCategoryInputValueChange={
                        handleCategoryInputValueChange
                    }
                    categories={props.categories ?? []}
                />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <CartSection
                    handleCartQtyChange={handleCartQtyChange}
                    handleToggleSubmitModal={handleToggleSubmitModal}
                    handleRemoveProduct={handleRemoveProduct}
                    cart={props.cart}
                />
            </TabPanel>
        </Box>
    )
}

export default connect(({ home_page_reducer }, props) => {
    return {
        data: home_page_reducer.data,
        isLoading: home_page_reducer.isLoading,
        categories: home_page_reducer.data?.categories,
        name: home_page_reducer.data?.Name,
        isAvailable: home_page_reducer.data?.IsAvailable,
        ID: home_page_reducer.data?.IsAvailable.ID,
        categoryInputValue: home_page_reducer.categoryInputValue,
        listItems: home_page_reducer.listItems,
        orderModal: home_page_reducer.orderModal,
        submitModal: home_page_reducer.submitModal,
        cart: home_page_reducer.cart,
    }
})(Home)
