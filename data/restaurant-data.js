
const _ = require('lodash')
const Api = require('./api')
const api = new Api()
const config = require('./api-config')

let restaurants
const getRestaurants = () => {
    if (!restaurants) {
        return api.restaurants()
            .then((res) => {
                res.data.forEach((item) => {
                    item.areaName = config.areacodes[item.areacode]
                })
                restaurants = res.data
                return restaurants
            })
    } else {
        return Promise.resolve(restaurants)
    }
}

const searchRestaurants = ({ query, isId, isName, isArea }) => {
    query = query.toString()
    return getRestaurants()
        .then((restaurants) => {
            const byId = restaurants.filter((item) => item.id.toString() === query)
            const byArea = restaurants.filter((item) => item.areaName && item.areaName.toLowerCase() === query.toLowerCase())
            const byName = restaurants.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))
            if (isId) {
                return byId
            } else if (isArea) {
                return byArea
            } else if (isName) {
                return byName
            } else {
                return (byId.length && byId) || (byArea.length && byArea) || byName
            }
        })
}

module.exports = {
    getRestaurants: getRestaurants,
    searchRestaurants: searchRestaurants
}