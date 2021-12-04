function filter(input){
    const badChars = ['<', '>', '&', '*', '{', '}', '$'];
    const splitInput = input.split('')
    for(let i=0; i < splitInput.length; i++){
        for(let y=0; y < badChars.length; y++){
            if (splitInput[i] === badChars[y]){
                return true
            }
        }
    }
    return false
}

module.exports.filter = filter