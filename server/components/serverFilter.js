/**
 * Iterates through the users input to the server to check for bad characters to prevent various attacks on the system.
 * Including prevention of NoSQL injection and cross site scripting by adding html to posts you make.
 *
 * @param {string} input the users input to the system to check
 * @return {boolean} True if the input has invalid characters. False if not
 */

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