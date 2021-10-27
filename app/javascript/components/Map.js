import React from 'react';
import GoogleMap from 'google-map-react';
import Marker from './Marker'

const Map = (props) => {

  const mapMarkers = props.markers[0].map(markerInfo => 
      <Marker
        key={markerInfo.id}
        lat={markerInfo.lat}
        lng={markerInfo.lng}
      />
    )

  return (
    <div style={{width: '100%', height: '400px'}}>
      <GoogleMap
        bootstrapURLKeys={{key: props.googleApiKey}}
        center={props.center}
        zoom={props.zoom}
      >
        { mapMarkers }
      </GoogleMap>
    </div>
  )
}

export default Map
