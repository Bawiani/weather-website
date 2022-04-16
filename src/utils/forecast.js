const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/9d1465c6f3bb7a6c71944bdd8548d026/' + latitude + ',' + longitude;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback('Unable to find location!', undefined);
        } else {
            callback(undefined, 'It is currently ' + body.currently.temperature + ' degress out. There is ' + body.currently.precipProbability + ' chanace of rain.');
        }
    });
}

module.exports = forecast;