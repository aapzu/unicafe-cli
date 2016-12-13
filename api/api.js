
const request = require('request-promise')
const urls = require('./api-uri-config')

module.exports = class UnicafeApi {
    constructor() {

    }
    restaurants() {
        return new Promise(function(resolve, reject) {
            request.get(urls.restaurants)
                .then((res) => {
                    res = JSON.parse(res)
                    if (res.status === "OK") {
                        resolve(res.data)
                    } else {
                        throw new Error("Something went wrong:" + res)
                    }
                })
                .catch(reject)
        })
    }
    menu(restaurantId) {
        return new Promise(function(resolve, reject) {
            request.get(urls.menu(restaurantId))
                .then((res) => {
                    res = JSON.parse(res)
                    if (res.status === "OK") {
                        resolve(res.data)
                    } else {
                        throw new Error("Something went wrong:" + res)
                    }
                })
                .catch(reject)
        })
    }
}
