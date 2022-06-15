import React, { useRef } from 'react'
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} from 'react-google-maps'

const MyMapComponent = withScriptjs(
    withGoogleMap((props) => (
        <GoogleMap
            onBoundsChanged={() => {
                const mapCenter = props.google_map_ref.current.getCenter()
                props.updateMapCenter({
                    lat: mapCenter.lat(),
                    lng: mapCenter.lng(),
                })
            }}
            ref={props.google_map_ref}
            defaultZoom={12}
            defaultCenter={props.addLocationModal.mapCenter}
        >
            <Marker position={props.addLocationModal.mapCenter} />
        </GoogleMap>
    ))
)
const Map = (props) => {
    let google_map_ref = useRef(null)
    return (
        <MyMapComponent
            google_map_ref={google_map_ref}
            {...props}
            isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBk3aFNasenVAyx12Q6qSPKJrthxHm7D4Q&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
        />
    )
}

export default Map
