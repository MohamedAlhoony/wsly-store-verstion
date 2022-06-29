import { Button, Typography } from '@mui/material'
import React, { useRef } from 'react'
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} from 'react-google-maps'
import CustomMapControl from './customControl'
import MyLocationIcon from '@mui/icons-material/MyLocation'
import SwipeIcon from '@mui/icons-material/Swipe'
const MyMapComponent = withScriptjs(
    withGoogleMap((props) => (
        <GoogleMap
            options={{ streetViewControl: false }}
            onZoomChanged={() => {
                const mapZoom = props.google_map_ref.current.getZoom()
                props.updateMapZoom({
                    zoom: mapZoom,
                })
            }}
            onCenterChanged={() => {
                const mapCenter = props.google_map_ref.current.getCenter()
                props.updateMapCenter({
                    lat: mapCenter.lat(),
                    lng: mapCenter.lng(),
                })
            }}
            ref={props.google_map_ref}
            zoom={props.locationModal.zoom}
            center={props.locationModal.center}
        >
            <CustomMapControl
                position={window.google.maps.ControlPosition.LEFT_CENTER}
            >
                <Button
                    sx={{
                        borderRadius: 8,
                        padding: '10px',
                        minWidth: 0,
                    }}
                    variant={'contained'}
                    onClick={props.handleFindUserLocation}
                >
                    <MyLocationIcon />
                </Button>
            </CustomMapControl>
            <Marker
                zIndex={100000}
                icon={'/images/marker-selected.svg'}
                position={props.locationModal.location}
            />
            {props.locations.map((item, key) => {
                return (
                    <Marker
                        key={key}
                        icon={'/images/marker.svg'}
                        position={{ lat: item.Lat, lng: item.Lang }}
                    />
                )
            })}
        </GoogleMap>
    ))
)
const Map = (props) => {
    let google_map_ref = useRef(null)
    return (
        <div
            style={{
                position: 'relative',
            }}
        >
            {props.locationModal.showGuide ? (
                <Typography
                    component={'div'}
                    sx={{
                        color: 'primary.main',
                        position: 'absolute',
                        fontWeight: 'bold',
                        left: '50%',
                        width: '150px',
                        marginLeft: '-75px',
                        top: '60%',
                        zIndex: 100,
                        textAlign: 'center',
                    }}
                >
                    قم بسحب الخريطة لتحديد مكانك
                    <br />
                    <SwipeIcon fontSize={'large'} />
                </Typography>
            ) : null}

            <MyMapComponent
                google_map_ref={google_map_ref}
                {...props}
                isMarkerShown
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBk3aFNasenVAyx12Q6qSPKJrthxHm7D4Q&v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        </div>
    )
}

export default Map
