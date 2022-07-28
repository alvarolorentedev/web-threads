jest.mock('../../lib/worker', () => () => {`onmessage = function worker(params){if(params.error){throw "error"} postMessage([params.data[0].args, params.data[0].context])} return`})

import { execute } from '../../lib/web-threads'
import { faker } from '@faker-js/faker'
import { Blob } from 'buffer'

describe('web threads should', () => {
    beforeAll(() => {
        globalThis.Blob = Blob
    });

    test('call with context returns result', async () => {
        let fakeResult = faker.datatype.uuid()
        let fakeContext = {some: faker.datatype.uuid()}
        let somefun = () => {}
        const webWorkerMock = {
            postMessage: () => {webWorkerMock.onmessage({data: [fakeResult,fakeContext]})},
        }
        global.Worker = jest.fn().mockImplementation(() => webWorkerMock)
        global.URL = {createObjectURL: jest.fn()}
        let params = {
            fn: () => {return 2},
            args: [2],
            context: {some: faker.datatype.uuid(), somefun}
        }
        let result = execute(params)
        result = await result
        expect(result).toEqual(fakeResult)
        expect(params.context).toEqual(Object.assign(fakeContext,{ somefun }))
    })

    test('call without context returns result', async () => {
        let fakeResult = faker.datatype.uuid()
        let fakeContext = {some: faker.datatype.uuid()}
        const webWorkerMock = {
            postMessage: () => {webWorkerMock.onmessage({data: [fakeResult,fakeContext]})},
        }
        global.Worker = jest.fn().mockImplementation(() => webWorkerMock)
        global.URL = {createObjectURL: jest.fn()}
        let params = {
            fn: () => {return 2},
            args: [2]
        }
        let result = execute(params)
        result = await result
        expect(result).toEqual(fakeResult)
        expect(params.context).toBeUndefined()
    })

    test('call fails', async () => {
        let params = {
            error: true
        }
        try{
            await execute(params)
            expect(false).toBeTruthy()
        }
        catch(e){
        expect(true).toBeTruthy()
        }
    })
})