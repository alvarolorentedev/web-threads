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
    var webWorker = new Worker(URL.createObjectURL(new Blob([code], {
      type: 'text/javascript'
    })));

    webWorker.onmessage = function (result) {
      if (param.context) Object.assign(param.context, result.data[1]);
      resolve(result.data[0]);
    };

    webWorker.onerror = reject;
    var copy = Object.assign({}, param, {
      fn: param.fn.toString()
    });
    webWorker.postMessage([copy]);
  });
}

var func = function func(value) {
  return value * value;
};

var params = {
  fn: func.toString(),
  args: [2]
};
var ex1 = (function () {
  return execute(params);
});

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
var ex2 = (function () {
  return execute(params$1);
});

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
var ex3 = (function () {
  return execute(params$2);
});

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var someClass =
/*#__PURE__*/
function () {
  function someClass(val) {
    _classCallCheck(this, someClass);

    this.val = val;
  }

  _createClass(someClass, [{
    key: "foo",
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
var ex4 = (function () {
  return execute(params$3);
});

var element1 = document.getElementById("el1");
var element2 = document.getElementById("el2");
var element3 = document.getElementById("el3");
var element4 = document.getElementById("el4");
ex1().then(function (result) {
  element1.innerHTML = result;
}).catch(function () {
  element1.innerHTML = "Fail";
});
ex2().then(function (result) {
  element2.innerHTML = result;
}).catch(function () {
  element2.innerHTML = "Fail";
});
ex3().then(function (result) {
  element3.innerHTML = result;
}).catch(function () {
  element3.innerHTML = "Fail";
});
ex4().then(function (result) {
  element4.innerHTML = result;
}).catch(function () {
  element4.innerHTML = "Fail";
});
