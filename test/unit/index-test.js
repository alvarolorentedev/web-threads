import {worker} from '../../lib'

describe('index should', () => {
    test('construct using library', async () => {
        global.postMessage = jest.fn()
        let params ={ data : [{
            functionString: 'function (a){ return a }',
            args: 2
        }]} 
        worker(params)
        expect(global.postMessage).toBeCalledWith([2])
    })
})