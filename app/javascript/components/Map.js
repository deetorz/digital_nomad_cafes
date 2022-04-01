import {
  GoogleMap,
  InfoWindow,
  Marker,
  MarkerClusterer,
} from "@react-google-maps/api";
import React, { useEffect, useState } from "react";

const containerStyle = {
  width: "33vw",
  height: "90vh",
};

let infoWindowContent = [];

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

  async function fetchPlaceDetails(map, placeName) {
    let service = new google.maps.places.PlacesService(map);

    const placeData = await getPlaceId(service, placeName);

    const placeId = placeData.place_id;

    const infoWindowData = await getPlaceDetails(service, placeId)

    if (infoWindowContent.length > 0) {
      infoWindowContent.pop()
    }

    infoWindowContent.push(infoWindowData)

    // Check console for available data when clicking marker
    console.log(infoWindowContent[0])

    const infoWindowEl = document.getElementById('infoWindowEl')
    infoWindowEl.innerHTML = ''

    // Inserting HTML works but need to find a way to set loading in state to prevent the info window from trying to render the content before it's ready
    infoWindowEl.innerHTML = `
      <img src="${infoWindowContent[0].photos[0].getUrl()}" class="w-100">
      <a href="${infoWindowContent[0].website}" target="_blank">Website</a>
    `
  }

  function getPlaceId(service, placeName) {
    let coords = [];

    let request = {
      query: placeName,
      fields: ["name", "place_id"],
    };

    return new Promise((resolve, reject) => {
      service.findPlaceFromQuery(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (let i = 0; i < results.length; i++) {
            coords.push(results[i]);
          }

          resolve(coords[0]);
        }
      });
    });
  }

  function getPlaceDetails(service, placeId) {
    let placeDetails;

    const detailsRequest = {
      placeId,
      fields: [
        "photo",
        "opening_hours",
        "website",
        "rating",
        "user_ratings_total",
      ],
    };

    return new Promise((resolve, reject) => {
      service.getDetails(detailsRequest, (results, status) => {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          placeDetails = results
        }

        resolve(placeDetails)
      });

    })
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
              onClick={() => {
                setSelected(marker);
                fetchPlaceDetails(mapObject, marker.name);
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
        >
          <div style={{ maxWidth: 120 }}>
            <p>{selected.name}</p>
            <div className="mb-2">
              <i className={(selected.wifi ? 'fa-solid fa-wifi' : 'fa-solid fa-wifi-slash') + ' mr-2'}></i>
              <i className={selected.power ? 'fa-solid fa-plug-circle-check' : 'fa-solid fa-plug-circle-xmark'}></i>
            </div>
            <div id="infoWindowEl"></div>
          </div>
        </InfoWindow>
      ) : null}
    </GoogleMap>
  );
};

export default Map;
