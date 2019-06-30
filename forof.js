const asyncFunc = async function (req) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(req)
        }, 1000)
    })
}

const items = [ 1, 2, 3 ]

const test1 = async function() {
    console.log('start test1')
    for (let item of items) {
        const result = await asyncFunc(item)
        console.log('async done', result)
    }
    console.log('end test1')
}

const test2 = async function() {
    console.log('start test2')
    const results = items.map(async item => {
        const result = await asyncFunc(item)
        return results
    })
    console.log('results', results)
    console.log('end test2')
}

test1()
test2()
