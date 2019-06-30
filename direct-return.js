const test = async function () {
    // return await 123
    return 123
}

test().then(res => {
    console.log('then to here')
})
console.log('first to here')

// 说明
// 哪怕async函数中是直接返回了一个数据，没有任何异步操作。实际上await或return后面的数据都会被包装成第一个resolve状态的promise。想想Promise.resolve是不是也是异步的呢？
// 所以该async函数依然是异步的。