import { execute } from '../lib/web-threads'

let func = (value) => {
    return value * value
}
let params = {
    fn: func.toString(),
    args: [2]
} 
execute(params)
    .then(console.log)
    .catch(console.error)