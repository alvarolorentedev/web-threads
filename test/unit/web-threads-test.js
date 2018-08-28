jest.mock('../../lib/worker', () => () => {`onmessage = function worker(params){ postMessage([params.data[0].args, params.data[0].context])} return`})
import worker from '../../lib/worker'
import { execute } from '../../lib/web-threads'
import faker from 'faker'



describe('web threads should', () => {
    let fakeResult = faker.random.uuid()
    let fakeContext = {some: faker.random.uuid()}
    const webWorkerMock = {
        postMessage: () => {webWorkerMock.onmessage({data: [fakeResult,fakeContext]})},
    }
    beforeAll(() => {
        global.Worker = jest.fn().mockImplementation(function() {return webWorkerMock})
        global.URL = {createObjectURL: jest.fn()}
    })
    test('call simple stateless function', async () => {
        let params = {
            fn: () => {return 2},
            args: [2],
            context: {some: faker.random.uuid()}
        }
        let result = execute(params)
        result = await result
        expect(result).toEqual(fakeResult)
        expect(params.context).toEqual(fakeContext)
    })
})