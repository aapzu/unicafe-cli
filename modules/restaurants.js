
var Api = require('../api/api')
let api = new Api()

const Table = require('cli-table')
const table = new Table({
    head: ['Name', 'Area Code', 'Id']
})

module.exports = class Restaurants {
    static print() {
        api.restaurants()
            .then((res) => {
                res.forEach((item) => {
                    table.push([
                        item.name,
                        item.areacode,
                        item.id
                    ])
                })
                console.log(table.toString())
            })
            .catch(function(e) {
                throw e
            })
    }
}