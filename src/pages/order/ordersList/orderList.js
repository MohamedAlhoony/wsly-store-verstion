import React from 'react'
import {
    Grid,
    CardActions,
    Box,
    CardHeader,
    Card,
    IconButton,
    CardContent,
    Typography,
    Chip,
    Avatar,
    Button,
    // Badge,
    // colors,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

import moment from 'moment/moment'
const getOrders = (orders, navigate) => {
    return orders.map((order, key) => {
        return (
            <Grid
                item
                xs={6}
                sm={4}
                md={3}
                key={key}
                justifyContent={'center'}
                sx={{ display: 'flex' }}
            >
                <Card
                    variant={'elevation'}
                    elevation={2}
                    sx={{
                        width: 1,
                        height: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                    }}
                >
                    <CardHeader
                        title={order.StoreName}
                        subheader={moment(order.OrderDate)
                            .format(' YYYY-MM-DD h:mm a')
                            .replace('pm', 'مساءًا')
                            .replace('am', 'صباحاً')}
                    />
                    {/* <CardContent>test</CardContent> */}
                    <CardActions sx={{ justifyContent: 'space-between' }}>
                        <Chip
                            sx={{ fontWeight: 'bold', fontSize: 17 }}
                            label={(order.Total ? order.Total : '_') + ' د.ل'}
                        />
                        <Button
                            onClick={() => navigate(`/order/${order.OrderID}`)}
                        >
                            التفاصيل
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        )
    })
}

const OrderList = (props) => {
    const navigate = useNavigate()
    return (
        <Grid container spacing={1} mt={1}>
            {getOrders(props.orders, navigate)}
        </Grid>
    )
}

export default OrderList
