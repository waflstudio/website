module.exports = (arr, value) => {
    if (!Array.isArray(arr)) {
        return arr;
    }

    return arr.filter((item) => item !== value);
};
