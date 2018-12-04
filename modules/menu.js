const menuData = require('../data/menu-data')

module.exports = class Menu {
    constructor(opts) {
        this.searchParams = {
            query: opts.query,
            idOnly: opts["id-only"],
            areaOnly: opts["area-only"],
            nameOnly: opts["name-only"],
            wholeWeek: opts['week'],
            veganOnly: opts['vegan-only'],
            vegetarianOnly: opts['vegetarian-only'],
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