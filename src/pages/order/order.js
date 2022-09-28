import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import RestaurantIcon from '@mui/icons-material/Restaurant'
import AddIcon from '@mui/icons-material/Add'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'

import SwipeableViews from 'react-swipeable-views'
import OrderList from './ordersList/orderList'
import * as actions from '../../redux/actions/order'
const Order = (props) => {
    const theme = useTheme()
    const [value, setValue] = useState(0)
    const handleChange = (event, newValue) => {
        setValue(newValue)
    }
    const handleChangeIndex = (index) => {
        setValue(index)
    }
    const navigate = useNavigate()
    useEffect(() => {
        props.dispatch(actions.makeRequests())
        return () => {
            props.dispatch({ type: 'reset-order_page_reducer' })
        }
    }, [])
    return (
        <Grid container>
            <Grid
                item
                mt={2}
                xs={12}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'space-between'}
            >
                <Typography
                    component={'div'}
                    mb={3}
                    variant={'h4'}
                    display={'flex'}
                    alignItems={'center'}
                >
                    <RestaurantIcon sx={{ fontSize: 'inherit' }} />
                    طلباتي
                </Typography>
                <Button onClick={() => navigate(-1)}>
                    <Typography sx={{ fontSize: 17 }}>عودة</Typography>
                    <ArrowBackIcon />
                </Button>
            </Grid>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', width: 1 }}>
                <Tabs
                    centered
                    value={value}
                    onChange={handleChange}
                    aria-label="icon tabs example"
                >
                    <Tab sx={{ fontSize: 17 }} label={'الطلبات الحالية'} />
                    <Tab sx={{ fontSize: 17 }} label={'الطلبات السابقة'} />
                </Tabs>
            </Box>
            <SwipeableViews
                style={{ width: '100%' }}
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <Box p={1} dir={theme.direction}>
                    <OrderList
                        orders={props.orders.filter(
                            (order) => order.OrderStatus !== 5
                        )}
                    />
                </Box>
                <Box p={1} dir={theme.direction}>
                    <OrderList
                        orders={props.orders.filter(
                            (order) => order.OrderStatus === 1
                        )}
                    />
                </Box>
            </SwipeableViews>
        </Grid>
    )
}

export default connect(
    ({ order_page_reducer, authorization_reducer, layout_reducer }) => {
        return {
            orders: order_page_reducer.orders,
            isLoading: order_page_reducer?.isLoading,
        }
    }
)(Order)
