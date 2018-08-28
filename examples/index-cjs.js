'use strict';

var worker = (function () {
    function getFunctionArguments(fn) {
        return fn.substring(fn.indexOf("(") + 1, fn.indexOf(")"));
    }
    function getFunctionContent(fn) {
        return fn.substring(fn.indexOf("{") + 1, fn.lastIndexOf("}"));
    }

    function worker(params) {
        var context = params.data[0].context;
        var fn = params.data[0].fn;
        var newFunc = new Function(getFunctionArguments(fn), getFunctionContent(fn));
        postMessage([newFunc.apply(context, params.data[0].args), context]);
    }

    self.onmessage = worker;
    return worker;
});

var workerString = worker.toString();
var code = workerString.substring(workerString.indexOf("{") + 1, workerString.lastIndexOf("return"));

function execute(param) {
    return new Promise(function (resolve, reject) {
        var webWorker = new Worker(URL.createObjectURL(new Blob([code], { type: 'text/javascript' })));
        var copy = Object.assign({}, param, { fn: param.fn.toString() });
        webWorker.postMessage([copy]);
        webWorker.onmessage = function (result) {
            if (param.context) Object.assign(param.context, result.data[1]);
            resolve(result.data[0]);
        };
        webWorker.onerror = reject;
    });
}

var func = function func(value) {
    return value * value;
};
var params = {
    fn: func.toString(),
    args: [2]
};
execute(params).then(console.log).catch(console.error);

function Func(value) {
    this.value = value;
}
Func.prototype.foo = function () {
    return this.value * this.value;
};
var instance = new Func(2);
var params$1 = {
    fn: instance.foo,
    context: instance
};
execute(params$1).then(console.log).catch(console.error);

function Func$1(value) {
    this.value = value;
}
Func$1.prototype.foo = function (otherValue) {
    return this.value * otherValue;
};
var instance$1 = new Func$1(2);
var params$2 = {
    fn: instance$1.foo,
    context: instance$1,
    args: [4]
};
execute(params$2).then(console.log).catch(console.error);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var someClass = function () {
    function someClass(val) {
        _classCallCheck(this, someClass);

        this.val = val;
    }

    _createClass(someClass, [{
        key: 'foo',
        value: function foo(some) {
            return this.val * some;
        }
    }]);

    return someClass;
}();

var instance$2 = new someClass(2);
var params$3 = {
    fn: instance$2.foo,
    context: instance$2,
    args: [4]
};

execute(params$3).then(console.log).catch(console.error);