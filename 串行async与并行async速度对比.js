function sleep(time) {
    return new Promise(resolve => {
      setTimeout(() => {
        return resolve();
      }, time);
    });
  }
  
  async function test() {
    const userItem = [1,2,3,4,5,6,7]
    console.time('程序耗时1');
    for (const item of userItem) {
      await sleep(1000);
    }
    console.timeEnd('程序耗时1');
    console.time('程序耗时2');
    await Promise.all(userItem.map(async item => {
      const user = await sleep(1000);
      return user;
    }));
    console.timeEnd('程序耗时2');
  }

  test()

  // 正常情况下，都是串行是并行的耗时的N倍。
  // 不过在查数据库的时候，有可能有不符合常理的情况。如cnode上看到这么个帖子: https://cnodejs.org/topic/5cf8d9d495fcc914aa266c03