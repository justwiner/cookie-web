if (!Object.is(typeof window, 'undefined') && global === window) {
    const {
        setCookie,
        getCookie,
        deleteCookie
    } = require('./lib/cookie')
    const {
        setCookies,
        getCookies,
        deleteCookies
    } = require('./lib/cookieJson')

    const cookie = {
        setOne: setCookie,
        deleteOne: deleteCookie,
        getOne: getCookie,
        set: setCookies,
        delete: deleteCookies,
        get: getCookies
    }

    exports = module.exports = cookie
} else {
    throw new ReferenceError('Cookie-web must be running in the web environment!')
}