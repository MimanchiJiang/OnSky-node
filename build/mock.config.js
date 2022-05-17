const fs = require('fs')
const path = require('path')

const mockBaseURL = '//note-server.hunger-valley.com'
const realBaseUEL = "//note-server.hunger-valley.com"

exports.config = function ({ isDev = true } = { isDev: true }) {
    let fileTxt = `
    module.exports = {
        baseURL:'${isDev ? mockBaseURL : realBaseUEL}'
    }
    `
    fs.writeFileSync(path.join(__dirname, '../src/helpers/config-baseURL.js'), fileTxt)

}