"use strict"

const request = require('request-promise')
const config = require('./api-config')

module.exports = class UnicafeApi {
    constructor() {

    }
    restaurants() {
        return new Promise(function(resolve, reject) {
            request.get(config.uris.restaurants)
                .then((res) => {
                    res = JSON.parse(res)
                    if (res.status === "OK") {
                        resolve(res)
                    } else {
                        throw new Error("Something went wrong:" + res)
                    }
                })
                .catch(reject)
        })
    }
    menu(restaurantId) {
        return new Promise(function(resolve, reject) {
            request.get(config.uris.menu(restaurantId))
                .then((res) => {
                    res = JSON.parse(res)
                    if (res.status === "OK") {
                        resolve(res)
                    } else {
                        throw new Error("Something went wrong:" + res)
                    }
                })
                .catch(reject)
        })
    }
}
