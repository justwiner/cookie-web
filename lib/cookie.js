/**
 * Set a cookie based on a key-value pair.
 * Of course, there are also other configuration items
 * ( options = { expires, path, domain, secure } )
 * @param {String} key key name
 * @param {String} val kay value
 * @param {Object} options extra setting
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
    if (Object.is(type_val, 'string')) {

    } else if (Object.is(type_val, 'object')) {
        val = JSON.stringify(val)
    } else {
        throw new TypeError('val must be a string or object!')
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
function getCookie(key, ifJson) {
    function getAllCookies(ifJson = false) {
        const cookies = document.cookie.replace(/[ ]/g, "").split(";")
        const length = cookies.length
        if (length === 1 && cookies[0] === '') {
            return undefined
        }
        let result = []
        let keys = []
        for (let i = 0; i < length; i++) {
            const key_val = cookies[i].split('=')
            let val = null
            try {
                val = JSON.parse(key_val[1])
            } catch (e) {
                val = key_val[1]
            }
            result.push(val)
            keys.push(key_val[0])
        }
        if (ifJson) {
            result = result.map((e, i) => {
                return {
                    key: keys[i],
                    val: e
                }
            })
        }
        return result;
    }
    const type_key = typeof key
    if (Object.is(type_key, 'undefined')) {
        return getAllCookies()
    } else if (Object.is(type_key, 'boolean') && Object.is(typeof ifJson, 'undefined')) {
        return getAllCookies(key)
    }
    if (!Object.is(type_key, 'string')) {
        throw new TypeError('key must be a string !')
    }
    ifJson = ifJson || false
    const type_ifJson = typeof ifJson
    if (Object.is(type_ifJson, 'boolean')) {
        const cookies = document.cookie.replace(/[ ]/g, "").split(";")
        const length = cookies.length
        for (let i = 0; i < length; i++) {
            const key_val = cookies[i].split('=')
            if (key === key_val[0]) {
                if (ifJson) {
                    return {
                        key: key_val[0],
                        val: key_val[1]
                    }
                } else {
                    return key_val[1]
                }
            }
        }
        return undefined;
    } else {
        throw new TypeError('ifJson must be a boolean !')
    }
}

/**
 * Delete a cookie by key name
 * Of course, when you set the path/domain property before you create it
 * you should set options,it must be the same as you create it!
 * ( options = { path, domain } )
 * @param {String} key
 * @param {Object} options extra setting
 */
function deleteCookie(key, options = {}) {
    function deleteACookie(key, options) {
        const date = new Date()
        date.setTime(date.getTime() - 10000)
        const {
            path,
            domain
        } = options
        const expiresStr = `;expires =${date.toGMTString()}`,
            pathStr = path ? `;path=${path}` : '',
            domainStr = domain ? `;domain=${domain}` : '';
        document.cookie = `${key}=expired;${expiresStr}${pathStr}${domainStr}`
    }
    const type_key = typeof key
    if (Object.is(type_key, 'undefined')) {
        const keys = document.cookie.match(/[^ =;]+(?=\=)/g);
        if (keys) {
            for (var i = keys.length; i--;) {
                deleteACookie(keys[i], options)
            }
        }
        return
    }
    if (!Object.is(type_key, 'string')) {
        throw new TypeError('key must be a string !')
    }
    deleteACookie(key, options)
}

exports = module.exports = {
    setCookie,
    getCookie,
    deleteCookie
}