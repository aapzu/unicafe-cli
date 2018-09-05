
const _ = require('lodash')
const moment = require('moment')
const Item = require('./single-item-model')
const StringTable = require('../utils/string-table')
const strings = require('../strings/strings')

const priceClassesInorder = [
    'Edullisesti',
    'Maukkaasti',
    'Bistro',
    'Makeasti',
    'Lisäke',
]

module.exports = class SingleMenu {
    constructor(menu, { inEnglish }) {
        this.date = moment(menu.date_en, "ddd DD.MM")
        this.items = menu.data
            .sort((a, b) => {
                const price1 = priceClassesInorder.indexOf(a.price.name)
                const price2 = priceClassesInorder.indexOf(b.price.name)
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
            const tableArray = []
            const table = new StringTable(this.items.map((item) => {
                tableArray.push(item.pickProps(['name', 'allergenFlags', 'priceClass']))
            }))
            response += table.toString()
        } else {
            response += strings.menu.errors.noMenus
        }
        return response
    }
}