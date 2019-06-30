// 利用async await可以实现优雅的多次重试机制

// http://es6.ruanyifeng.com/#docs/async#%E9%94%99%E8%AF%AF%E5%A4%84%E7%90%86

const superagent = require('superagent');
const NUM_RETRIES = 3;

async function test() {
  let i;
  for (i = 0; i < NUM_RETRIES; ++i) {
    try {
      await superagent.get('http://google.com/this-throws-an-error');
      break;
    } catch(err) {}
  }
  console.log(i); // 3
}

test();