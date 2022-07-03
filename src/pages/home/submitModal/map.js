import React from 'react'
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} from 'react-google-maps'
import CustomMapControl from './customControl'
import { Button, Typography } from '@mui/material'
import AddLocation from '@mui/icons-material/AddLocation'
const labelSize = { width: 220 }
const labelPadding = 8
const {
    MarkerWithLabel,
} = require('react-google-maps/lib/components/addons/MarkerWithLabel')

const MyMapComponent = withScriptjs(
    withGoogleMap((props) => (
        <GoogleMap
            options={{ streetViewControl: false }}
            defaultZoom={12}
            defaultCenter={{ lat: 32.8872, lng: 13.1913 }}
        >
            {props.locations.map((item, key) => {
                return item.LocationName ? (
                    <MarkerWithLabel
                        labelClass={'marker-label'}
                        labelStyle={{
                            textAlign: 'center',
                            backgroundColor: '#f5a62b',
                            fontSize: '15px',

                            padding: '5px',
                            borderRadius: '50px',
                        }}
                        labelAnchor={{
                            x: 0,
                            y: 70,
                        }}
                        onClick={() => props.handleMarkerClick(item)}
                        key={key}
                        icon={'/images/marker.svg'}
                        position={{ lat: item.Lat, lng: item.Lang }}
                    >
                        <Typography component={'span'}>
                            {item.LocationName}
                        </Typography>
                    </MarkerWithLabel>
                ) : (
                    <Marker
                        labelAnchor={{
                            x: 0,
                            y: 70,
                        }}
                        onClick={() => props.handleMarkerClick(item)}
                        key={key}
                        icon={'/images/marker.svg'}
                        position={{ lat: item.Lat, lng: item.Lang }}
                    />
                )
            })}
            <CustomMapControl
                position={window.google.maps.ControlPosition.BOTTOM_CENTER}
            >
                <Button
                    color={'secondary'}
                    sx={{
                        borderRadius: 50,
                        mb: 3,
                    }}
                    variant={'contained'}
                    onClick={props.handleAddLocation}
                    endIcon={<AddLocation />}
                >
                    إضافة موقع
                </Button>
            </CustomMapControl>
            {props.submitModal.selectedLocation ? (
                props.submitModal.selectedLocation.LocationName ? (
                    <MarkerWithLabel
                        labelClass={'marker-label'}
                        labelStyle={{
                            textAlign: 'center',
                            backgroundColor: '#f5a62b',
                            fontSize: '15px',
                            padding: '5px',
                            borderRadius: '50px',
                            zIndex: '5000',
                        }}
                        labelAnchor={{
                            x: 0,
                            y: 70,
                        }}
                        zIndex={1000}
                        icon={'/images/marker-selected.svg'}
                        position={{
                            lat: props.submitModal.selectedLocation.Lat,
                            lng: props.submitModal.selectedLocation.Lang,
                        }}
                    >
                        <Typography component={'span'}>
                            {props.submitModal.selectedLocation.LocationName ===
                            'undefined'
                                ? null
                                : props.submitModal.selectedLocation
                                      .LocationName}
                        </Typography>
                    </MarkerWithLabel>
                ) : (
                    <Marker
                        labelAnchor={{
                            x: 0,
                            y: 70,
                        }}
                        zIndex={1000}
                        icon={'/images/marker-selected.svg'}
                        position={{
                            lat: props.submitModal.selectedLocation.Lat,
                            lng: props.submitModal.selectedLocation.Lang,
                        }}
                    />
                )
            ) : null}
        </GoogleMap>
    ))
)
const Map = (props) => {
    return (
        <MyMapComponent
            {...props}
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBk3aFNasenVAyx12Q6qSPKJrthxHm7D4Q&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
        />
    )
}

export default Map
