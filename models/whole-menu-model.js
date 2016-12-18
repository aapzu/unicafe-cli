
const _ = require('lodash')

module.exports = class WholeMenu {
    constructor(options) {
        this.options = options
        this.restaurants = []
    }
    addRestaurant(r) {
        this.restaurants.push(r)
        _.sortBy(this.restaurants, 'name')
    }
    getRestaurants() {
        return this.restaurants
    }
    toTable() {
        let restaurantTables = _.map(this.restaurants, (r) => {
            return r.toTable()
        })
        return restaurantTables.join('\n\n')
    }
}