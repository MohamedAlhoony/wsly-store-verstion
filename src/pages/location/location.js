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

const Location = (props) => {
    const navigate = useNavigate()

    const toggleAddLocationModal = () => {
        props.dispatch(
            actions.addLocationModal({ show: !props.addLocationModal.show })
        )
    }
    const updateMapCenter = ({ lat, lng }) => {
        props.dispatch(actions.addLocationModal({ mapCenter: { lat, lng } }))
    }
    return (
        <Grid mt={3} container spacing={1}>
            <AddLocationModal
                updateMapCenter={updateMapCenter}
                addLocationModal={props.addLocationModal}
                toggleAddLocationModal={toggleAddLocationModal}
            />
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
                    onClick={toggleAddLocationModal}
                    endIcon={<AddIcon />}
                    size={'large'}
                    variant="contained"
                >
                    إضافة موقع
                </Button>
            </Grid>
            <Grid item xs={12}>
                {props.locations.length ? (
                    <div>test</div>
                ) : (
                    <Alert sx={{ mt: 2 }} severity="info">
                        لايوجد لديك مواقع إلى حد الآن, قم بإضافة موقعك
                    </Alert>
                )}
            </Grid>
        </Grid>
    )
}

export default connect(({ location_page_reducer }) => {
    return {
        locations: location_page_reducer.locations,
        addLocationModal: location_page_reducer.addLocationModal,
    }
})(Location)
