import { execute } from '../lib/web-threads'

class someClass {
    constructor(val){
        this.val = val
    }
    foo(some){
        return this.val * some
    }
}

var instance = new someClass(2)
var params = {
    fn: instance.foo,
    context: instance,
    args: [4]
} 

execute(params)
    .then(console.log)
    .catch(console.error)