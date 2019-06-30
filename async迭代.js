/* 
  说明
  async 迭代这里主要是区分两种情况：迭代函数和for of迭代两种写法。
  其实理解了其中的道道，就很容易看出端倪。我们看下面的例子之后再解释：
*/


// 串行执行多个异步操作---要用for of
async function dbFuc(db) {
    let docs = [{}, {}, {}];

    for (let doc of docs) {
        await db.post(doc);
    }
}
// 上面为什么是串行的呢。因为我们看最本质的地方：最顶层dbFuc是async修饰的函数，内部await语句 db.post 就相当于yield，函数执行会停滞在这里等待异步完成再往后执行。
// 因此，循环会在每次迭代时都停滞在这里，等异步完成再进入下一次迭代。


// 我们并行执行的---迭代函数:
function dbFuc(db) { //这里不需要 async
    let docs = [{}, {}, {}];
    docs.forEach(async function (doc) {
      await db.post(doc);
    });
}
// 为什么这里就变成并行执行了？ 我们还是看本质的地方: 这里每个迭代函数是一个async修饰的函数，因此这个函数执行过程中遇到await会暂停。
// 但是请注意：外部的forEach并没有任何await修饰哦。所以forEach语句自身绝对不可能会停滞的，他会继续执行。
// 如果无法理解，你可以想象这样一个例子:
function foo() {
    async function bar() {
        console.log(2)
        await doFunc()
        console.log(4)
    }
    console.log(1)
    bar()
    console.log(3)
}
// 其中 bar函数执行时，其内部肯定会遇到await暂停，但暂停后并不影响外部foo函数继续往下执行。所以你会先看到3，再看到4



// 思考1？
// 能否在forEach迭代的时候 去掉迭代函数的async修饰，即:
async function dbFuc(db) {
    let docs = [{}, {}, {}];
    docs.forEach(function (doc) {
      await db.post(doc);
    });
}
// 注意：这样会报错的。因为我们仔细观察await语句所在的函数实际上是内部的这个迭代匿名函数，对于asyncawait语法来说，任何await必须放置在async修饰的函数内，所以这里会报错。

// 思考2？ 迭代函数并发请求时，一般用forEach还是map？
// 答：通常我们都要拿结果的，因此一般都要用map。用map之后会返回一个promise数组。我们需要使用Promise.all来获取所有Promise的返回值。或者用for of来依次await每一个promise拿到返回值。




