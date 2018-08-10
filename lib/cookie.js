/**
 * Set a cookie based on a key-value pair.
 * Of course, there are also other configuration items
 * ( options = { expires, path, domain, secure } )
 * @param {String} key key name
 * @param {String} val kay value
 * @param {JSON} options extra setting
 */
function setCookie(key, val, options = {}) {
    const type_key = typeof key
    const type_val = typeof val
    const {
        expires,
        path,
        domain,
        secure
    } = options
    const type_time = typeof expires
    if (Object.is(type_key, 'undefined')) {
        throw new TypeError('key can\'t be undefined !')
    }
    if (!Object.is(type_key, 'string')) {
        throw new TypeError('key must be a string !')
    }
    if (Object.is(type_val, 'undefined')) {
        throw new TypeError('val can\'t be undefined !')
    }
    if (!Object.is(type_val, 'string')) {
        throw new TypeError('val must be a string !')
    }
    let date = null
    let expiresStr = ''
    if (Object.is(type_time, 'undefined')) {
        date = new Date(0x7fffffff * 1e3)
    } else if (Object.is(type_time, 'number')) {
        date = new Date();
        date.setTime(date.getTime() + expires);
    } else if (expires.toUTCString) {
        date = expires;
    } else {
        throw new TypeError('options.expires must be a number type or Date type')
    }
    expiresStr = `;expires=${date.toUTCString()}`
    const pathStr = path ? `;path=${path}` : '',
        domainStr = domain ? `;domain=${domain}` : '',
        secureStr = secure ? `;secure` : '';
    document.cookie = [key, '=', encodeURIComponent(val), expiresStr, pathStr, domainStr, secureStr].join('');
}

/**
 * Get a cookie by key name
 * @param {String} key key name
 */
function getCookie(key) {
    function getAllCookies() {
        let obj = {}
        const cookies = document.cookie.replace(/[ ]/g, "").split(";")
        const length = cookies.length
        for (let i = 0; i < length; i++) {
            const key_val = cookies[i].split('=')
            obj[key_val[0]] = key_val[1]
        }
        return obj;
    }
    const type_key = typeof key
    if (Object.is(type_key, 'undefined')) {
        return getAllCookies()
    }
    if (!Object.is(type_key, 'string')) {
        throw new TypeError('key must be a string !')
    }
    const cookies = document.cookie.replace(/[ ]/g, "").split(";")
    const length = cookies.length
    for (let i = 0; i < length; i++) {
        const key_val = cookies[i].split('=')
        if (key === key_val[0]) {
            return key_val[1]
        }
    }
    return undefined;
}

/**
 * Delete a cookie by key name
 * @param {String} key
 */
function deleteCookie(key) {
    function deleteACookie(key) {
        const date = new Date()
        date.setTime(date.getTime() - 10000)
        document.cookie = key + "=expired; expires =" + date.toGMTString()
    }
    const type_key = typeof key
    if (Object.is(type_key, 'undefined')) {
        const keys = document.cookie.match(/[^ =;]+(?=\=)/g);
        if (keys) {
            for (var i = keys.length; i--;) {
                deleteACookie(keys[i])
            }
        }
        return
    }
    if (!Object.is(type_key, 'string')) {
        throw new TypeError('key must be a string !')
    }
    deleteACookie(key)
}

exports = module.exports = {
    setCookie,
    getCookie,
    deleteCookie
}