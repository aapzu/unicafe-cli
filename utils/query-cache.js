
const LocalStorage = require('node-localstorage').JSONStorage
const localStorage = new LocalStorage('./storage')

const check = (opts) => {
    if (opts.favorite) {
        delete opts.favorite
        localStorage.setItem("opts", opts)
    } else if (!opts.query && !opts.restaurants) {
        opts = localStorage.getItem("opts")
    }
    return opts
}

module.exports = {
    check: check
}