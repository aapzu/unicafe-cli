
const Api = require('./api/api')
const LocalStorage = require('node-localstorage').LocalStorage

const restaurantModule = require('./modules/restaurants')
const menuModule = require('./modules/menu')

// const localStorage = new LocalStorage()

const args = process.argv.slice(2,Infinity)




if (!args.length) {
    console.error("unicafe-cli needs arguments. run 'unicafe-cli help' to get help.")
}

const operation = args[0]

if (operation == "help") {
    console.log("You have called for help")
} else if (operation == "restaurants") {
    restaurantModule.print()
} else if (operation == "menu") {
    menuModule.print(args[1])
}

