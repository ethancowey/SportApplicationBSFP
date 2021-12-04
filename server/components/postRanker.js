const speed = require('./speed')

function ranking(posts, favouriteSport){
    console.log(favouriteSport);
    const sortedPosts = posts.sort(
        function(a, b){
            if(a.speedmph === undefined){
                a.speedmph = speed.speedCalc(a.distance, a.time).mph
            }
            if(b.speedmph === undefined){
                b.speedmph = speed.speedCalc(b.distance, b.time).mph
            }
            if (a.sport === favouriteSport && b.sport === favouriteSport) {
                return b.speedmph - a.speedmph
            }else if(a.sport === favouriteSport){
                return -1
            } else if(b.sport === favouriteSport) {
                return 1
            } else return b.speedmph - a.speedmph
        }
    )
    return sortedPosts
}

module.exports.ranking = ranking