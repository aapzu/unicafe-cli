
const _ = require('lodash')
const strings = require('../strings/strings')

module.exports = class SingleItem {
    constructor(item, {inEnglish}) {
        this.name = inEnglish ? item.name_en : item.name
        this.nutrition = item.nutrition
        this.priceClass = strings.menu.priceClasses[item.price.name]
        this.allergenFlags = item.meta[0].join(', ')
    }
    pickProps(props) {
        let responseArray = []
        _.each(props, (p) => {
            responseArray.push(this[p] !== undefined ? this[p] : "-")
        })
        return responseArray
    }
}