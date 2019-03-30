export default () => {
    function getFunctionArguments(fn){
        const lambdaIndex = fn.indexOf("=>")
        const paramIndex = fn.indexOf("(")
        const start = paramIndex < lambdaIndex ? paramIndex + 1 : 0
        const end = paramIndex < lambdaIndex ? fn.indexOf(")") : lambdaIndex
        console.log(fn)
        console.log(lambdaIndex)
        console.log(paramIndex)
        console.log(start)
        console.log(end)
        return fn.substring(start, end)
    }
    function getFunctionContent(fn){
        return fn.substring(fn.indexOf("{") + 1, fn.lastIndexOf("}"))
    }
    
    function worker(params){
        var context = params.data[0].context
        var fn = params.data[0].fn
        var newFunc = new Function(getFunctionArguments(fn), getFunctionContent(fn))
        postMessage([newFunc.apply(context, params.data[0].args), context])
    }
    
    self.onmessage = worker
    return worker
}
