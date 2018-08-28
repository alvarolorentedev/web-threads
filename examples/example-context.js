import { execute } from '../lib/web-threads'

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