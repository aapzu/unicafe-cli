var moment = require('moment')
var _ = require('lodash')

var Api = require('../api/api')
let api = new Api()

const Table = require('cli-table')

module.exports = class Menu {
    static print(id) {
        var _this = this
        api.menu(id)
            .then((res) => {
                let todaysMenu
                for (var i = 0; i < res.length; i++) {
                    var item = res[i]
                    let date = moment(item.date_en, "ddd DD.MM")
                    if (moment().diff(date, 'days') === 0) {
                        const table = new Table({
                            head: ['Nimi', '', '']
                        })
                        console.log(date.format("DD.MM.YYYY"))
                        let foods = []
                        for (var j = 0; j < item.data.length; j++) {
                            let menuItem = item.data[j]
                            let name = menuItem.name
                            let meta = menuItem.meta[0].join(", ")
                            let priceClass = _this._getPriceClass(menuItem.price.name)
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
                }
            })
            .catch(function(e) {
                throw e
            })
    }
    static _getPriceClass(price) {
        const classes = ["Maukkaasti", "Edullisesti", "Kevyesti", "Bistro"]
        for (let i = 0; i < classes.length; i++) {
            let c = classes[i]
            if (price.includes(c)) {
                return c
            }
        }
        return price
    }
}