import {
    GoogleMap,
    InfoWindow,
    Marker,
    MarkerClusterer,
} from "@react-google-maps/api";
// import places from "./dataset.json";
// import populateDatabase from "./populateDatabase";
import axios from "axios";
import React, { useEffect, useState } from "react";

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
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        showCurrentLocation();
    });

    useEffect(() => {
        let mounted = true;
        fetchPlaces().then((locations) => {
            if (mounted) {
                setPlaces(locations);
            }
        });
        return () => (mounted = false);
    }, []);

    async function fetchPlaces() {
        const data = await fetch(
            "https://digital-nomads-api.herokuapp.com/place"
        );
        return await data.json();
    }

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
                    places.map(
                        (marker) =>
                            marker.latitude && (
                                <Marker
                                    key={marker.placeId}
                                    animation={2}
                                    position={{
                                        lat: marker.latitude,
                                        lng: marker.longitude,
                                    }}
                                    marker={marker}
                                    clusterer={clusterer}
                                    onClick={async () => {
                                        setSelected(marker);
                                        // for (let i = 135; i < places.length; i++) {
                                        //   await populateDatabase(mapObject, places[i]);
                                        // }
                                    }}
                                />
                            )
                    )
                }
            </MarkerClusterer>

            {selected ? (
                <InfoWindow
                    position={{
                        lat: selected.latitude,
                        lng: selected.longitude,
                    }}
                    onCloseClick={() => {
                        setSelected(null);
                    }}
                    options={{ minWidth: 240 }}
                >
                    <div className="w-100">
                        <p>{selected.name}</p>
                        <p>{selected.hasWifi ? "WiFi" : "No WiFi"}</p>
                    </div>
                </InfoWindow>
            ) : null}
        </GoogleMap>
    );
};

export default Map;
