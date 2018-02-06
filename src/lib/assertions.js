export function assert(value, errorMessage) {
    if (!value) {
        errorMessage = errorMessage || 'Assertion failed';
        if (typeof Error !== 'undefined'){
            window.alert(errorMessage);
            throw new Error(errorMessage);
        }
        throw errorMessage;
    }
}

export function isNear(a, b, tolerance=0.0001) {
    return Math.abs(a - b) < tolerance;
}

export function isNumber(value) {
    return !(isNaN(value) || value === undefined || value === null);
}
