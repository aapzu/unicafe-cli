
module.exports = {
    help: {
        text:` 
    Usage: unicafe-cli (-h | -r | -m) [query]

    An application to search from Unicafe's restaurants and menus

    Options:
       -h              Show this help menu
       -r [query]      List and/or search restaurants
       -m <query>      Show a menu of a restaurant

       -w              Show the menu for the whole this week
       -i              Search only from restaurant ids
       -a              Search only from restaurant area names
       -n              Search only from restaurant names
    If no restricting options provided, query is used to search from all of restaurants' data
    
    Menus from Unicafe (http://www.unicafe.fi)
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
            noQuery: "Menu needs a search query",
            noResults: "No found restaurants"
        }
    }
}