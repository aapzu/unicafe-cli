const clc = require('cli-color')

module.exports = {
    restaurants: {
        list: {
            headers: {
                name:       clc.green("Name"),
                areaName:   clc.green("Area"),
                id:         clc.green("ID")
            }
        }
    },
    menu: {
        priceClasses: {
            "Maukkaasti":   clc.blue("Maukkaasti"),
            "Edullisesti":  clc.magentaBright("Edullisesti"),
            "Makeasti":     "Makeasti",
            "Bistro":       "Bistro",
            "Lisäke":       ""
        },
        dateFormat: "ddd DD.MM.",
        errors: {
            noResults: clc.red("No found restaurants"),
            noQuery: clc.red("A search query is required"),
            noMenus: clc.red("No available menus")
        }
    }
}