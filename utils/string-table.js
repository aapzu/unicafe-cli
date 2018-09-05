const Table = require('cli-table')

module.exports = class StringTable {
    constructor(tableStrings, opt) {
        if (!tableStrings.length || !tableStrings[0].length) {
            throw "tableStrings must be a 2d array"
        }
        this.table = new Table({
            head: opt && (opt.headerRow || opt.headers) || '',
        })
        const startIndex = opt && opt.headerRow ? 1 : 0
        for (let i = startIndex; tableStrings[i]; i++) {
            this.table.push(tableStrings[i])
        }
    }
    toString() {
        return this.table.toString()
    }
}