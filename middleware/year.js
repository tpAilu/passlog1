function getYear() {
    let newYear = new Date();
    let year = newYear.getFullYear();

    return year;
}

module.exports = getYear;