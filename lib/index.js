var getFunctionArguments = (functionString) => {
    return functionString.substring(functionString.indexOf("(") + 1, functionString.indexOf(")"))
}
var getFunctionContent = (functionString) => {
    return functionString.substring(functionString.indexOf("{") + 1, functionString.lastIndexOf("}"))
}

export function worker(params) {
    var functionString = params.data[0].functionString
    var newFunc = new Function(getFunctionArguments(functionString), getFunctionContent(functionString));
    postMessage([newFunc.call(null, 2)])
}

self.onmessage = worker