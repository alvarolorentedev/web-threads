import { execute } from '../lib/web-threads'

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

export default () => execute(params)