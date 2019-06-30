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