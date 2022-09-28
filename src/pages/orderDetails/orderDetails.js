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
import { useParams } from 'react-router-dom'

import SwipeableViews from 'react-swipeable-views'
import OrderList from './ordersList/orderList'
import * as actions from '../../redux/actions/orderDetails'
const Order = (props) => {
    // const theme = useTheme()
    // const [value, setValue] = useState(0)
    // const handleChange = (event, newValue) => {
    //     setValue(newValue)
    // }
    // const handleChangeIndex = (index) => {
    //     setValue(index)
    // }
    const navigate = useNavigate()
    let { orderId } = useParams()
    useEffect(() => {
        props.dispatch(actions.makeRequests(orderId))
        return () => {
            props.dispatch({ type: 'reset-orderDetails_page_reducer' })
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
                    طلبية #{props.orderDetails?.OrderID}
                </Typography>
                <Button onClick={() => navigate(-1)}>
                    <Typography sx={{ fontSize: 17 }}>عودة</Typography>
                    <ArrowBackIcon />
                </Button>
            </Grid>
            <Grid item xs={12}>
                <OrderList orderItems={props.orderDetails?.items ?? []} />
            </Grid>
        </Grid>
    )
}

export default connect(
    ({ orderDetails_page_reducer, authorization_reducer, layout_reducer }) => {
        return {
            orderDetails: orderDetails_page_reducer.orderDetails,
            isLoading: orderDetails_page_reducer?.isLoading,
        }
    }
)(Order)
