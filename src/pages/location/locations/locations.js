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
    CircularProgress,
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
                elevation={2}
                sx={{
                    height: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}
            >
                <CardHeader
                    action={
                        <LocationOnOutlined
                            sx={{ fontSize: 33, color: 'primary.main' }}
                        />
                    }
                    title={
                        location.LocationName ?? (
                            <Typography color={grey[500]}>
                                (لايوجد اسم للموقع)
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
                    <IconButton onClick={() => props.deleteLocation(location)}>
                        {location.isDeleting === true ? (
                            <CircularProgress size={20} color="error" />
                        ) : (
                            <DeleteIcon color={'error'} />
                        )}
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
                xs={12}
                sm={6}
                md={4}
                lg={3}
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
        <Grid spacing={2} sx={{ mt: 2 }} container>
            {getItems(props)}
        </Grid>
    )
}

export default Locations
