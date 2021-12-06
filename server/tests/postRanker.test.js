const ranker = require('../components/postRanker')

test('Testing ranking of 2 posts both are favourite sport', async () => {
    const twoPosts = ranker.ranking([{sport: 'running', speedmph:4},{sport: 'running', speedmph:5}],'running')
    expect(twoPosts).toStrictEqual([{sport: 'running', speedmph:5},{sport: 'running', speedmph:4}])
})
test('Testing ranking of 2 posts fastest is favourite', async () => {
    const twoPost = ranker.ranking([{sport: 'running', speedmph:5},{sport: 'swimming', speedmph:4}],'running')
    expect(twoPost).toStrictEqual([{sport: 'running', speedmph:5},{sport: 'swimming', speedmph:4}])
})

test('Testing ranking of 2 posts slowest is favourite sport', async () => {
    const twoPosts = ranker.ranking([{sport: 'running', speedmph:5},{sport: 'swimming', speedmph:4}],'swimming')
    expect(twoPosts).toStrictEqual([{sport: 'swimming', speedmph:4}, {sport: 'running', speedmph:5}])
})

test('Testing ranking of 2 posts neither are favourite sport', async () => {
    const twoPosts = ranker.ranking([{sport: 'cycling', speedmph:3},{sport: 'swimming', speedmph:4}],'running')
    expect(twoPosts).toStrictEqual([{sport: 'swimming', speedmph:4}, {sport: 'cycling', speedmph:3}])
})