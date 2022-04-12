import {
  GoogleMap,
  InfoWindow,
  Marker,
  MarkerClusterer
} from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
// import places from "./dataset.json";
// import populateDatabase from "./populateDatabase";

const containerStyle = {
  width: "40vw",
  minWidth: 300,
  height: "90vh",
};

const Map = (props) => {
  const [position, setPosition] = useState({
    lat: props.center[0],
    lng: props.center[1],
  });
  const [selected, setSelected] = useState(null);
  const [zoom, setZoom] = useState(props.zoom);
  const [mapObject, setMapObject] = useState(null);

  useEffect(() => {
    showCurrentLocation();
  });

  function showCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });

      setZoom(13);
    } else {
      (error) => console.log(error);
    }
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={position}
      zoom={zoom}
      onLoad={(map) => setMapObject(map)}
    >
      <MarkerClusterer minimumClusterSize="10">
        {(clusterer) =>
          props.markers[0].map((marker) => (
            <Marker
              key={marker.id}
              animation={2}
              position={{
                lat: marker.lat,
                lng: marker.lng,
              }}
              clusterer={clusterer}
              onClick={async () => {
                setSelected(marker);
                // for (let i = 135; i < places.length; i++) {
                //   await populateDatabase(mapObject, places[i]);
                // }
              }}
            />
          ))
        }
      </MarkerClusterer>

      {selected ? (
        <InfoWindow
          position={{ lat: selected.lat, lng: selected.lng }}
          onCloseClick={() => {
            setSelected(null);
          }}
          options={{ minWidth: 240 }}
        >
          <div className="w-100">
            <p>{selected.name}</p>
          </div>
        </InfoWindow>
      ) : null}
    </GoogleMap>
  );
};

export default Map;
