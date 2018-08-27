import worker from '../../lib/worker'

function Func(value){
    this.value = value
}

describe('worker should', () => {
    beforeAll(() => {
        global.postMessage = jest.fn()
    })
    beforeEach(() => {
        global.postMessage.mockReset()
    })
    test('call simple stateless function', async () => {
        let func = (value) => {
            return value * value
        }
        let params ={ data : [{
            fn: func.toString(),
            args: [2]
        }]} 
        worker()(params)
        expect(global.postMessage).toBeCalledWith([4])
    })

    test('call function with context', async () => {
        Func.prototype.foo = function(){
            return this.value * this.value
        };
        
        var instance = new Func(2)
        let params ={ data : [{
            fn: instance.foo.toString(),
            context: instance
        }]} 
        worker()(params)
        expect(global.postMessage).toBeCalledWith([4])
    })

    test('call function with context and param', async () => {
        
        Func.prototype.foo2 = function(otherValue){
            return this.value * otherValue
        };
        
        var instance = new Func(2)
        let params ={ data : [{
            fn: instance.foo2.toString(),
            context: instance,
            args: [4]
        }]} 
        worker()(params)
        expect(global.postMessage).toBeCalledWith([8])
    })

    test('call class with context and param', async () => {
        class someClass {
            constructor(val){
                this.val = val
            }
            foo(some){
                return this.val * some
            }
        }
        
        var instance = new someClass(2)
        let params ={ data : [{
            fn: instance.foo.toString(),
            context: instance,
            args: [2]
        }]} 
        worker()(params)
        expect(global.postMessage).toBeCalledWith([4])
    })
})