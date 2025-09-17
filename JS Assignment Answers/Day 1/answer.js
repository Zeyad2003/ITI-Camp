
/*
JavaScript Assignment – Lecture 1
Answers with brief explanations and runnable examples.

Note: Interactive parts (prompt/alert) are wrapped in functions and NOT executed by default
so this file can run in Node.js without errors. You can run those functions in a browser console.
*/

console.log("===== Part 1: Variables and Scope =====\n");

// 1. Explain how var works in JavaScript. What is variable hoisting? Give a code example.

// - var declares function-scoped or globally-scoped variables
// - Declarations are hoisted (moved to the top of their scope) but initializations aren't.
console.log("1 - var & hoisting");
console.log(fooVar); // undefined (declaration hoisted, value not assigned)
var fooVar = 42;
console.log(fooVar); // 42
console.log("");



// 2. What is the scope of a variable declared with var inside a function? What about inside a block (e.g., an if statement)?
// - Inside a function: var is scoped to the entire function.
// - Inside a block: var is not block-scoped so it will leak out of the block and be visible anywhere inside the function.
console.log("2 - var scope");
function scopeExample() {
	if (true) {
		var x = "I leak out of the block";
	}
	return x; // also accessible 
}
console.log(scopeExample());
console.log("");


// 3. List all JavaScript primitive types in ES5. Give an example of each.
// Answer: undefined, null, boolean, number, string
console.log("3 - ES5 primitive types");
var undefType = undefined; // typeof => 'undefined'
var nullType = null; // typeof => 'object'
var boolType = true; // typeof => 'boolean'
var numType= 123; // typeof => 'number'
var strType= "hello"; // typeof => 'string'
console.log(typeof undefType, typeof nullType, typeof boolType, typeof numType, typeof strType);
console.log("");



// 4. What is the difference between a primitive type and an object type? Give an example where this difference is important.
// - Primitives are immutable and compared by value.
// - Objects are mutable and compared by reference.
console.log("4 - Primitive vs Object");
var s1 = "hi";
var s2 = "hi";
console.log("s1===s2:", s1 === s2); // true (same value)
var o1 = { v: "hi" };
var o2 = { v: "hi" };
console.log("o1===o2:", o1 === o2); // false (different references)
console.log("");



// 5. Create a number, string, and boolean using both literal and constructor syntax. Show the difference in their types using typeof.
console.log("5 - Literals vs Constructors and typeof");
var numberLiteral = 7;
var numberObject = new Number(7);
var stringLiteral = "abc";
var stringObject = new String("abc");
var booleanLiteral = true;
var booleanObject = new Boolean(true);
console.log(typeof numberLiteral, typeof numberObject, typeof stringLiteral, typeof stringObject, typeof booleanLiteral, typeof booleanObject);
console.log("");



// 6. Why is it generally recommended to use literals instead of constructors for primitive types?
// - Constructors create wrapper objects which can be less efficient, and can be confusing (less readable)
// - Example: new Boolean(false) create always a new value while using literal can get you a cached value directly.
console.log("6 - Prefer literals over constructors");
if (new Boolean(false)) {
	console.log("new Boolean(false) is true (object) — surprising!");
}
console.log("");



// 7. Given the following code, what will be the output? Explain why.
//    var x = 123.4567;
//    console.log(x.toFixed(2));
//    console.log(x.toPrecision(4));
//
// toFixed(2) -> 2 digits after the decimal point (rounds up if needed).
// toPrecision(4) -> 4 total significant digits (rounds the last one if needed).
console.log("7 - toFixed vs toPrecision");
var x = 123.4567;
console.log(x.toFixed(2)); // "123.46"
console.log(x.toPrecision(6)); // "123.5"
console.log("");



// 8. What is NaN? How can you check if a value is NaN? Give an example.
// - NaN means Not-a-Number; typeof NaN is 'number'. It is not equal to itself.
// - Check with isNaN (function), OR x !== x (trick).
console.log("8 - NaN checks");
var bad = Number("1a");
console.log("isNaN(bad):", isNaN(bad)); // true
console.log("bad!==bad:", bad !== bad); // true
console.log("");



// 9. What is the difference between parseInt, parseFloat, and Number? Give an example for each.
console.log("9 - parseInt/parseFloat/Number");
console.log(parseInt("10.5px", 10)); // 10 (stops at non-digit)
console.log(parseFloat("10.5px")); // 10.5 (parses decimal)
console.log(Number("10.5px")); // NaN (strict conversion)
console.log("");



// 10. What is the difference between implicit and explicit type casting? Give an example of each.
console.log("10 - Type casting");
// Implicit: operators force types
console.log("" + 5); // "5" (string concatenation)
console.log("10" - 2); // 8 (numeric subtraction)
// Explicit: use constructors/functions
console.log(Number("42"), String(42), Boolean(0)); // 42, "42", false
console.log("");



// 11. What will be the result and type of the following expressions? Explain your answer.
// 	- true + 5
// 	- "10" - 2
// 	- 12 - "1a"
// 	- 5 / 0
// 	- 5 + undefined
console.log("11) Expressions and types");
var r1 = true + 5; // 1 + 5 => 6 (implicit casting)
var r2 = "10" - 2; // 10 - 2 => 8 (implicit casting)
var r3 = 12 - "1a"; // NaN (can't parse "1a")
var r4 = 5 / 0; // Infinity (dividing by zero gives infinity)
var r5 = 5 + undefined; // NaN (can't add "undefined" to a number)
console.log(r1, typeof r1);
console.log(r2, typeof r2);
console.log(r3, typeof r3);
console.log(r4, typeof r4);
console.log(r5, typeof r5);
console.log("");



// 12. What will be logged to the console in the following code? Explain each step.
// 	var a = "15.5";
// 	var b = +a;
// 	console.log(b, typeof b);
console.log("12 - Unary plus");
var a = "15.5";
var b = +a; // get the numeric value of string "15.5"
console.log(b, typeof b); // 15.5 'number'
console.log("");



// 13. What will be the output of:
// 	var result = 20 > true < 5 == 1;
// 	console.log(result);
// 	Explain why.
console.log("13 - Chained comparisons");
var result = 20 > true < 5 == 1; // ((20 > 1) < 5) == 1 => (true < 5) == 1 => (1 < 5) == 1 => true == 1 => true
console.log(result); // true
console.log("");



// 14. Write a function that takes a string and returns true if it can be converted to a valid number, and false otherwise.
console.log("14 - isNumeric function");
function isNumeric(str) {
	if (typeof str !== "string") return false; // per spec, only checking strings
	var num = Number(str);
	return !isNaN(num);
}
console.log(isNumeric("123"), isNumeric("  -12.5  "), isNumeric("1e3"), isNumeric("abc"));
console.log("");



// 15) Print 1..20 using a while loop
console.log("15 - while loop 1..20");
function printOneToTwenty() {
	var i = 1;
	var out = [];
	while (i <= 20) {
		out.push(i);
		i++;
	}
	console.log(out.join(", "));
}
printOneToTwenty();
console.log("");



// 16. Write a program that asks the user to enter numbers until they enter 0, using a do...while loop. After the loop ends, print the sum of all entered numbers (excluding 0).
// Use this method within the browser to test it
function sumUntilZeroBrowser() {
	var sum = 0;
	var input;
	do {
		input = prompt("Enter a number (0 to finish):", "0");
		if (input === null) break; // user cancelled
		var n = Number(input);
		if (!isNaN(n)) {
			sum += n;
		}
	} while (input !== "0");
	alert("Sum = " + (sum)); // excluding the final 0 has no effect on sum
}



// 17. Write a program that takes a number from 1 to 7 and prints the corresponding day of the week using a switch statement. Use a for loop to test your program with all numbers from 1 to 7.
console.log("17 - switch: day of week 1..7");
function dayOfWeek(n) {
	switch (n) {
		case 1: return "Sunday";
		case 2: return "Monday";
		case 3: return "Tuesday";
		case 4: return "Wednesday";
		case 5: return "Thursday";
		case 6: return "Friday";
		case 7: return "Saturday";
		default: return "Invalid";
	}
}
for (var d = 1; d <= 7; d++) {
	console.log(d + ": " + dayOfWeek(d));
}
console.log("");

console.log("===== End of answers =====\n");

