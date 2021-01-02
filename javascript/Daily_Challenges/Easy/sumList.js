// This question was asked by Google 

// Given a list of numbers and a number k, return whether any two numbers from the list add up to k.

// For example, given [10, 15, 3, 7] and k of 17, return true since 10 + 7 is 17.

const arrayList = [10, 15, 3, 7, 8, 2, 1, 9, 18];

function sumUpTotal(array, total) {
    let result = [];

    array.forEach((value, index) => {
        let diff = total - value;
        if(array.includes(diff, index + 1)) result.push([value, diff])
    }); 
    
    return result;
}

console.log(sumUpTotal(arrayList, 45));
console.log(sumUpTotal(arrayList, 4));
console.log(sumUpTotal(arrayList, 10));
console.log(sumUpTotal(arrayList, 20));
