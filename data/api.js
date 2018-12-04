const request = require('request-promise')
const config = require('./api-config')

module.exports = class UnicafeApi {
    restaurants() {
        return request.get(config.uris.restaurants)
            .then((res) => {
                res = JSON.parse(res)
                if (res.status === "OK") {
                    return res
                } else {
                    throw new Error("Something went wrong:" + res)
                }
            })
    }
    menu(restaurantId) {
        return request.get(config.uris.menu(restaurantId))
            .then((res) => {
                res = JSON.parse(res)
                if (res.status === "OK") {
                    return res
                } else {
                    throw new Error("Something went wrong:" + res)
                }
            })
    }
}
