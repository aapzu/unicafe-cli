"use strict"

const moment = require('moment')
const _ = require('lodash')

const Api = require('../data/api')
let api = new Api()

const menuData = require('../data/menu-data')

const strings = require('../strings/strings')

module.exports = class Menu {
    constructor(opts) {
        this.searchParams = {
            query: opts.query,
            idOnly: opts["id-only"],
            areaOnly: opts["area-only"],
            nameOnly: opts["name-only"],
            wholeWeek: opts['week'],
            inEnglish: opts.english
        }
    }
    print() {
        menuData.getMenuBySearchQuery(this.searchParams)
            .then((menu) => {
                console.log(menu.toTable())
            })
            .catch((e) => {
                console.log(e.stack)
            })
    }

}