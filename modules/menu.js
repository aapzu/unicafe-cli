"use strict"

const moment = require('moment')
const _ = require('lodash')
const clc = require('cli-color')

const Api = require('../data/api')
let api = new Api()

const restaurantData = require('../data/restaurant-data')

const Table = require('cli-table')

const fiStrings = require('../strings/fi-strings')
const enStrings = require('../strings/en-strings')

const LocalStorage = require('node-localstorage').LocalStorage
const localStorage = new LocalStorage('./storage')

module.exports = class Menu {
    constructor(opts) {
        this.inEnglish = opts.english
        this.strings = this.inEnglish ? enStrings : fiStrings
        this.priceClasses = [
            this.strings.menu.priceClasses["Maukkaasti"],
            this.strings.menu.priceClasses["Edullisesti"],
            this.strings.menu.priceClasses["Kevyesti"],
            this.strings.menu.priceClasses["Bistro"]
        ]
        this.searchParams = {
            query: opts.query,
            idOnly: opts["id-only"],
            areaOnly: opts["area-only"],
            nameOnly: opts["name-only"],
            wholeWeek: opts['week']
        }
    }
    print() {
        var _this = this
        let query = this.searchParams.query
        if (!query) {
            query = localStorage.getItem("lastQuery")
        }
        if (!query) {
            console.log(this.strings.menu.errors.noQuery)
            return
        }
        localStorage.setItem("lastQuery", query)
        this.searchParams.query = query
        restaurantData.searchRestaurants(this.searchParams)
            .then((restaurants) => {
                if (!restaurants.length) {
                    console.log(_this.strings.menu.errors.noResults)
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
                            _this.parseAndPrintList(list, _this.searchParams.wholeWeek)
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
    printDaysMenu(menuOfDay, menuDate) {
        const table = new Table({
            head: [
                this.strings.menu.headers.name,
                this.strings.menu.headers.nutrition,
                this.strings.menu.headers.priceClass,
            ]
        })
        console.log(clc.red(menuDate.locale(this.inEnglish ? 'en-gb' : 'fi').format(this.strings.menu.dateFormat)))
        let foods = []
        for (var dataCount = 0; dataCount < menuOfDay.data.length; dataCount++) {
            let menuItem = menuOfDay.data[dataCount]
            let name = this.inEnglish? menuItem.name_en : menuItem.name
            let meta = menuItem.meta[0].join(", ")
            let priceClass = this.getPriceClass(menuItem.price.name)
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
        if (!foods.length) {
            console.log("-")
        }
        console.log(table.toString())
    }

    parseAndPrintList(list, wholeWeek) {
        for (var listCount = 0; listCount < list.length && listCount < 7; listCount++) {
            var menuOfDay = list[listCount]

            let menuDate = moment(menuOfDay.date_en, "ddd DD.MM").startOf('day')
            let today = moment().startOf('day')
            let found = false
            if ((today.isSame(menuDate) || wholeWeek) && menuOfDay.data.length) { // Is today
                found = true
                this.printDaysMenu(menuOfDay, menuDate)
            }
        }
    }

    getPriceClass(price) {
        for (let i = 0; i < this.priceClasses.length; i++) {
            let c = this.priceClasses[i]
            if (price.includes(c)) {
                return c
            }
        }
        return price
    }

}