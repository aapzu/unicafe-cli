
const _ = require('lodash')
const moment = require('moment')
const Item = require('./single-item-model')
const StringTable = require('../utils/string-table')
const strings = require('../strings/strings')

module.exports = class SingleMenu {
    constructor(menu, {inEnglish}) {
        this.menu = menu.data
        this.date = moment(menu.date_en, "ddd DD.MM")
        this.message = menu.message
        this.items = []
        this.menu.forEach((item) => {
            this.items.push(new Item(item, {
                inEnglish: inEnglish
            }))
        })
        this.items = _.sortBy(this.items, [(item) => {
            if (item.priceClass == "Edullisesti")
                return 0
            else if (item.priceClass == "Maukkaasti")
                return 1
            else if (item.priceClass == "Bistro")
                return 2
            else if (item.priceClass == "Makeasti")
                return 3
            else if (item.priceClass == "Lisäke")
                return 4
            else
                return 5
        }, (item) => {
            return item.name
        }])
    }
    toTable() {
        let response = this.date.format(strings.menu.dateFormat) + "\n"
        if (this.items.length) {
            let tableArray = []
            _.each(this.items, (item) => {
                tableArray.push(item.pickToArray(['name', 'allergenFlags', 'priceClass']))
            })
            let table = new StringTable(tableArray)
            response += table.toString()
        } else {
            response += strings.menu.errors.noMenus
        }

        return response
    }
}