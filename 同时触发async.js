// 多个await命令后面的异步操作，如果不存在继发关系，最好让它们同时触发。

// 写法一
let [foo, bar] = await Promise.all([getFoo(), getBar()]);

// 写法二
let fooPromise = getFoo();
let barPromise = getBar();
let foo = await fooPromise;
let bar = await barPromise;



// 思考：
/* 
第二种写法是否会造成：虽然异步动作实现了并发，但是假如fooPromise完成的比较慢，那么就要等到barPromise完成后才能触发两个回调？

答案：经测验  是的，所以这种写法其实会有点小问题。但是如果跟Promise.all来比的话，其实是一样的，因为Promise.all也是等所有Promise都ok才触发回调。


所以，一般在并发 获取一系列文章url的内容 这种场景下，通常可以用如下2种写法：

async function dbFuc(db) {
  let docs = [{}, {}, {}];
  let promises = docs.map((doc) => db.post(doc));

  let results = await Promise.all(promises);
  console.log(results);
}

// 或者使用下面的写法

async function dbFuc(db) {
  let docs = [{}, {}, {}];
  let promises = docs.map((doc) => db.post(doc));

  let results = [];
  for (let promise of promises) {
    results.push(await promise);
  }
  console.log(results);
}



*/