const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/ + encodeURIcomponent(address) +.json/access_token=pk.eyJ1IjoiYW5kcmV3bWhZDEiCJhIjoiY2pvOG8ybw90MDFhazNxcnJ4OTydzjlOSJ9.njY7HvaalLEVhEOIghPTlw&limit=1';

    request({ url, json: true }, (error, { latitude, longitude, location }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location!');
        } else {
            callback(undefined, {
                latitude: body.features[0].centre[1],
                longitude: body.features[0].centre[0],
                location: body.features[0].place_name
            })
        }
    });
}

module.exports = geocode;