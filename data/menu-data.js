
const moment = require('moment')
const api = require('./api')

const restaurantData = require('./restaurant-data')
const Menu = require('../models/whole-menu-model')
const Restaurant = require('../models/restaurant-model')

const strings = require('../strings/strings')

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

exports.getMenuBySearchQuery = (searchParams, limit) => {
    
        if (!searchParams.query) {
            
            console.log(strings.menu.errors.noQuery)
            return
        }
        return
        restaurantData.searchRestaurants(searchParams)
            .then((r) => {
                if (!r.length) {
                    
                    console.log(strings.menu.errors.noResults)
                    return
                }
               const restaurants = r.slice(0, limit)
                .map((r) => api.getMenu(r.id))
                return
                Promise.all(restaurants)
        })
                    .then((results) => {
                        const menu = new Menu() results.forEach(( restaurant) = > {
                            menu.addRestaurant(new Restaurant(restaurant, {
                                days: getDays(searchParams.wholeWeek),
                                inEnglish: searchParams.inEnglish
                            }))
                        
            })
            return menu
        })
}
