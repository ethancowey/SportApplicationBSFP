function ranking(posts, favouriteSport){
    console.log(favouriteSport);
    const sortedPosts = posts.sort(
        function(a, b){
            if (a.sport === favouriteSport && b.sport === favouriteSport) {
                return a.time - b.time
            }else if(a.sport === favouriteSport){
                return -1
            } else if(b.sport === favouriteSport) {
                return 1
            } else return a.time - b.time
        }
    )
    return sortedPosts
}

module.exports.ranking = ranking