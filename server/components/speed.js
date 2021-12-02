function speedCalc(distance, time){
    // distance is inputed as km and time in minutes
    const timeHours = time/60;
    const speedKmph = distance/timeHours;
    const speedMph = speedKmph/1.6;
    return {kph: speedKmph, mph: speedMph}
}

module.exports.speedCalc = speedCalc