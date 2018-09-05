
const _ = require('lodash')
const moment = require('moment')
const Item = require('./single-item-model')
const StringTable = require('../utils/string-table')
const strings = require('../strings/strings')

const priceClassesInOrder = [
    'Edullisesti',
    'Maukkaasti',
    'Bistro',
    'Makeasti',
    'Lisäke',
]

module.exports = class SingleMenu {
    constructor(menu, {inEnglish}) {
        this.date = moment(menu.date_en, "ddd DD.MM")
        this.items = menu.data
            .sort((a, b) => {
                const price1 = priceClassesInOrder.indexOf(a.price.name)
                const price2 = priceClassesInOrder.indexOf(b.price.name)
                if (typeof price1 === 'number' && typeof price2 === 'number' && a !== b) {
                    return price1 - price2
                }
                if (inEnglish) {
                    return a.name_en.localeCompare(b.name_en)
                }
                return a.name.localeCompare(b.name)
            })
            .map((item) => new Item(item, {
                inEnglish: inEnglish
            }))
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