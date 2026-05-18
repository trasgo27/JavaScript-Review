//Create an Array of Numbers
const numbers = [2,5,15,9];
//Use reduce to calculate the total number
const totalAddition = numbers.reduce((acumulador, currentValue)=>{return acumulador + currentValue},0);
//Show the results
console.log("The total addition is:", totalAddition);