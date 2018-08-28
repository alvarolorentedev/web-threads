export default () => {
    function getFunctionArguments(fn){
        return fn.substring(fn.indexOf("(") + 1, fn.indexOf(")"))
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
