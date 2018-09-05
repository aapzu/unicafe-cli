"use strict"

const axios = require('axios')
const config = require('./api-config')

exports.getRestaurants = () => axios.get(config.uris.restaurants).then((res) => res.data)

exports.getMenu = (restaurantId) => axios.get(config.uris.menu(restaurantId)).then((res) => res.data)
