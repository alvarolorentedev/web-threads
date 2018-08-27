# ![logomakr_09u4zz](https://user-images.githubusercontent.com/3071208/44622482-88a91a80-a8b9-11e8-976c-fdd422ac5c98.png)

generic threads using web workers for the web

*On development not production ready*

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

##### Web graphic by <a href="http://www.flaticon.com/authors/picol">picol</a> from <a href="http://www.flaticon.com/">Flaticon</a> is licensed under <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0">CC BY 3.0</a>. Check out the new logo that I created on <a href="http://logomakr.com" title="Logo Makr">LogoMakr.com</a> https://logomakr.com/09u4Zz
