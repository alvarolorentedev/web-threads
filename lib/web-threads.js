import worker from './worker'
let workerString = worker.toString()

const code = workerString.substring(workerString.indexOf("{") + 1, workerString.lastIndexOf("return"))

const mapToClonableContext = (context) => 
        Object.entries(context)
            .filter(keyValue => typeof keyValue[1] !== "function")
            .reduce((base, keyValue) => {
                base[keyValue[0]] = keyValue[1]
                return base
            }, {})

export function execute(param){
    return new Promise((resolve, reject) => {
        const webWorker = new Worker(URL.createObjectURL(new Blob([code], {type: 'text/javascript'})))
        webWorker.onmessage = (result) => {
            if(param.context)
                Object.assign(param.context, result.data[1])
            resolve(result.data[0])
        }
        webWorker.onerror = reject
        let copy = Object.assign({}, param, {
            fn: param.fn.toString(), 
            context: param.context
                ? mapToClonableContext(param.context) 
                : undefined
        })
        webWorker.postMessage([copy])
    })
} 