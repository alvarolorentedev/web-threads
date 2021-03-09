# ![logomakr_09u4zz](https://user-images.githubusercontent.com/3071208/44622482-88a91a80-a8b9-11e8-976c-fdd422ac5c98.png)
[![Build Status](https://travis-ci.org/kanekotic/web-threads.svg?branch=master)](https://travis-ci.org/kanekotic/web-threads)
[![codecov](https://codecov.io/gh/kanekotic/web-threads/branch/master/graph/badge.svg)](https://codecov.io/gh/kanekotic/web-threads)
[![npm](https://img.shields.io/npm/dt/web-threads.svg)](https://github.com/kanekotic/web-threads)
[![GitHub license](https://img.shields.io/github/license/kanekotic/web-threads.svg)](https://github.com/kanekotic/web-threads/blob/master/LICENSE)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/kanekotic/web-threads/graphs/commit-activity)

generic threads using web workers for the web

## Installation

add it to your project using `npm install web-threads --save` or `yarn add web-threads`

## Usage

### Simple function with arguments

```js
import { execute } from 'web-threads'

let func = (value) => {
    return value * value
}
let params = {
    fn: func.toString(),
    args: [2]
} 
execute(params)
    .then(console.log)
    .catch(console.error)
```

### Function with context

```js
import { execute } from 'web-threads'

function Func(value){
    this.value = value
}
Func.prototype.foo = function(){
    return this.value * this.value
};
var instance = new Func(2)
let params = {
    fn: instance.foo,
    context: instance
} 
execute(params)
    .then(console.log)
    .catch(console.error)
```

### Function with context and arguments

```js
import { execute } from 'web-threads'

function Func(value){
    this.value = value
}
Func.prototype.foo = function(otherValue){
    return this.value * otherValue
};
var instance = new Func(2)
let params = {
    fn: instance.foo,
    context: instance,
    args: [4]
} 
execute(params)
    .then(console.log)
    .catch(console.error)
```

### ES6 class call function with arguments

```js
import { execute } from 'web-threads'

class someClass {
    constructor(val){
        this.val = val
    }
    foo(some){
        return this.val * some
    }
}

var instance = new someClass(2)
let params = {
    fn: instance.foo,
    context: instance,
    args: [4]
} 
execute(params)
    .then(console.log)
    .catch(console.error)
```
#### Inspired in:
 - [work done pairing with @kmruiz for ui.wind.js](https://github.com/CodeInBrackets/ui.wind.js)
 - [scottlogic.com post](https://blog.scottlogic.com/2011/02/24/web-workers-part-3-creating-a-generic-worker.html)
 - [@vkiryukhin](http://www.eslinstructor.net/vkthread/)

 
##### Web graphic by <a href="http://www.flaticon.com/authors/picol">picol</a> from <a href="http://www.flaticon.com/">Flaticon</a> is licensed under <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0">CC BY 3.0</a>. Check out the new logo that I created on <a href="http://logomakr.com" title="Logo Makr">LogoMakr.com</a> https://logomakr.com/09u4Zz
