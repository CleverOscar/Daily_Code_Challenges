// Given a list of numbers and a number k,
// return whether any two numbers from the list add up to k.
// For example, given [10, 15, 3, 7] and k of 17, return true since 10 + 7 is 17.

const numbers = [10, 15, 3, 7, 4, 6]

// pass in the array data and k (target)
function findSum(array, target) {
  // store two numbers from array to add up 
  for (let i = 0; i < array.length; i++){
    num1 = array[i]
    for (let j = 0; j < array.length;j++) {
      num2 = array[j + 1]

      while(num1 + num2 === target){
        return true
      } 
    }
    return false
  }
  // iterate through the array to find sum 
  // if both numbers exist return true
}


console.log(findSum(numbers, 19))
