// javascript 中的sleep

function sleep(interval) {
    return new Promise(resolve => {
        setTimeout(resolve, interval);
    })
}
  
// 用法
async function one2FiveInAsync() {
    for(let i = 1; i <= 5; i++) {
        console.log(i);
        await sleep(1000);
    }
}

one2FiveInAsync();

/* 
说明：
在多线程语言里。所谓sleep一般是真的让当前线程休眠几秒钟。而JavaScript中这里所谓的sleep是指的某段代码逻辑中的sleep，而不是整个线程sleep，否则js单线程就直接阻塞住了。
另一方面，其他语言的sleep是告诉CPU挂起当前线程吧。而js里通常实现的同步sleep是死循环，还会占用cpu。

在js中，要想把整个线程阻塞主，直接写个普通同步函数，在里面用死循环+Date.now和start进行判断就好了，这函数会让线程一直停在当前死循环这里，其实并不节省cpu资源。
而用上面的sleep，他可以让我们特定的某个异步函数sleep。这样这个sleep实际是个定时器，不会占用cpu资源。线程也可以继续做其他的任务。只是说在当前one2FiveInAsync这个函数内，我们实现了代码逻辑的sleep，在全局其实线程是没有sleep的。

*/