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
import PersonOutline from '@mui/icons-material/PersonOutline'

const getCard = (person, props) => {
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
                        <PersonOutline
                            sx={{ fontSize: 33, color: 'primary.main' }}
                        />
                    }
                    title={
                        person.PersonName ?? (
                            <Typography color={grey[500]}>
                                (لايوجد اسم للشخص)
                            </Typography>
                        )
                    }
                />
                <CardContent></CardContent>
                <CardActions sx={{ justifyContent: 'space-between' }}>
                    {/* <Button
                        onClick={() => props.handleDisplayPersonClick(person)}
                    >
                        عرض الموقع
                    </Button> */}
                    <IconButton onClick={() => props.deletePerson(person)}>
                        <DeleteIcon color={'error'} />
                    </IconButton>
                </CardActions>
            </Card>
        </Box>
    )
}

const getItems = (props) => {
    return props.persons.map((person, key) => {
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
                {getCard(person, props)}
            </Grid>
        )
    })
}
const Persons = (props) => {
    return (
        <Grid spacing={2} sx={{ mt: 2 }} container>
            {getItems(props)}
        </Grid>
    )
}

export default Persons
