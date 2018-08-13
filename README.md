# cookie-web

[![NPM Version][npm-image]][npm-url]
[![NPM Version][download-image]][npm-url]
![NPM Version][license-image]

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
const cookie = require('cookie-web')
```

```js
import cookie from 'cookie-web'
```

### *void cookie.setOne (key, val, options = {})*
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
cookie.setOne('myCookie', 'test')
cookie.setOne(2, 'test') // TypeError: key must be a string !
cookie.setOne('test') // TypeError: key can't be undefined !
cookie.setOne('myCookie', 2) // TypeError: val must be a string !
cookie.setOne('myCookie') // TypeError: val can't be undefined !
cookie.setOne('myCookie', 'test', {
    expires: 1 * 1000 * 60, // one minite
})
cookie.setOne('myCookie', 'test', {
    expires: 1 * 1000 * 60 * 60, // one hour
    path: '/', // also: /someRoute
    domain: '.google.com',
    secure: true
})
```

### *void cookie.set(obj)*
Create multiple cookies from an array of objects or objects.  
[{key, val, options}] *or* {key, val, options}  
```js
cookie.set([{
      key: 'cookie_1',
      val: 'value_1'
    },
    {
      key: 'cookie_2',
      val: 'value_2',
      options: {
        path: '/home'
      }
    },
    {
      key: 'cookie_3',
      val: 'value_3',
      options: {
        path: '/home',
        expires: 1 * 1000 * 60 * 60,
        secure: true
      }
    },
    {
      key: 'cookie_4',
      val:'value_4',
      options: {
        path: '/menu',
        expires: 1 * 1000 * 60 * 60
      }
    }])
    
cookie.set({
      key: 'cookie_1',
      val: 'value_1'
    })
```

### *string cookie.getOne(key)*
Get a cookie by key name  
use it !  

```js
cookie.setOne('myCookie_1', 'hello')
cookie.setOne('myCookie_2', 'my-cookie')

cookie.getOne('myCookie_1') // 'hello'
cookie.getOne('myCookie_1', true) // {'myCookie_1': 'hello'}
cookie.getOne('myOtherCookie') // undefined
cookie.getOne(true) // { myCookie_1: 'hello', myCookie_2: 'my-cookie' }
cookie.getOne() // ['hello', 'my-cookie']
```
### *cookie.get(keys)*
Get multiple cookies from a string array or string and choose how to return the result
```js
cookie.set([{
      key: 'cookie_1',
      val: 'value_1'
    },
    {
      key: 'cookie_2',
      val: 'value_2',
    }])

cookie.get(['cookie_1', 'cookie_2'], true) // [{'cookie_1': 'value_1'}, {'cookie_2': 'value_2'}]
cookie.get() // ['value_1', 'value_2']
cookie.get('cookie_1', true) // {'cookie_1', 'value_1'}
cookie.get('cookie_1') // 'value_1'
```

### *void cookie.deleteOne(key, options)*
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
cookie.setOne('myCookie_1', 'hello')
cookie.setOne('myCookie_2', 'my-cookie')
cookie.getOne() // ['hello', 'my-cookie']
cookie.deleteOne('myCookie_1')
cookie.getOne() // ['my-cookie']
cookie.deleteOne()
cookie.getOne() // undefined
```
But when you set the **path/domain** property before you create it, when deleting, you must use the same **path** and **domain** to delete it correctly!
```js
cookie.setOne('myCookie_1', 'hello', {
    path: '/home',
    domain: '.google.com'
})
cookie.deleteOne('myCookie_1', {
    path: '/home',
    domain: '.google.com'
}) // delete 'myCookie_1'
cookie.deleteOne(undefined, {
    path: '/home',
    domain: '.google.com'
}) // delete all path: '/home' , domain: '.google.com'
```

### *void cookie.delete(keys)*
Delete multiple cookies from a string array or string
```js
cookie.set([{
      key: 'cookie_1',
      val: 'value_1'
    },
    {
      key: 'cookie_2',
      val: 'value_2'
    },
    {
      key: 'cookie_3',
      val: 'value_3',
      options: {
        path: '/home'
      }
    },
    {
      key: 'cookie_4',
      val:'value_4'
    }])


cookie.delete([
    'cookie_1',
    'cookie_2',
    {
      key: 'cookie_3',
      options: {
        path: '/home'
      }
    }])
cookie.delete('cookie_4')
cookie.delete() // delete all path: '/'
```

- - -

*Thanks !*

[npm-image]: https://img.shields.io/npm/v/cookie-web.svg?style=flat
[npm-url]: https://www.npmjs.com/package/cookie-web
[download-image]: https://img.shields.io/npm/dt/cookie-web.svg?style=flat
[license-image]: https://img.shields.io/npm/l/express.svg