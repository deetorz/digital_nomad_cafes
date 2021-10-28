// import React from 'react';
// import GoogleMap from 'google-map-react';
// import Marker from './Marker'

// const Map = (props) => {

//   const mapMarkers = props.markers[0].map(markerInfo => 
//       <Marker
//         key={markerInfo.id}
//         lat={markerInfo.lat}
//         lng={markerInfo.lng}
//       />
//     )

//   return (
//     <div style={{width: '100%', height: '400px'}}>
//       <GoogleMap
//         bootstrapURLKeys={{key: props.googleApiKey}}
//         center={props.center}
//         zoom={props.zoom}
//       >
//         { mapMarkers }
//       </GoogleMap>
//     </div>
//   )
// }

// export default Map

import React, { useState } from 'react'
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const Map = (props) => {
  const position = {
    lat: props.center[0],
    lng: props.center[1],
  };

  const mapMarkers = props.markers[0].map(markerInfo => 
    <Marker
      key={markerInfo.id}
      animation={2}
      position={{
        lat: markerInfo.lat,
        lng: markerInfo.lng,
      }}
    />
  )
  
  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={position}
      zoom={props.zoom}
    >
      { /* Child components, such as markers, info windows, etc. */ }
      { mapMarkers }
    </GoogleMap>
  )
}

export default Map
