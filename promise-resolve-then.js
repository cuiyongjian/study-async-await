const p = Promise.resolve(123)
let pp

setTimeout(() => {
    pp = p.then((res) => {
        console.log('1000 miliseconds ago', res)
        return 'pp' + res
    })
}, 1000)


setTimeout(() => {
    pp.then((res) => {
        console.log('2000 miliseconds ago', res)
    })
}, 2000)


/*
说明:

1. 已经resolve的promise，可以在未来任意时候给她继续注册then回调，未来注册的then回调同样会被添加为一个microtask任务执行。

2. 一个promise的then函数返回的是另外一个promise(正常你直接返回普通数据的话就是一个resolve状态的promise)，你也可以同样在未来的时刻继续给这个返回的resolve状态的promise去注册then回调。（如例子中的pp变量）

*/