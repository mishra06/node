/******************************************************************
 * *******************************************************************
 * Finds the missing number in an array of Consecutive numbers.
 * 
 * @param {number[]} arr - An array of consecutive numbers with one missing number.
 * @returns {number} - The missing number in the array.
 **********************************************************************
 ***********************************************************************/

function findMissingNumber(arr) {
    const n = arr.length + 1;
    const sumOfFirstN = (n * (n + 1)) / 2;

    let sumOfArray = 0;
    for (let i = 0; i < n - 1; i++) {
        sumOfArray = sumOfArray + arr[i];
    }

    let missingNumber = sumOfFirstN - sumOfArray;

    return missingNumber;
}
// console.log(findMissingNumber([1,2,3,4,6]));

module.exports = {
    findMissingNumber
}