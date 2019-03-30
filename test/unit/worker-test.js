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
        let func = function (value) {
            return value * value
        }
        let params ={ data : [{
            fn: func.toString(),
            args: [2]
        }]} 
        worker()(params)
        expect(global.postMessage).toBeCalledWith([4, undefined])
    })

    // test('call simple stateless function with lambda', async () => {
    //     let func = (value) => {
    //         return value * value
    //     }
    //     let params ={ data : [{
    //         fn: func.toString(),
    //         args: [2]
    //     }]} 
    //     worker()(params)
    //     expect(global.postMessage).toBeCalledWith([4, undefined])
    // })

    // test('call simple stateless function with lambda ignores other internal function calls', async () => {
    //     let func = (value) => {
    //         function a(){}
    //         a()
    //         return value * value
    //     }
    //     let params ={ data : [{
    //         fn: func.toString(),
    //         args: [2]
    //     }]} 
    //     worker()(params)
    //     expect(global.postMessage).toBeCalledWith([4, undefined])
    // })

    // test('call simple stateless function with lambda without parenthesis', async () => {
    //     let func = value => {
    //         return value * value
    //     }
    //     let params ={ data : [{
    //         fn: func.toString(),
    //         args: [2]
    //     }]} 
    //     worker()(params)
    //     expect(global.postMessage).toBeCalledWith([4, undefined])
    // })

    // test('call function with context', async () => {
    //     Func.prototype.foo = function(){
    //         let result = this.value * this.value
    //         this.value = result
    //         return result
    //     };
        
    //     var instance = new Func(2)
    //     let params ={ data : [{
    //         fn: instance.foo.toString(),
    //         context: instance
    //     }]} 
    //     worker()(params)
    //     expect(global.postMessage).toBeCalledWith([4, {value: 4}])
    // })

    // test('call function with context and param', async () => {
        
    //     Func.prototype.foo2 = function(otherValue){
    //         let result = this.value * otherValue
    //         this.value = result
    //         return result
    //     };
        
    //     var instance = new Func(2)
    //     let params ={ data : [{
    //         fn: instance.foo2.toString(),
    //         context: instance,
    //         args: [4]
    //     }]} 
    //     worker()(params)
    //     expect(global.postMessage).toBeCalledWith([8, {value: 8}])
    // })

    // test('call class with context and param', async () => {
    //     class someClass {
    //         constructor(value){
    //             this.value = value
    //         }
    //         foo(some){
    //             let result = this.value * some
    //             this.value = result
    //             return result
    //         }
    //     }
        
    //     var instance = new someClass(2)
    //     let params ={ data : [{
    //         fn: instance.foo.toString(),
    //         context: instance,
    //         args: [2]
    //     }]} 
    //     worker()(params)
    //     expect(global.postMessage).toBeCalledWith([4, {value: 4}])
    // })
})