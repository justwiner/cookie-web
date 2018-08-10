# cookie-web

[![NPM Version][npm-image]][npm-url]

Make cookies simpler.
## Install

```sh
npm install cookie-web
```

```sh
yarn add cookie-web
```

## Methods

```js
const {setCookie, getCookie, deleteCookie} = require('cookie-web')
```

```js
import {setCookie, getCookie, deleteCookie} from 'cookie-web'
```
```js
const cookie = require('cookie-web')
```

```js
import cookie from 'cookie-web'
```

### void setCookie (key, val, options = {})
Set a cookie based on a key-value pair.  
Of course, there are also other configuration items

```js
options = {  
    expires,  // Expires time
    path,  // Accessible path
    domain,  // Accessible hostname
    secure  // Encrypted Transport (true / false)
}
```

so, how to use it?

```js
setCookie('myCookie', 'test')
setCookie(2, 'test') // TypeError: key must be a string !
setCookie('test') // TypeError: key can't be undefined !
setCookie('myCookie', 2) // TypeError: val must be a string !
setCookie('myCookie') // TypeError: val can't be undefined !
setCookie('myCookie', 'test', {
    expires: 1 * 1000 * 60, // one minite
})
setCookie('myCookie', 'test', {
    expires: 1 * 1000 * 60 * 60, // one hour
    path: '/', // also: /someRoute
    domain: '.google.com',
    secure: true
})
```

### string getCookie (key)
Get a cookie by key name  
use it !  

```js
setCookie('myCookie_1', 'hello')
setCookie('myCookie_2', 'my-cookie')

getCookie('myCookie_1') // 'hello'
getCookie('myOtherCookie') // undefined
getCookie() // { myCookie_1: 'hello', myCookie_2: 'my-cookie' }
```

### void deleteCookie (key, options)
Delete a cookie by key name  
Of course, when you set the path/domain property before you create it
you should set options,it must be the same as you create it!
```js
options = {
    path,
    domain
}
```
use it !  

```js
setCookie('myCookie_1', 'hello')
setCookie('myCookie_2', 'my-cookie')
getCookie() // { myCookie_1: 'hello', myCookie_2: 'my-cookie' }
deleteCookie('myCookie_1')
getCookie('myCookie_1') // undefined
deleteCookie()
getCookie() // undefined
```
But when you set the **path/domain** property before you create it, when deleting, you must use the same **path** and **domain** to delete it correctly!
```js
setCookie('myCookie_1', 'hello', {
    path: '/home',
    domain: '.google.com'
})
cookie.deleteCookie('myCookie_1', {
    path: '/home',
    domain: '.google.com'
}) // delete 'myCookie_1'
cookie.deleteCookie(undefined, {
    path: '/home',
    domain: '.google.com'
}) // delete all
```

- - -

*Thanks !*

[npm-image]: https://img.shields.io/npm/v/cookie-web.svg?style=flat
[npm-url]: https://www.npmjs.com/package/cookie-web