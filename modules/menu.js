const moment = require('moment')
const _ = require('lodash')
const clc = require('cli-color')

const Api = require('../api/api')
let api = new Api()

const restaurantModule = require('./restaurants')

const Table = require('cli-table')

const strings = require('../strings/strings')

const priceClasses = [
    strings.menu.priceClasses["Maukkaasti"],
    strings.menu.priceClasses["Edullisesti"],
    strings.menu.priceClasses["Kevyesti"],
    strings.menu.priceClasses["Bistro"]
]

const getPriceClass = (price) => {
    for (let i = 0; i < priceClasses.length; i++) {
        let c = priceClasses[i]
        if (price.includes(c)) {
            return c
        }
    }
    return price
}

const printDaysMenu = (menuOfDay, menuDate) => {
    const table = new Table({
        head: [
            strings.menu.headers.name,
            strings.menu.headers.nutrition,
            strings.menu.headers.priceClass,
        ]
    })
    console.log(clc.red(menuDate.locale('fi').format(strings.menu.dateFormat)))
    let foods = []
    for (var dataCount = 0; dataCount < menuOfDay.data.length; dataCount++) {
        let menuItem = menuOfDay.data[dataCount]
        let name = menuItem.name
        let meta = menuItem.meta[0].join(", ")
        let priceClass = getPriceClass(menuItem.price.name)
        foods.push({
            name: name,
            meta: meta,
            priceClass: priceClass
        })
    }
    foods = _.sortBy(foods, ['priceClass', 'name'])
    foods.forEach((item) => {
        table.push([item.name, item.meta, item.priceClass])
    })
    console.log(table.toString())
}

const parseAndPrintList = (list, wholeWeek) => {

    for (var listCount = 0; listCount < list.length && listCount < 7; listCount++) {
        var menuOfDay = list[listCount]

        let menuDate = moment(menuOfDay.date_en, "ddd DD.MM").startOf('day')
        let today = moment().startOf('day')
        if ((today.isSame(menuDate) || wholeWeek) && menuOfDay.data.length) { // Is today
            printDaysMenu(menuOfDay, menuDate)
        }
    }
}

module.exports = class Menu {
    static print(opt) {
        if (opt.query === undefined || opt.query === "") {
            console.log(strings.menu.errors.noQuery)
            return
        }
        restaurantModule.searchRestaurants(opt)
            .then((restaurants) => {
                if (!restaurants.length) {
                    console.log(strings.menu.errors.noResults)
                    return
                }
                restaurants = restaurants.slice(0, 3)
                let promises = []
                restaurants.forEach((r) => {
                    promises.push(api.menu(r.id))
                })
                Promise.all(promises)
                    .then((results) => {
                        for (var resCount = 0; resCount < results.length; resCount++) {
                            let list = results[resCount]
                            console.log("\n" + restaurants[resCount].name)
                            parseAndPrintList(list, opt.wholeWeek)
                        }
                    })
                    .catch((e) => {
                        console.log(e.stack)
                    })
            })
            .catch((e) => {
                console.error(e.stack)
            })
    }
}