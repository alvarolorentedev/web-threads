'use strict';

function worker() {
    function getFunctionArguments(fn){
        return fn.substring(fn.indexOf("(") + 1, fn.indexOf(")"))
    }
    function getFunctionContent(fn){
        return fn.substring(fn.indexOf("{") + 1, fn.lastIndexOf("}"))
    }
    
    function worker(params){
        var context = params.data[0].context;
        var fn = params.data[0].fn;
        var newFunc = new Function(getFunctionArguments(fn), getFunctionContent(fn));
        postMessage([newFunc.apply(context, params.data[0].args), context]);
    }
    
    self.onmessage = worker;
    return worker
}

let workerString = worker.toString();

const code = workerString.substring(workerString.indexOf("{") + 1, workerString.lastIndexOf("return"));

function execute(param){
    return new Promise((resolve, reject) => {
        const webWorker = new Worker(URL.createObjectURL(new Blob([code], {type: 'text/javascript'})));
        webWorker.onmessage = (result) => {
            if(param.context)
                Object.assign(param.context, result.data[1]);
            resolve(result.data[0]);
        };
        webWorker.onerror = reject;
        let copy = Object.assign({}, param, { fn: param.fn.toString() });
        webWorker.postMessage([copy]);
    })
}

let func = (value) => {
    return value * value
};
let params$3 = {
    fn: func.toString(),
    args: [2]
}; 

var ex1 = () => execute(params$3);

function Func$1(value){
    this.value = value;
}
Func$1.prototype.foo = function(){
    return this.value * this.value
};
var instance$2 = new Func$1(2);
let params$2 = {
    fn: instance$2.foo,
    context: instance$2
}; 

var ex2 = () => execute(params$2);

function Func(value){
    this.value = value;
}
Func.prototype.foo = function(otherValue){
    return this.value * otherValue
};
var instance$1 = new Func(2);
let params$1 = {
    fn: instance$1.foo,
    context: instance$1,
    args: [4]
}; 

var ex3 = () => execute(params$1);

class someClass {
    constructor(val){
        this.val = val;
    }
    foo(some){
        return this.val * some
    }
}

var instance = new someClass(2);
var params = {
    fn: instance.foo,
    context: instance,
    args: [4]
}; 

var ex4 = () => execute(params);

var element1 = document.getElementById("el1");
var element2 = document.getElementById("el2");
var element3 = document.getElementById("el3");
var element4 = document.getElementById("el4");
ex1().then((result) => {
    element1.innerHTML = result;
}).catch((a) => {
    element1.innerHTML = "Fail";
});
ex2().then((result) => {
    element2.innerHTML = result;
}).catch(() => {
    element2.innerHTML = "Fail";
});
ex3().then((result) => {
    element3.innerHTML = result;
}).catch(() => {
    element3.innerHTML = "Fail";
});
ex4().then((result) => {
    element4.innerHTML = result;
}).catch(() => {
    element4.innerHTML = "Fail";
});
