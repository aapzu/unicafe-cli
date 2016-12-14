"use strict"

const strings = require('../strings/strings')

module.exports = class HelpModule {
    static print() {
        console.log(strings.help.text)
    }
}