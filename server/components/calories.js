/**
 * Calculates the amount of calories burned using the users inputs using metabolic rates.
 *
 * @param {string} intensity a string representing the intensity of the workout.
 * @param {number} time taken in minutes for the exercise.
 * @param {number} weight a number of the users weight in kg.
 * @return {number} The amount of calories burned in the exercise.
 */
function caloriesCalc (intensity, time, weight) {
	console.log(weight);
	console.log(time);
	const metabolicEquivalent = 3.5; // One metabolic equivalent is 3.5ml of oxygen per kg of weight
	if (weight === null) { // user may not wish to share this information
		weight = 62; // average global weight 62kg
	}
	let activeMET;
	if (intensity === 'low') {
		activeMET = 3;
	} else if (intensity === 'med') {
		activeMET = 6;
	} else {
		activeMET = 8.5;
	}
	const caloriesmin = (activeMET * metabolicEquivalent * weight) / 200;
	const totalCalories = caloriesmin * time;
	return totalCalories;
}

module.exports.caloriesCalc = caloriesCalc;
