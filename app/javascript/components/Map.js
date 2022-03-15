import React, { useState, useEffect } from 'react'
import {
  GoogleMap,
  Marker,
  InfoWindow,
  MarkerClusterer,
} from '@react-google-maps/api';

const containerStyle = {
  width: '33vw',
  height: '90vh'
};

const Map = (props) => {
  const [selected, setSelected] = useState(null)
  const [position, setPosition] = useState({
    lat: props.center[0],
    lng: props.center[1],
  })
  const [zoom, setZoom] = useState(props.zoom)

  useEffect(() => {
    showCurrentLocation()
  })

  function showCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        }
      )

      setZoom(13)

    } else {
      error => console.log(error)
    }
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={position}
      zoom={zoom}
    >
      <MarkerClusterer
        minimumClusterSize='10'
      >
        {(clusterer) =>
          props.markers[0].map(marker =>
            <Marker
              key={marker.id}
              animation={2}
              position={{
                lat: marker.lat,
                lng: marker.lng,
              }}
              clusterer={clusterer}
              onClick={() => {
                setSelected(marker)
              }}
            />
          )
        }
      </MarkerClusterer>

      {selected ?
        (<InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null)
            }}
          >
          <div style={{ maxWidth: 120 }}>
            <p>{ selected.name }</p>
            <small>{ selected.address }</small>
          </div>
        </InfoWindow>) : null}
    </GoogleMap>
  )
}

export default Map
