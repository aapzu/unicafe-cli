"use strict"

module.exports = {
    help: {
        text:` 
    Usage: unicafe-cli (-h | -r | -m) [query]

    An application to search from Unicafe's restaurants and menus

    Options:
       -h, --help                   Show this help menu
       -r, --restaurants [query]    List and/or search restaurants
       -m, --menu <query>           Show a menu of a restaurant

       -w, --week                   Show the menu for the whole this week
       -e, --english                Output the menus in english instead of finnish
       --only-id                    Search only from restaurant ids
       --only-area                  Search only from restaurant area names
       --only-name                  Search only from restaurant names
    If no restricting options provided, query is used to search from all of restaurants' data
`

    },
    restaurants: {
        list: {
            headers: {
                name: "Nimi",
                areaName: "Alue",
                id: "Id"
            }
        }
    },
    menu: {
        priceClasses: {
            "Maukkaasti":   "Maukkaasti",
            "Edullisesti":  "Edullisesti",
            "Kevyesti":     "Kevyesti",
            "Makeasti":     "Makeasti",
            "Bistro":       "Bistro"
        },
        headers: {
            name:       "Nimi",
            nutrition:  "",
            priceClass: ""
        },
        dateFormat: "ddd DD.MM.",
        errors: {
            noResults: "No found restaurants",
            noQuery: "A search query is required"
        }
    }
}