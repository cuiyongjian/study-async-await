// 理解resolve，reject函数

const p = new Promise((resolve, reject) => {
    // 这里的这个 resolve、reject，是Promise内部实现传来的两个参数。
    // 我们可以通过这俩函数来改变Promise对象的状态
    // 而Promise类型内部实际上会通过这俩函数来触发Promise内部状态标记的改变，同时触发已经注册到PRomise对象上的回调函数-->resolveCallback和rejectCallback; 并把callback的返回值包装为新Promise对象返回。
})


// 下面这个地方注册的其实就是 Promise对象p的状态变更后的callback了。
const newPromiseObj = p.then(function resolveCallback(res) {

}, function rejectCallback(err) {

})



// 其实如果不考虑返回值这些情况，也不考虑Promise自身有状态这一说的话。我们可以简单把Promise理解为 回调通过then的方式添加的一种语法糖。
// 例如我这么玩:

class MyPromise {
    constructor(asyncFunc) {
        this._rejectCallback = this._resolveCallback = null // 回调函数置空 等待注册
        asyncFunc(this.resolveCallback, this.rejectCallback) // 异步完成后，会回调我们对象内的resolve/rejectCallback方法
    }
    resolveCallback() {
        this._resolveCallback()
    }
    rejectCallback() {
        this._rejectCallback()
    }
    // 注册回调
    then(resolveCallback, rejectCallback) {
        this._resolveCallback = resolveCallback
        this._rejectCallback = rejectCallback
    }
}
// 其实可以看到，本质上then里面注册的resolve和reject回调函数。其实也相当于你初始化Promise对象时接收到的那个resolve/reject参数。只是中间会有些稍微技术桥接处理而已。
// 所以在这里有个例子：http://es6.ruanyifeng.com/#docs/async#await-%E5%91%BD%E4%BB%A4。  其中这个thenable对象，可以这么理解：是在then里面注册resolveCallback同时再then里面自己触发这个resolveCallback。（而正常情况下应该是像上面这样由一个最初初始化时的asyncFunc来触发的,这样才能保证创建Promise就开始执行异步任务了）

const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve()
    })
})

p.then((res) => {
    console.log('res', res)
}, err => {
    console.log('err', err)
})