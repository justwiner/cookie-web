const {
    setCookie,
    deleteCookie,
    getCookie
} = require('./cookie')

/**
 * Create multiple cookies from an array of objects or objects.
 * [{key, val, options}]
 * @param {*} obj
 */
function setCookies(obj) {
    let cookies = []
    if (obj instanceof Array) {
        cookies = obj
    } else if (obj instanceof Object) {
        cookies.push(obj)
    } else {
        throw new TypeError('param must be a object or array !')
    }
    cookies.forEach(e => {
        const {
            key,
            val,
            options
        } = e
        setCookie(key, val, options)
    });
}

/**
 * Delete multiple cookies from a string array or string
 * @param {Array} keys
 */
function deleteCookies(keys) {
    let deletes = []
    if (keys instanceof Array) {
        deletes = keys
    } else if (keys instanceof Object) {
        deletes.push(keys)
    } else if (typeof keys === 'string') {
        deletes.push({
            key: keys,
            options: {}
        })
    } else if (typeof keys === 'undefined') {
        deletes.push({
            key: undefined,
            options: {}
        })
    } else {
        throw new TypeError('param must be a object or array !')
    }
    deletes.forEach(e => {
        if (typeof e === 'string') {
            deleteCookie(e)
        } else if (e instanceof Object) {
            const {
                key,
                options
            } = e
            deleteCookie(key, options)
        }
    })
}

/**
 * Get multiple cookies from a string array or string and choose how to return the result
 * @param {Array} keys 键值数组或单个键值
 * @param {boolean} [ifJson=false]
 * @returns
 */
function getCookies(keys, ifJson = false) {
    let gets = []
    if (typeof keys === 'undefined') {
        return getCookie(ifJson)
    } else if (keys instanceof Array) {
        gets = keys
    } else if (typeof keys === 'string') {
        gets.push(keys)
    } else if (typeof keys === 'boolean') {
        return getCookie(keys)
    } else {
        throw new TypeError('param must be a array !')
    }
    let results = []
    gets.forEach(e => {
        results.push(getCookie(e + ''))
    })
    if (ifJson) {
        results = results.map((e, i) => {
            return {
                key: gets[i],
                val: e
            }
        })
    }
    if (results.length === 0) {
        return undefined
    } else if (results.length === 1 && typeof keys === 'string') {
        return results[0]
    } else {
        return results
    }
}

exports = module.exports = {
    setCookies,
    getCookies,
    deleteCookies
}