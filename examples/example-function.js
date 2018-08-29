import { execute } from '../lib/web-threads'

let func = (value) => {
    return value * value
}
let params = {
    fn: func.toString(),
    args: [2]
} 

export default () => execute(params)