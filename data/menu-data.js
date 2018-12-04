const moment = require('moment')
const Api = require('./api')
const api = new Api()

const restaurantData = require('./restaurant-data')
const Menu = require('../models/whole-menu-model')
const Restaurant = require('../models/restaurant-model')

const strings = require('../strings/strings')

const getMenuBySearchQuery = (searchParams, limit) => {
    if (!searchParams.query) {
        console.log(strings.menu.errors.noQuery)
        return
    }
    const menu = new Menu()
    return restaurantData.searchRestaurants(searchParams)
        .then((restaurants) => {
            if (!restaurants.length) {
                console.log(strings.menu.errors.noResults)
                return
            }
            restaurants = restaurants.slice(0, limit)
            return Promise.all(restaurants.map((r) => api.menu(r.id)))
        })
        .then((results) => {
            const { wholeWeek, ...params } = searchParams
            results.forEach((restaurant) => {
                menu.addRestaurant(new Restaurant(restaurant, {
                    days: getDays(wholeWeek),
                    ...params,
                }))
            })
            return menu
        })
}

const getDays = (wholeWeek) => {
    const today = moment().startOf('day')
    const thisWeek = moment().startOf('isoWeek')

    const days = []
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
    getMenuBySearchQuery: getMenuBySearchQuery,
}
