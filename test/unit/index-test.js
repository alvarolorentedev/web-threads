import {worker} from '../../lib'

describe('index should', () => {
    test('call simple stateless function', async () => {
        global.postMessage = jest.fn()
        let params ={ data : [{
            functionString: 'function (a){ return a }',
            args: 2
        }]} 
        worker(params)
        expect(global.postMessage).toBeCalledWith([2])
    })

    test('call simple function with context', async () => {
        var myDemo = new Demo()
        global.postMessage = jest.fn()
        let params ={ data : [{
            functionString: 'function (a){ return a }',
            args: 2,
            context: undefined
        }]} 
        worker(params)
        expect(global.postMessage).toBeCalledWith([2])
    })
})