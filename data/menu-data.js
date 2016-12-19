
const moment = require('moment')
const Api = require('./api')
const api = new Api()

const restaurantData = require('./restaurant-data')
const Menu = require('../models/whole-menu-model')
const Restaurant = require('../models/restaurant-model')

const strings = require('../strings/strings')

const getMenuBySearchQuery = (searchParams, limit) => {
    return new Promise((resolve, reject) => {
        if (!searchParams.query) {
            // TODO: Change to resolve and test
            console.log(strings.menu.errors.noQuery)
            return
        }
        let menu = new Menu()
        restaurantData.searchRestaurants(searchParams)
            .then((restaurants) => {
                if (!restaurants.length) {
                    // TODO: Change to resolve and test
                    console.log(strings.menu.errors.noResults)
                    return
                }
                restaurants = restaurants.slice(0, limit)
                let promises = []
                restaurants.forEach((r) => {
                    promises.push(api.menu(r.id))
                })
                Promise.all(promises)
                    .then((results) => {
                        for (var resCount = 0; resCount < results.length; resCount++) {
                            let restaurant = results[resCount]
                            menu.addRestaurant(new Restaurant(restaurant, {
                                days: getDays(searchParams.wholeWeek),
                                inEnglish: searchParams.inEnglish
                            }))
                        }
                        resolve(menu)
                    })
                    .catch(reject)
            })
            .catch(reject)
    })
}

const getDays = (wholeWeek) => {
    let today = moment().startOf('day')
    let thisWeek = moment().startOf('isoWeek')

    let days = []
    if (!wholeWeek) {
        days.push(today.toString())
    } else {
        for (let i = 0; i < 7; i++) {
            days.push(thisWeek.toString())
            thisWeek.add(1, 'day')
        }
    }
    return days
}

module.exports = {
    getMenuBySearchQuery: getMenuBySearchQuery
}