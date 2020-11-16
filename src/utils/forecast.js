const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=841abf51d3569677103209a380f97d2a&query=' + latitude + ',' + longitude

    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, response.body.location.region + ' Şuan ' + response.body.current.temperature + ' derece. Dışarıda hava ' + response.body.current.feelslike + ' derece hissediliyor.')
        }
    })
}

module.exports = forecast