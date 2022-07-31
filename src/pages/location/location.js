import React from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import RoomIcon from '@mui/icons-material/Room'
import AddIcon from '@mui/icons-material/Add'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../redux/actions/location'
import AddLocationModal from './addLocationModal/addLocationModal'
import Locations from './locations/locations'
import * as LayoutActions from '../../redux/actions/layout'
const Location = (props) => {
    const navigate = useNavigate()

    const toggleLocationModal = () => {
        props.dispatch(
            LayoutActions.locationModal({ show: !props.locationModal.show })
        )
    }
    const handleDisplayLocationClick = (location) => {
        props.dispatch(
            LayoutActions.displayLocationsModal({
                show: !props.displayLocationsModal.show,
                zoom: 19,
                selectedLocation: { lat: location.Lat, lng: location.Lang },
                center: { lat: location.Lat, lng: location.Lang },
            })
        )
    }

    const deleteLocation = (location) => {
        props.dispatch(LayoutActions.handleDeleteLocation(location))
    }
    return (
        <Grid mt={3} container spacing={1}>
            <Grid
                item
                xs={12}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'space-between'}
            >
                <Typography
                    component={'div'}
                    mb={3}
                    variant={'h4'}
                    display={'flex'}
                    alignItems={'center'}
                >
                    <RoomIcon sx={{ fontSize: 'inherit' }} />
                    مواقعي
                </Typography>
                <Button onClick={() => navigate(-1)}>
                    <Typography sx={{ fontSize: 17 }}>عودة</Typography>
                    <ArrowBackIcon />
                </Button>
            </Grid>
            <Grid item xs={12}>
                <Button
                    onClick={toggleLocationModal}
                    endIcon={<AddIcon />}
                    size={'large'}
                    variant="contained"
                >
                    إضافة موقع
                </Button>
            </Grid>
            <Grid item xs={12}>
                {props.locations?.length ? (
                    <Locations
                        deleteLocation={deleteLocation}
                        handleDisplayLocationClick={handleDisplayLocationClick}
                        locations={props.locations}
                    />
                ) : (
                    <Alert sx={{ mt: 2 }} severity="info">
                        لايوجد لديك مواقع إلى حد الآن, قم بإضافة موقعك
                    </Alert>
                )}
            </Grid>
        </Grid>
    )
}

export default connect(
    ({ location_page_reducer, authorization_reducer, layout_reducer }) => {
        return {
            locations: authorization_reducer.currentUser?.Locations,
            addLocationModal: location_page_reducer.addLocationModal,
            locationModal: layout_reducer.locationModal,
            displayLocationsModal: layout_reducer.displayLocationsModal,
        }
    }
)(Location)
