/**
 * Function will rank and sort an array of JSON documents which are the posts made by users to give each user a tailored
 * feed. It takes input of all the posts and then using another input the current users favourite sport ranks posts
 * higher if they match this favourite sport and if they are faster than the other posts.
 *
 * @param {JSON} posts array of all the posts from the database
 * @param {string} favouriteSport the users personal favourite sport to help rank posts
 * @return {JSON} sorted array of all the post documents.
 */
const speed = require('./speed');

function ranking (posts, favouriteSport) {
	console.log(favouriteSport);
	const sortedPosts = posts.sort(
		function (a, b) {
			if (a.speedmph === undefined) { // set speed if it doesn't have one
				a.speedmph = speed.speedCalc(a.distance, a.time).mph;
			}
			if (b.speedmph === undefined) { // set speed if it doesn't have one
				b.speedmph = speed.speedCalc(b.distance, b.time).mph;
			}
			if (a.sport === favouriteSport && b.sport === favouriteSport) {
				return b.speedmph - a.speedmph;
			} else if (a.sport === favouriteSport) {
				return -1;
			} else if (b.sport === favouriteSport) {
				return 1;
			} else return b.speedmph - a.speedmph;
		}
	);
	return sortedPosts;
}

module.exports.ranking = ranking;
