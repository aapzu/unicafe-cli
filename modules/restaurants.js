
const _ = require('lodash')
const Api = require('../api/api')
const config = require('../api/api-config')
const Table = require('cli-table')

const strings = require('../strings/strings')

let restaurants
const api = new Api()

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

const printRestaurantList = () => {
    getRestaurants()
        .then((restaurants) => {
            const table = new Table({
                head: [
                    strings.restaurants.list.headers.name,
                    strings.restaurants.list.headers.areaName,
                    strings.restaurants.list.headers.id,
                ]
            })
            restaurants.forEach((item) => {
                table.push([
                    item.name,
                    item.areaName || "",
                    item.id
                ])
            })
            console.log(table.toString())
        })
        .catch(function(e) {
            console.error(e.stack)
        })
}

const printAndSearchRestaurants = (query) => {
    searchRestaurants(query)
        .then((restaurants) => {
            let byId = _.filter(restaurants, (item) => {
                return item.id == query
            })
            let byArea = _.filter(restaurants, (item) => {
                return item.areaName && item.areaName.toLowerCase() == query.toLowerCase()
            })
            let byName = _.filter(restaurants, (item) => {
                return item.name.includes(query)
            })
            let response = (byId.length && byId) || (byArea.length && byArea) || byName

            const table = new Table({
                head: [
                    strings.restaurants.list.headers.name,
                    strings.restaurants.list.headers.areaName,
                    strings.restaurants.list.headers.id,
                ]
            })
            response.forEach((item) => {
                table.push([
                    item.name,
                    item.areaName || "",
                    item.id
                ])
            })
            console.log(table.toString())
        })
        .catch((e) => {
            console.error(e.stack)
        })
}

module.exports = class Restaurants {
    static print(argument) {
        if (argument === true) {
            printRestaurantList()
        } else {
            printAndSearchRestaurants(argument)
        }
    }
    static searchRestaurants(opt) {
        return searchRestaurants(opt)
    }
}