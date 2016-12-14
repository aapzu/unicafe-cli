#!/usr/bin/env node

"use strict";

const helpModule = require("./modules/help")
const restaurantModule = require("./modules/restaurants")
const menuModule = require('./modules/menu')

const strings = require('./strings/strings')

const optimist = require('optimist')
const argv = optimist.argv

if (argv.h) { // help
    helpModule.print(argv.h)
} else if (argv.r) { // restaurants
    restaurantModule.print(argv.r)

} else if (argv.m) { // menu
    let query = argv.m
    if (query === true) {
        ['w', 'i', 'a', 'n'].forEach((item) => {
            if (argv[item] && argv[item] !== true) {
                query = argv[item]
            }
        })
    }
    menuModule.print({
        query:      query,
        wholeWeek:  argv.w,
        isId:       argv.i,
        isArea:     argv.a,
        isName:     argv.n
    })
} else {
    console.log(strings.help.text)
}

