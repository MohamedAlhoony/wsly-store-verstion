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
    Button,
} from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import DeleteIcon from '@mui/icons-material/Delete'
import { red, grey } from '@mui/material/colors'
import LocationOnOutlined from '@mui/icons-material/LocationOnOutlined'

const getCard = (location, props) => {
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
                    action={<LocationOnOutlined sx={{ fontSize: 30 }} />}
                    title={
                        location.LocationName ?? (
                            <Typography color={grey[500]}>
                                (لايوجد اسم)
                            </Typography>
                        )
                    }
                    subheader={
                        location.NoteForDriver ?? (
                            <Typography color={grey[500]}>
                                (لايوجد ملاحظات)
                            </Typography>
                        )
                    }
                />
                <CardContent></CardContent>
                <CardActions sx={{ justifyContent: 'space-between' }}>
                    <Button
                        onClick={() =>
                            props.handleDisplayLocationClick(location)
                        }
                    >
                        عرض الموقع
                    </Button>
                    <IconButton>
                        <DeleteIcon color={'error'} />
                    </IconButton>
                </CardActions>
            </Card>
        </Box>
    )
}

const getItems = (props) => {
    return props.locations.map((location, key) => {
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
                {getCard(location, props)}
            </Grid>
        )
    })
}
const Locations = (props) => {
    return (
        <Grid spacing={1} sx={{ mt: 2 }} container>
            {getItems(props)}
        </Grid>
    )
}

export default Locations
