import worker from './worker'
let workerString = worker.toString()
const code = workerString.substring(workerString.indexOf("{") + 1, workerString.lastIndexOf("return"))
const webWorker = new Worker(URL.createObjectURL(new Blob([code], {type: 'text/javascript'})))

export function exec(param){
    let copy = { ...param, system: param.fn.toString() }
    webWorker.postMessage(copy)
    webWorker.onmessage = (result) => {
        if(param.context)
            Object.assign(param.context, result.data[0]);
        resolve(result.data[1])
    }
} 