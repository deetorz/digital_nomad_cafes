import axios from "axios";

export default async function populateDatabase(map, place) {
    let service = new google.maps.places.PlacesService(map);

    const idRequest = await getPlaceId(service, place.locationName);
    const placeId = idRequest.place_id;
    const placeData = await getPlaceDetails(service, placeId);

    let axiosConfig = {
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
        },
    };

    if (placeData.photos) {
        placeData.photos.forEach((photo) => {
            photo.src = photo.getUrl();
        });
    }

    const hasWifi = place.wifi;
    const hasPower = place.power;

    let businessHours = null;

    if (placeData.opening_hours) {
        businessHours = JSON.stringify(placeData.opening_hours.periods);
    }

    let bodyFormData = new FormData();

    bodyFormData.append("name", place.locationName);
    bodyFormData.append("address", placeData.formatted_address);
    bodyFormData.append("hasWifi", hasWifi);
    bodyFormData.append("hasPower", hasPower);
    bodyFormData.append("images", JSON.stringify(placeData.photos));
    bodyFormData.append("rating", placeData.rating);
    bodyFormData.append("website", placeData.website);
    bodyFormData.append("businessHours", businessHours);

    axios({
        method: "post",
        url: "https://digital-nomads-api.herokuapp.com/place/",
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
    })
        .then((response) => {
            console.log(response);
            console.log(JSON.parse(response.data.images));
        })
        .catch((error) => {
            console.error(error);
        }, axiosConfig);
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
            "formatted_address",
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
                placeDetails = results;
            }

            resolve(placeDetails);
        });
    });
}
