const cookieLib = require('./lib/cookie')

const setCookie = cookieLib.setCookie,
    deleteCookie = cookieLib.deleteCookie,
    getCookie = cookieLib.getCookie;

const cookie = {
    setCookie,
    deleteCookie,
    getCookie
}

exports = module.exports = {
    setCookie,
    deleteCookie,
    getCookie
}
exports = module.exports = cookie