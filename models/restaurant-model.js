
const _ = require('lodash')
const SingleMenu = require('./single-day-menu-model')
const clc = require('cli-color')

module.exports = class Restaurant {
    constructor({ information, data }, options) {
        this.name = information.restaurant
        this.menus = []
        this.days = options.days
        data.forEach((data) => {
            this.addMenu(new SingleMenu(data, options))
        })
    }
    addMenu(menu) {
       this.menus.push(menu)
    }
    getMenus() {
        return this.menus
    }
    toTable() {
        const menuTables = this.menus
            .filter((m) => this.days.includes(m.date.toString()))
            .map((m) => m.toTable())
        return `${clc.green(this.name)}\n\n${menuTables.join('\n')}`
    }
}