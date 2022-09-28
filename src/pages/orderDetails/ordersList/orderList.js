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
import moment from 'moment/moment'

const getPreferences = (prefs) => {
    let preferences = ''
    prefs.forEach((pref, index) => {
        preferences +=
            pref.ChoiceCaption + (prefs.length - 1 !== index ? ' ,' : '')
    })
    if (preferences === '') {
        return ''
    } else {
        return '(' + preferences + ')'
    }
}

const getOrders = (orders) => {
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
                        title={
                            <Typography
                                sx={{ fontSize: 20 }}
                                // display={'flex'}
                                alignItems={'center'}
                            >
                                <strong>{order.Qty}</strong>&nbsp;
                                {order.item.ItemName}&nbsp;
                                {order.For !== '' ? (
                                    <span>
                                        <strong>لـ{order.For}</strong>
                                        &nbsp;
                                    </span>
                                ) : (
                                    ''
                                )}
                                <br />
                                <strong>
                                    {getPreferences(
                                        order.item?.clientPreferences
                                    )}
                                </strong>
                            </Typography>
                        }
                    />
                    {/* <CardContent>test</CardContent> */}
                    {/* <CardActions sx={{ justifyContent: 'space-between' }}>
                        <Chip
                            sx={{ fontWeight: 'bold', fontSize: 17 }}
                            label={
                                'القيمة: ' +
                                (order.Total ? order.Total : '_') +
                                ' د.ل'
                            }
                        />
                        <Button>التفاصيل</Button>
                    </CardActions> */}
                </Card>
            </Grid>
        )
    })
}

const OrderList = (props) => {
    return (
        <Grid container spacing={1} mt={1}>
            {getOrders(props.orderItems)}
        </Grid>
    )
}

export default OrderList
