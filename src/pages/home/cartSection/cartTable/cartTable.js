import * as React from 'react'
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Collapse from '@mui/material/Collapse'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { red } from '@mui/material/colors'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import PaidIcon from '@mui/icons-material/Paid'
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart'

const getProductPrice = (item) => {
    let sum = 0
    sum = item.listItem.Price
    item.listItem.preferences.forEach((pref) => {
        sum += pref?.choiceValue?.Price ?? 0
    })
    return sum
}
const getPreferences = (item) => {
    let preferences = ''
    item.listItem.preferences.forEach((pref, index) => {
        if (pref.choiceValue.Id !== pref.choice.Id) {
            preferences +=
                pref.choiceValue.Name +
                (item.listItem.preferences.length - 1 !== index ? ' ,' : '')
        }
    })
    if (preferences === '') {
        return ''
    } else {
        return '(' + preferences + ')'
    }
}
export default function RecipeReviewCard(props) {
    const getItems = () => {
        return props.cart.map((item, key) => {
            return (
                <Grid
                    xs={12}
                    sm={'auto'}
                    key={key}
                    justifyContent={'center'}
                    sx={{ display: 'flex' }}
                    item
                >
                    <Card
                        sx={{
                            width: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                        }}
                    >
                        <CardHeader
                            // action={
                            //     <Avatar sx={{ ml: 3 }}>
                            //         {getProductPrice(item)}
                            //     </Avatar>
                            // }
                            title={
                                <Typography
                                    sx={{ fontSize: 20 }}
                                    // display={'flex'}
                                    alignItems={'center'}
                                >
                                    <strong>{item.qty}</strong>&nbsp;
                                    {item.listItem.Name}&nbsp;
                                    {item.forName !== '' ? (
                                        <span>
                                            <strong>لـ{item.forName}</strong>
                                            &nbsp;
                                        </span>
                                    ) : (
                                        ''
                                    )}
                                    <br />
                                    <strong>{getPreferences(item)}</strong>
                                </Typography>
                            }
                        />

                        <CardActions
                            disableSpacing
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <div>
                                <IconButton
                                    onClick={() =>
                                        props.handleCartQtyChange({
                                            id: 'add',
                                            index: key,
                                        })
                                    }
                                >
                                    <AddIcon />
                                </IconButton>
                                <IconButton
                                    onClick={() =>
                                        props.handleCartQtyChange({
                                            id: 'subtract',
                                            index: key,
                                        })
                                    }
                                >
                                    <RemoveIcon />
                                </IconButton>
                                <IconButton
                                    onClick={() => {
                                        props.handleRemoveProduct(key)
                                    }}
                                >
                                    <RemoveShoppingCartIcon color={'error'} />
                                </IconButton>
                            </div>
                            <div>
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
                                    {getProductPrice(item)}
                                    &nbsp; دينار
                                </Avatar>
                            </div>
                        </CardActions>
                    </Card>
                </Grid>
            )
        })
    }

    return (
        <Grid spacing={1} sx={{ mt: 2 }} container>
            {getItems(props)}
        </Grid>
    )
}
