const Table = require('cli-table')

const strings = require('../strings/strings')

const rData = require('../data/restaurant-data')

module.exports = class Restaurants {
    print() {
        let _this = this
        rData.getRestaurants()
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
}