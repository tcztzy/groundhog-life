export function abbreviateNumber(value, digits=2) {
    let isNegative = false;
    if (value < 0) {
        isNegative = true;
        value *= -1;
    }
    if (value === null)
        return null;
    if (value === 0) return "0";
    digits = !digits || digits < 0 ? 0 : digits;
    let number = value.toPrecision(2).split("e");
    let exponentIndex = 1 === number.length ? 0 : Math.floor(Math.min(parseInt(number[1].slice(1)), 74) / 3);
    let i = exponentIndex < 1 ? value.toFixed(digits) : (value / Math.pow(10, 3 * exponentIndex)).toFixed(1 + digits);
    let abbreviatedValue = i < 0 ? i : Math.abs(parseFloat(i));
    let integer = Math.floor(abbreviatedValue);
    let fraction = "." + (abbreviatedValue - integer).toString().slice(2, 2 + (1 + digits - integer.toString().length));
    fraction = fraction.length <= 1 ? "" : fraction;
    return (isNegative ? "-" : "") + integer + fraction + [
        "",
        "K",
        "M",
        "B",
        "t",
        "Q",
        "s",
        "S",
        "o",
        "n",
        "d",
        "U",
        "D",
        "T",
        "Qt",
        "Qd",
        "Sd",
        "St",
        "O",
        "N",
        "v",
        "c",
        "dv",
        "tv",
        "qv",
        "Qv"
    ][exponentIndex];
}

export function formatMinutes(unformattedMinutes) {
    let hours = Math.floor(unformattedMinutes / 60);
    let minutes = Math.floor(unformattedMinutes - 60 * hours);
    return hours + "h" + (minutes < 10 ? "0" : "") + minutes + "m";
}

export function formatDays(unformattedDays, abbr = false) {
    let years = Math.floor(unformattedDays / 365);
    let days = Math.floor(unformattedDays - 365 * years);
    return years + (abbr ? "y" : " years ") + days + (abbr ? "d" : " days");
}
