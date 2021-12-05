const speed = require('../components/speed')

test('Testing a slower speed equation', async () => {
    const slowSpeed = speed.speedCalc(1, 60)
    expect(slowSpeed.kph).toBe(1)
    expect(slowSpeed.mph).toBe(0.625)
})

test('Testing a faster speed equation', async () => {
    const fastSpeed = speed.speedCalc(99, 10)
    expect(fastSpeed.kph).toBe(594)
    expect(fastSpeed.mph).toBe(371.25)
})