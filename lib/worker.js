var getFunctionArguments = (fn) => {
    return fn.substring(fn.indexOf("(") + 1, fn.indexOf(")"))
}
var getFunctionContent = (fn) => {
    return fn.substring(fn.indexOf("{") + 1, fn.lastIndexOf("}"))
}

export function worker(params) {
    var context = params.data[0].context || self
    var fn = params.data[0].fn
    var newFunc = new Function(getFunctionArguments(fn), getFunctionContent(fn));
    postMessage([newFunc.apply(context, params.data[0].args)])
}

self.onmessage = worker