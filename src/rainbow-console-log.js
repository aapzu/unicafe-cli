
const super_console_log = console.log.bind(console)
const clc = require('cli-color')

module.exports = (text) => {
    let message = ""
    if (typeof text === 'string' || text instanceof String) {
        let words = text.split(" ")
        let i = 0
        words.forEach((w) => {
            let color = clc.xterm(Math.floor(Math.random() * 256))
            message += color(w)
            if (i < words.length - 1) {
                message += " "
            }
            i++
        })
    } else {
        message = text
    }
    super_console_log(message)
}
