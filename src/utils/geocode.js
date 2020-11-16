const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiZW1ydWxsYWhjIiwiYSI6ImNrZnlsNjFvaDJ6d20ycXBhYWtidXZ2Y3YifQ.U1P8kkp41O9G5rPFSKyjpw&limit=1'

    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        }else if (response.body.features.length === 0) {
            callback('Adrese ulaşılamadı. Başka bir arama yapınız.', undefined)
        }else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode