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
} from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import PaidIcon from '@mui/icons-material/Paid'
import { StyledBadge } from '../../home'
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
const getCard = (item, handleItemListClick, cart) => {
    return (
        <Box sx={{ width: 1 }}>
            <Card
                variant={'elevation'}
                sx={{
                    height: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}
            >
                <CardHeader
                    title={item.Name}
                    // subheader={[
                    //     <span key={0}>{getQuentity(item.Id, cart)}</span>,
                    // ]}
                />
                <CardContent></CardContent>
                <CardActions sx={{ justifyContent: 'space-between' }}>
                    <IconButton onClick={() => handleItemListClick(item)}>
                        <StyledBadge
                            badgeContent={getQuentity(item.Id, cart)}
                            color="secondary"
                        >
                            <AddShoppingCartIcon color={'primary'} />
                        </StyledBadge>
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
    )
}

const getItems = (props) => {
    return props.listItems.map((listItem, key) => {
        return (
            <Grid
                xs={6}
                sm={'auto'}
                key={key}
                justifyContent={'center'}
                sx={{ display: 'flex' }}
                item
            >
                {getCard(listItem, props.handleItemListClick, props.cart)}
            </Grid>
        )
    })
}
const ProductsItems = (props) => {
    return (
        <Grid spacing={1} sx={{ mt: 2 }} container>
            {getItems(props)}
        </Grid>
    )
}

export default ProductsItems
