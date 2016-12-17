"use strict"

const Table = require('cli-table')

const fiStrings = require('../strings/fi-strings')
const enStrings = require('../strings/en-strings')

const rData = require('../data/restaurant-data')

module.exports = class Restaurants {
    print() {
        let _this = this
        rData.getRestaurants()
            .then((restaurants) => {
                const table = new Table({
                    head: [
                        fiStrings.restaurants.list.headers.name,
                        fiStrings.restaurants.list.headers.areaName,
                        fiStrings.restaurants.list.headers.id,
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
}