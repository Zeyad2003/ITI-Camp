"use strict";

// 1- Write a function that greets a user, using a default parameter for the name.
function greet(name = "Guest") {
  return `Hello, ${name}!`;
}

// 2- Write a function that calculates the total price with a default tax rate parameter.
function calc(price, taxRate = 0.1) {
  return +(price * (1 + taxRate)).toFixed(2);
}

// 3- Write a function that creates a user object, using a default role parameter.
function createUser(name, role = "user") {
  return { name, role };
}

// 4- Write a function that multiplies any number of arguments using the rest operator.
function multiplyAll(...nums) {
  return nums.reduce((acc, n) => acc * n, 1);
}

// 5- Write a function that multiplies the first argument by the sum of all the rest using the rest operator.
function mulFirstBySum(first, ...rest) {
  const sum = rest.reduce((acc, n) => acc + n, 0);
  return first * sum;
}

// 6- Write a function that takes a variable number of strings and returns them as a single array using the rest operator.
function strToArr(...strings) {
  return strings;
}

// 7- Create a new array by combining two arrays using the spread operator.
function combineArrays(arr1, arr2) {
  return [...arr1, ...arr2];
}

// 8- Copy an array using the spread operator.
function copyArray(arr) {
  return [...arr];
}

// 9- Merge two objects into one using the spread operator.
function mergeObjects(obj1, obj2) {
  return { ...obj1, ...obj2 };
}

// 10- Update a property in an object using the spread operator to create a new object.
function updateProperty(obj, key, value) {
  return { ...obj, [key]: value };
}

// 11- Destructure an array to get the first and second elements into variables.
function firstSecond(arr) {
  const [first, second] = arr;
  return { first, second };
}

// 12- Destructure an array to get the first element and the rest into another array.
function firstAndRest(arr) {
  const [first, ...rest] = arr;
  return { first, rest };
}

// 13- Destructure an object to extract two properties into variables.
function extractTwo(obj) {
  const { a, b } = obj;
  return { a, b };
}

// 14- Destructure an object and rename the extracted properties.
function extractAndRename(obj) {
  const { a: first, b: second } = obj;
  return { first, second };
}

// 15- Write a function that takes an object as a parameter and uses destructuring in the parameter list to extract specific properties.
function pickNameAge({ name, age }) {
  return { name, age };
}

// Test Functions
console.log("1- greet:", greet(), greet("Zeyad"));
console.log("2- calc:", calc(100), calc(100, 0.2));
console.log("3- createUser:", createUser("Alice"), createUser("Bob", "admin"));
console.log("4- multiplyAll:", multiplyAll(2, 3, 4), multiplyAll());
console.log("5- mulFirstBySum:", mulFirstBySum(2, 3, 5), mulFirstBySum(5));
console.log("6- strToArr:", strToArr("a", "b", "c"));
console.log("7- combineArrays:", combineArrays([1, 2], [3, 4]));
console.log("8- copyArray:", copyArray([1, 2]));
console.log("9- mergeObjects:", mergeObjects({ a: 1 }, { b: 2 }), mergeObjects({ a: 1 }, { a: 2 }));
console.log("10- updateProperty:", updateProperty({ a: 1 }, "a", 2));
console.log("11- firstSecond:", firstSecond([10, 20, 30]));
console.log("12- firstAndRest:", firstAndRest([10, 20, 30]));
console.log("13- extractTwo:", extractTwo({ a: 1, b: 2, c: 3 }));
console.log("14- extractAndRename:", extractAndRename({ a: 1, b: 2 }));
console.log("15- pickNameAge:", pickNameAge({ name: "Ali", age: 30, city: "Cairo" }));
