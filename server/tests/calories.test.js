const calories = require('../components/calories')

test('Testing a low intensity calorie burn', async () => {
    const lowIntensity = calories.caloriesCalc('low', 20, 75)
    expect(lowIntensity).toBe(78.75)
})

test('Testing a medium intensity calorie burn', async () => {
    const lowIntensity = calories.caloriesCalc('med', 20, 75)
    expect(lowIntensity).toBe(157.5)
})

test('Testing a high intensity calorie burn', async () => {
    const lowIntensity = calories.caloriesCalc('high', 20, 75)
    expect(lowIntensity).toBe(223.125)
})

test('Testing when no weight is given as input', async () => {
    const lowIntensity = calories.caloriesCalc('low', 20, null)
    expect(lowIntensity).toBe(65.1)
})