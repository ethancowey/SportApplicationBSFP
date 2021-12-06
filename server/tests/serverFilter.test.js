const serverFilter = require('../components/serverFilter')

test('Testing a good input to the server', async () => {
    const goodInp = serverFilter.filter('hello world')
    expect(goodInp).toBe(false)
})

test('Testing a bad input as first char', async () => {
    const badInp = serverFilter.filter('<hello world')
    expect(badInp).toBe(true)
})

test('Testing a bad input as last char', async () => {
    const badInp = serverFilter.filter('hello world>')
    expect(badInp).toBe(true)
})