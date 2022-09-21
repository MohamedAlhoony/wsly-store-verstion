import React from 'react'
import CartTable from './cartTable/cartTable'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import PaidIcon from '@mui/icons-material/Paid'
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining'
import Alert from '@mui/material/Alert'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout'
const getTotal = (props) => {
    let sum = 0
    props.cart.forEach((item) => {
        sum += item.listItem.Price * item.qty
        item.listItem.preferences.forEach((pref) => {
            sum += pref?.choiceValue?.Price ?? 0 * item.qty
        })
    })
    return sum
}
const CartSection = (props) => {
    return (
        <Grid container spacing={1} justifyContent={'space-between'}>
            <Grid item xs={12} sm={'auto'}>
                <Typography
                    component={'div'}
                    mb={3}
                    variant={'h4'}
                    display={'flex'}
                    alignItems={'center'}
                >
                    <ShoppingCartIcon sx={{ fontSize: 'inherit' }} />
                    المشتريات
                </Typography>
            </Grid>

            {props.cart.length !== 0 ? (
                <>
                    <Grid item xs={12}>
                        <Typography
                            fontSize={'1.3rem'}
                            component={'div'}
                            variant={'h5'}
                            display={'flex'}
                            alignItems={'center'}
                        >
                            <PaidIcon sx={{ fontSize: 'inherit' }} />
                            إجمالي الطلب:
                            <strong style={{}}>
                                &nbsp;{getTotal(props)}&nbsp;
                            </strong>
                            دينار ليبي
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography
                            component={'div'}
                            fontSize={'1.3rem'}
                            variant={'h5'}
                            display={'flex'}
                            alignItems={'center'}
                        >
                            <DeliveryDiningIcon sx={{ fontSize: 'inherit' }} />
                            سعر التوصيل:
                            <strong style={{ color: '' }}>
                                &nbsp;{props.DeliveryCost}
                                &nbsp;
                            </strong>
                            دينار ليبي
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography
                            component={'div'}
                            variant={'h5'}
                            display={'flex'}
                            alignItems={'center'}
                        >
                            <PaidIcon sx={{ fontSize: 'inherit' }} />
                            الإجمالي الكلي:
                            <strong style={{ color: 'green' }}>
                                &nbsp;{getTotal(props) + props.DeliveryCost}
                                &nbsp;
                            </strong>
                            دينار ليبي
                        </Typography>
                    </Grid>
                    <Grid
                        justifyContent={'flex-end'}
                        display={'flex'}
                        item
                        xs={12}
                    >
                        <Button
                            onClick={props.handleToggleSubmitModal}
                            endIcon={<ShoppingCartCheckoutIcon />}
                            size={'large'}
                            variant="contained"
                        >
                            اتمام الطلب
                        </Button>
                    </Grid>
                </>
            ) : (
                ''
            )}

            <Grid item xs={12}>
                {props.cart.length !== 0 ? (
                    <CartTable {...props} />
                ) : (
                    <Alert severity="info">السلة فارغة قم بإضافة مشتريات</Alert>
                )}
            </Grid>
        </Grid>
    )
}

export default CartSection
