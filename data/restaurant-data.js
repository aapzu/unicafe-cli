
const _ = require('lodash')
const Api = require('./api')
const api = new Api()
const config = require('./api-config')

let restaurants
const getRestaurants = () => {
    return new Promise((resolve, reject) => {
        if (!restaurants) {
            api.restaurants()
                .then((res) => {
                    res.forEach((item) => {
                        item.areaName = config.areacodes[item.areacode]
                    })
                    restaurants = res
                    resolve(restaurants)
                })
        } else {
            resolve (restaurants)
        }
    })
}

const searchRestaurants = (opt) => {
    let query = opt.query.toString()
    return new Promise((resolve, reject) => {
        getRestaurants()
            .then((restaurants) => {
                let byId = _.filter(restaurants, (item) => {
                    return item.id == query
                })
                let byArea = _.filter(restaurants, (item) => {
                    return item.areaName !== undefined && item.areaName.toLowerCase() === query.toLowerCase()
                })
                let byName = _.filter(restaurants, (item) => {
                    return item.name.toLowerCase().includes(query.toLowerCase())
                })
                let response
                if (opt.isId) {
                    response = byId
                } else if (opt.isArea) {
                    response = byArea
                } else if (opt.isName) {
                    response = byName
                } else {
                    response = (byId.length && byId) || (byArea.length && byArea) || byName
                }
                resolve(response)
            })
            .catch(reject)
    })
}

module.exports = {
    getRestaurants: getRestaurants,
    searchRestaurants: searchRestaurants
}