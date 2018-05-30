export function standardCallback(error, result) {
    if (process.env.NODE_ENV === 'development') {
        if (null !== result)
            console.log(result);
        else if (null !== error) {
            console.log("Here's some debug information:");
            console.log(wrap(error));
        }
    }
}
function wrap(error) {
    if (null == error)
        return "";
    let errorMessage = error.errorMessage;
    for (let a in error.errorDetails)
        for (let n in error.errorDetails[a])
            errorMessage += `\n${a}: ${error.errorDetails[a][n]}`;
    return errorMessage;
}
