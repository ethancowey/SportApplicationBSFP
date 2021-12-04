function ranking(posts, favouriteSport){
    console.log(favouriteSport);
    const sortedPosts = posts.sort(
        function(a, b){
            return a.time - b.time
        }
    )
    return sortedPosts
}

module.exports.ranking = ranking