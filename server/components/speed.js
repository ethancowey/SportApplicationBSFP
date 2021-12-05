/**
 * Returns the speed the user travelled in 2 formats calculated using the users inputs. Doing 2 speed calculations one
 * for kph kilometers per hour and mph miles per hour
 *
 * @param {number} distance covered doing the exercise
 * @param {number} time the time taken to complete the exercise
 * @return {{kph: number, mph: number}} Returns speed in 2 different formats as different users prefer one from another
 */
function speedCalc(distance, time){
    // distance is inputed as km and time in minutes
    const timeHours = time/60;
    const speedKmph = distance/timeHours;
    const speedMph = speedKmph/1.6;
    return {kph: speedKmph, mph: speedMph}
}

module.exports.speedCalc = speedCalc