
const Table = require('cli-table')

module.exports = class StringTable {
    constructor(tableStrings, opt) {
        if (!tableStrings.length || !tableStrings[0].length)
            throw "tableStrings must be a 2d array"
        let tableOptions = {}
        if (opt && opt.headerRow) {
            let headerRow = tableStrings[0]
            tableOptions.head = opt.headerRow
        } else if (opt && opt.headers) {
            tableOptions.head = opt.headers
        }
        this.table = new Table(tableOptions)
        const startIndex = opt && opt.headerRow ? 1 : 0
        for (let i = startIndex; tableStrings[i]; i++) {
            this.table.push(tableStrings[i])
        }
    }
    toString() {
        return this.table.toString()
    }
}