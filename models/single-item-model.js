
const _ = require('lodash')
const strings = require('../strings/strings')

module.exports = class SingleItem {
    constructor(item, {inEnglish}) {
        this.name = inEnglish ? item.name_en : item.name
        this.nutrition = item.nutrition
        this.priceClass = strings.menu.priceClasses[item.price.name]
        this.allergenFlags = item.meta[0].join(', ')
        this.allergenes = item.meta[1].join(', ')
    }
    pickToArray(props) {
        let _this = this
        let responseArray = []
        _.each(props, (p) => {
            responseArray.push(_this[p] !== undefined ? _this[p] : "-")
        })
        return responseArray
    }
}