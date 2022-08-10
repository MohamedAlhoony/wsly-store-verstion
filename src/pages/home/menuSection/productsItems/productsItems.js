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
    Avatar,
    Badge,
    colors,
} from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import PaidIcon from '@mui/icons-material/Paid'
import SwipeableViews from 'react-swipeable-views'
import { useTheme } from '@mui/material/styles'
import { color, styled } from '@mui/system'
import { NotAvailableBadge, StyledBadge } from '../../home'
import BadgeUnstyled, { BadgeUnstyledProps } from '@mui/base/BadgeUnstyled'
import { grey } from '@mui/material/colors'

const StyledBadgeBadge = styled('span')`
    z-index: auto;
    min-width: 20px;
    height: 20px;
    padding: 0 6px;
    color: #fff;
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
    white-space: nowrap;
    text-align: center;
    background: #ff4d4f;
    border-radius: 10px;
    box-shadow: 0 0 0 1px #fff;
`
const StyledBadgeInnerBadge = styled(StyledBadgeBadge)`
    background: #00f;
`

function BadgeContent({ onClick }) {
    return (
        <Box
            component="span"
            sx={{
                width: 42,
                height: 42,
                borderRadius: '2px',
                background: '#eee',
                display: 'inline-block',
                verticalAlign: 'middle',
            }}
            onClick={onClick}
        />
    )
}
const getQuentity = (id, cart) => {
    let qtySum = 0
    cart.slice().forEach((item) => {
        if (item.listItem.Id === id) {
            qtySum += item.qty
        }
    })
    if (qtySum !== 0) {
        return qtySum
    } else {
        return 0
    }
}

const getCard = (item, handleItemListClick, cart, loggedIn, isAvailable) => {
    const quentity = getQuentity(item.Id, cart)
    let message = ''
    if (!loggedIn) {
        message = 'تسجيل دخول'
    } else if (!isAvailable) {
        message = 'المتجر مغلق'
    } else if (!item.IsAvailable) {
        message = 'غير متاح'
    }
    return (
        <NotAvailableBadge
            display={!item.IsAvailable ? 'flex' : 'none'}
            color={'error'}
            badgeContent={message}
            style={{ width: '100%' }}
        >
            <Box sx={{ width: 1, position: 'relative' }}>
                {!item.IsAvailable && (
                    <Box
                        sx={{
                            opacity: 0.3,
                            width: 1,
                            height: 1,
                            position: 'absolute',
                            zIndex: 10,
                            background: grey[200],
                        }}
                    />
                )}
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
                    <CardHeader title={item.Name} />
                    <CardContent></CardContent>
                    <CardActions sx={{ justifyContent: 'space-between' }}>
                        <IconButton
                            style={{ position: 'relative' }}
                            onClick={() => handleItemListClick(item)}
                        >
                            <AddShoppingCartIcon color={'primary'} />
                            {quentity !== 0 && (
                                <Typography
                                    sx={{
                                        position: 'absolute',
                                        left: 28,
                                        top: 5,
                                        zIndex: 'auto',
                                        minWidth: '18px',
                                        height: '18px',
                                        padding: '0 1px',
                                        backgroundColor: 'secondary.main',
                                        fontWeight: 400,
                                        fontSize: '12px',
                                        lineHeight: '20px',
                                        whiteSpace: 'nowrap',
                                        textAlign: 'center',
                                        border: `2px solid white`,
                                        color: '#000',
                                        borderRadius: '50px',
                                        boxShadow: '0 0 0 1px #fff,',
                                    }}
                                >
                                    {quentity}
                                </Typography>
                            )}
                            {/* <StyledBadge
                                components={{ Badge: StyledBadgeInnerBadge }}
                                color="secondary"
                                badgeContent={getQuentity(item.Id, cart)}
                            ></StyledBadge> */}
                        </IconButton>
                        <Avatar
                            sx={{
                                fontSize: 16,
                                bgcolor: '#f5a62b',
                                width: 'auto',
                                px: 1,
                                borderRadius: 1,
                                fontWeight: 'bold',
                            }}
                        >
                            &nbsp;
                            {item.Price}
                            &nbsp; دينار
                        </Avatar>
                    </CardActions>
                </Card>
            </Box>
        </NotAvailableBadge>
    )
}

const getItems = (props, items) => {
    return items.map((listItem, key) => {
        return (
            <Grid
                xs={6}
                sm={4}
                md={3}
                key={key}
                justifyContent={'center'}
                sx={{ display: 'flex' }}
                item
            >
                {getCard(
                    listItem,
                    props.handleItemListClick,
                    props.cart,
                    props.loggedIn,
                    props.isAvailable
                )}
            </Grid>
        )
    })
}
const ProductsItems = (props) => {
    const theme = useTheme()
    return (
        <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={props.categoryInputValue}
            onChangeIndex={(index) =>
                props.handleCategoryInputValueChange(index)
            }
        >
            {props.categories?.map((category, key) => {
                return (
                    <Grid
                        sx={{ p: 1, mt: 1 }}
                        dir={'rtl'}
                        key={key}
                        item
                        xs={12}
                    >
                        <Grid container spacing={1}>
                            {getItems(props, category.items)}
                        </Grid>
                    </Grid>
                )
            })}
        </SwipeableViews>
    )
}

export default ProductsItems
