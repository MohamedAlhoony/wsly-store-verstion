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

const ExpandMore = styled((props) => {
    const { expand, ...other } = props
    return <IconButton {...other} />
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}))

const getProductPrice = (item) => {
    let sum = 0
    sum = item.listItem.Price
    item.listItem.preferences.forEach((pref) => {
        sum += pref.choice.Price
    })
    return sum
}
const getPreferences = (item) => {
    let preferences = ''
    item.listItem.preferences.forEach((pref) => {
        preferences += pref.choice.Name + ', '
    })
    return preferences
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
                    <Box sx={{ width: 1 }}>
                        <Card>
                            <CardHeader
                                action={
                                    <Avatar sx={{ ml: 3 }}>
                                        {getProductPrice(item)}
                                    </Avatar>
                                }
                                title={item.listItem.Name}
                            />

                            <CardContent>
                                <List
                                    sx={{
                                        p: 0,
                                        width: '100%',
                                        maxWidth: 360,
                                        bgcolor: 'background.paper',
                                    }}
                                >
                                    <ListItem sx={{ p: 0 }}>
                                        <ListItemText
                                            primary={`اسم المعني: ${
                                                item.forName === ''
                                                    ? '--'
                                                    : item.forName
                                            }`}
                                        />
                                    </ListItem>
                                    <ListItem sx={{ p: 0 }}>
                                        <ListItemText
                                            primary={`الكمية: (${item.qty})`}
                                        />
                                    </ListItem>
                                </List>
                            </CardContent>
                            <CardActions disableSpacing>
                                <IconButton>
                                    <AddIcon
                                        onClick={() =>
                                            props.handleCartQtyChange({
                                                id: 'add',
                                                index: key,
                                            })
                                        }
                                    />
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
                                <ExpandMore
                                    expand={expanded}
                                    onClick={handleExpandClick}
                                    aria-expanded={expanded}
                                    aria-label="show more"
                                >
                                    <ExpandMoreIcon />
                                </ExpandMore>
                            </CardActions>
                            <Collapse
                                in={expanded}
                                timeout="auto"
                                unmountOnExit
                            >
                                <CardContent>
                                    <Typography paragraph>
                                        {getPreferences(item)}
                                    </Typography>
                                </CardContent>
                            </Collapse>
                        </Card>
                    </Box>
                </Grid>
            )
        })
    }
    const [expanded, setExpanded] = React.useState(false)

    const handleExpandClick = () => {
        setExpanded(!expanded)
    }

    return (
        <Grid spacing={1} sx={{ mt: 2 }} container>
            {getItems(props)}
        </Grid>
    )
}
