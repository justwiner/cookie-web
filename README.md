# cookie-web

[![NPM Version][npm-image]][npm-url]

Make cookies simpler.
## Install

```sh
npm install cookie-web
```
*or*

```sh
yarn add cookie-web
```

## Methods

```js
const {setCookie, getCookie, deleteCookie} = require('cookie-web')
```
*or*

```js
import {setCookie, getCookie, deleteCookie} from 'cookie-web'
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

### void deleteCookie (key)
Delete a cookie by key name  
use it !  

```js
setCookie('myCookie_1', 'hello')
setCookie('myCookie_2', 'my-cookie')
getCookie() // { myCookie_1: 'hello', myCookie_2: 'my-cookie' }
deleteCookie('myCookie_1')
getCookie('myCookie_1') // undefined
deleteCookie()
getCookie() // {}
```

- - -

*Thanks !*

[npm-image]: https://img.shields.io/npm/v/cookie-web.svg?style=flat
[npm-url]: https://www.npmjs.com/package/cookie-web