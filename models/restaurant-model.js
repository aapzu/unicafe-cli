
const _ = require('lodash')
const SingleMenu = require('./single-day-menu-model')
const clc = require('cli-color')

module.exports = class Restaurant {
    constructor({information, data}, options) {
        let _this = this
        this.name = information.restaurant
        this.information = information
        this.menus = []
        this.days = options.days
        data.forEach((data) => {
            _this.addMenu(new SingleMenu(data, options))
        })
    }
    addMenu(menu) {
       this.menus.push(menu)
    }
    getMenus() {
        return this.menus
    }
    toTable() {
        let response = ""
        let menuTables = _.map(_.filter(this.menus, (m) => {
            return _.includes(this.days, m.date.toString())
        }), (m) => {
            return m.toTable()
        })
        response += clc.green(this.name) + '\n\n'
        response += menuTables.join('\n')
        return response
    }
}