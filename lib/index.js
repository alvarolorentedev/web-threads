export function worker(params) {
    var getFunctionArguments = (functionString) => {
        return functionString.substring(functionString.indexOf("(") + 1, functionString.indexOf(")"))
    }
    var getFunctionContent = (functionString) => {
        return functionString.substring(functionString.indexOf("{") + 1, functionString.lastIndexOf("}"))
    }
    var functionArguments = getFunctionArguments(params.data[0].functionString)
    var functionContent = getFunctionContent(params.data[0].functionString)
    var newFunc = new Function(functionArguments, functionContent);
    postMessage([newFunc.call(null, 2)])
}