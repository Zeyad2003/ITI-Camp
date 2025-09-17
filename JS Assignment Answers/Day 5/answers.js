// 1. Predict (in comments) the output order of this code, then run to verify.
console.log(a());
var b = function(){ return 'B'; };
function a() { return 'A'; }
console.log(b());
// After verifying, explain (one short line) why a works before definition and b does not.

// Answer:
// A
// B
// Function a is hoisted, so we could see the output before its definition.


// 2. Rewrite a function declaration sum(a,b) into a function expression stored in a variable named add and confirm both produce same result for (3,4).
const add = function(a, b) {
    return a + b;
};
console.log(add(3, 4)); // 7


// 3. Create a named function expression assigned to var factorial. Use the internal name ONLY for recursion. Log factorial(5). Show (comment) that the internal name is not global.
var factorial = function fact(n) {
    if (n <= 1) return 1;
    return n * fact(n - 1);
};
console.log(factorial(5)); // Output: 120
// Internal name `fact` is not global.


// 4. Write a function showInfo that logs arguments.length and each argument. Call it with 0, then 2, then 5 arguments.
function showInfo() {
    console.log(arguments.length);
    for (let i = 0; i < arguments.length; i++) {
        console.log(arguments[i]);
    }
}
showInfo();
showInfo(1, 2);
showInfo(1, 2, 3, 4, 5);


// 5. Write a function mutate(x,y) that changes x and y inside and shows arguments[0] / arguments[1] before and after. Explain result in a comment.
function mutate(x, y) {
    console.log('Before:', arguments[0], arguments[1]);
    arguments[0] = 10;
    arguments[1] = 20;
    console.log('After:', arguments[0], arguments[1]);
}
mutate(1, 2);
// Explanation: Arguments are passed by value for primitives, so changes inside do not affect the original variables.


// 6. Implement sumAll() using only the arguments object (no arrays) to total all numeric arguments. Test sumAll(2,5,3) and sumAll().
function sumAll() {
    let total = 0;
    for (let i = 0; i < arguments.length; i++) {
        total += arguments[i];
    }
    return total;
}
console.log(sumAll(2, 5, 3)); // Output: 10
console.log(sumAll()); // Output: 0


// 7.  Implement sumAll() using only the arguments object but with the Array method reduce.
function sumAll() {
    return Array.prototype.reduce.call(arguments, (acc, curr) => acc + curr, 0);
}
console.log(sumAll(2, 5, 3)); // Output: 10
console.log(sumAll()); // Output: 0


// 8. Write describeValue that returns different strings based on number of args: 0 -> 'none', 1 -> 'one:'+val, 2 -> 'two:'+a+','+b else 'too many'.
function describeValue() {
    if (arguments.length === 0) return 'none';
    if (arguments.length === 1) return `one:${arguments[0]}`;
    if (arguments.length === 2) return `two:${arguments[0]},${arguments[1]}`;
    return 'too many';
}
console.log(describeValue()); // Output: 'none'
console.log(describeValue(5)); // Output: 'one:5'
console.log(describeValue(5, 10)); // Output: 'two:5,10'
console.log(describeValue(1, 2, 3)); // Output: 'too many'


// 9. Create an array funcs of three small anonymous functions that transform a number. Apply them in order to start = 10 (loop). Log final result.
const funcs = [
    (n) => n + 1,
    (n) => n * 2,
    (n) => n - 3
];
let start = 10;
for (let func of funcs) {
    start = func(start);
}
console.log(start); // Output: 19 (((10 + 1) * 2) - 3)


// 10. Write makeMultiplier(factor) returning a function(n) that multiplies. Create double and triple; test with 7.
function makeMultiplier(factor) {
    return function(n) {
        return n * factor;
    };
}
const double = makeMultiplier(2);
const triple = makeMultiplier(3);
console.log(double(7)); // Output: 14
console.log(triple(7)); // Output: 21


// 11. Implement once(fn) runs fn only first time, returns its return value. Test with a function that logs and returns a string.
function once(fn) {
    let done = false;
    let result;
    return function(...args) {
        if (!done) {
            done = true;
            result = fn(...args);
            return result;
        }
    };
}
const greetOnce = once((name) => `Hello, ${name}!`);
console.log(greetOnce("Alice")); // Output: Hello, Alice!
console.log(greetOnce("Bob")); // Output: Hello, Alice!


// 12. (Bonus) Modify once so subsequent calls return the FIRST result (like a memo of zero-arg function). Keep original version comment above for comparison.
function once(fn) {
    let done = false;
    let result;
    return function(...args) {
        if (!done) {
            done = true;
            result = fn(...args);
        }
        return result;
    };
}
console.log(greetOnce("Alice")); // Output: Hello, Alice!
console.log(greetOnce("Bob")); // Output: Hello, Alice!


// 13. (Bonus) Implement makeCounter(start) that returns { inc: fn, dec: fn, value: fn }. State stays private. Demonstrate two independent counters.
function makeCounter(start) {
    let count = start;
    return {
        inc: () => ++count,
        dec: () => --count,
        value: () => count,
    };
}
const counter1 = makeCounter(10);
const counter2 = makeCounter(20);
console.log(counter1.inc()); // Output: 11
console.log(counter1.value()); // Output: 11
console.log(counter2.dec()); // Output: 19
console.log(counter2.value()); // Output: 19


// 14. makeAdder(start) returns a function that adds its argument to internal total and returns current total each call. Demonstrate separate instances.
function makeAdder(start) {
    let total = start;
    return function(add) {
        total += add;
        return total;
    };
}
const adder1 = makeAdder(5);
const adder2 = makeAdder(10);
console.log(adder1(3)); // Output: 8
console.log(adder1(2)); // Output: 10
console.log(adder2(4)); // Output: 14
console.log(adder2(1)); // Output: 15


// 15. Implement memoize1(fn). Show it caches slowSquare(9) twice (timing optional comment).
function memoize1(fn) {
    let cache = {};
    return function(arg) {
        if (cache[arg] !== undefined) {
            return cache[arg];
        }
        const result = fn(arg);
        cache[arg] = result;
        return result;
    };
}
const slowSquare = (n) => n * n;
const memoizedSquare = memoize1(slowSquare);
console.log(memoizedSquare(9)); // Output: 81
console.log(memoizedSquare(9)); // Output: 81 (cached)


// 16. (Bonus) Implement memoizeN(fn) that supports any number of primitive args by joining them with '|' as a key. Show with add3(a,b,c).
function memoizeN(fn) {
    let cache = {};
    return function(...args) {
        const key = args.join('|');
        if (cache[key] !== undefined) {
            return cache[key];
        }
        const result = fn(...args);
        cache[key] = result;
        return result;
    };
}
const add3 = (a, b, c) => a + b + c;
const memoizedAdd3 = memoizeN(add3);
console.log(memoizedAdd3(1, 2, 3)); // Output: 6
console.log(memoizedAdd3(1, 2, 3)); // Output: 6 (cached)


// 17. Make object user with name and method sayHi logging 'Hi NAME'. Call sayHi, then assign var f = user.sayHi; call f(). Explain (comment) output difference.
const user = {
    name: "Alice",
    sayHi() {
        console.log(`Hi ${this.name}`);
    },
};
user.sayHi(); // Output: Hi Alice
const f = user.sayHi;
f(); // Output: Hi undefined (this is lost when function is assigned to a variable)


// 18. Re-use sayHi but call it with another object { name: 'Sara' } using two different ways.
user.sayHi.call({ name: "Sara" }); // Output: Hi Sara
user.sayHi.apply({ name: "Zeyad" }); // Output: Hi Zeyad


// 19. Create greeter.greet(greeting,sign). Use apply to invoke it on { name: 'Ali' } with 'Hello','!'.
const greeter = {
    greet(greeting, sign) {
        console.log(`${greeting} ${this.name}${sign}`);
    },
};
greeter.greet.apply({ name: "Ali" }, ["Hello", "!"]); // Output: Hello Ali!


// 20. Bind greet to { name:'Lara' } as greetLara (no preset greeting). Call with different greetings.
const greetLara = greeter.greet.bind({ name: "Lara" });
greetLara("Hi", "*"); // Output: Hi Lara*
greetLara("Hello", "!!"); // Output: Hello Lara!!


// 21. Bind greet to produce a sayHello(obj) that always uses greeting 'Hello' but variable sign(!,*,!!,<#).
function sayHello(obj) {
    return greeter.greet.bind(obj, "Hello");
}
const sayHelloAli = sayHello({ name: "Ali" });
sayHelloAli("!"); // Output: Hello Ali!
sayHelloAli("!!"); // Output: Hello Ali!!
sayHelloAli("<#"); // Output: Hello Ali<#

// 22. Use slice inside a function to convert its arguments(remember it is an array like) to a real array and log reversed copy without mutating original.
function logReversed() {
    const arr = Array.prototype.slice.call(arguments);
    console.log(arr.slice().reverse());
}
logReversed(1, 2, 3); // Output: [3,2,1]

// 23. Given arr = [5,2,11,7] find max WITHOUT loop using max(). Then show an alternative with a loop.
const arr2 = [5, 2, 11, 7];
console.log(Math.max.apply(null, arr2)); // Output: 11
let max2 = arr2[0];
for (let i = 1; i < arr2.length; i++) {
    if (arr2[i] > max2) max2 = arr2[i];
}
console.log(max2); // Output: 11

// 24. Demonstrate calling Math.max with individual numbers using call and explain why apply is better.
console.log(Math.max.call(null, 1, 5, 9)); // Output: 9
// Apply is better for arrays: Math.max.apply(null, [1,5,9])

// 25. Convert string concatenation 'User: '+name+' Age: '+(age+1) into a template literal equivalent.
const name = "Omar", age = 27;
console.log(`User: ${name} Age: ${age + 1}`);

// 26. Create a multi-line template with variables title and body and log it; show classical \n build version for contrast.
const title = "Hello", body = "This is body";
console.log(`${title}\n${body}`); // Template literal
console.log(title + "\n" + body); // Classical

// 27. Write a block with var i and let j inside if(true) and log both inside and outside. Comment which leaks.
if (true) {
    var i = 1;
    let j = 2;
    console.log(i, j); // 1 2
}
console.log(i); // 1 (var leaks)
// console.log(j); // ReferenceError: j is not defined (let does not leak)

// 28. Write code that tries to log x before let x = 5;.
// console.log(x); // ReferenceError: Cannot access 'x' before initialization
let x = 5;

// 29. Show that pushing to a const array works but reassigning it does not (comment error you would get if attempted—do not actually break execution).
const arr3 = [1, 2];
arr3.push(3); // Works
// arr3 = [4,5]; // TypeError: Assignment to constant variable.

// 30. Rewrite a normal function square(n) { return n*n; } as arrow in three forms: full body, concise, inline in map over [1,2,3].
const square1 = (n) => { return n * n; };
const square2 = n => n * n;
console.log([1,2,3].map(n => n * n)); // [1,4,9]

// 31. Create object timer with count:0 and method startClassic using setInterval(function(){...}) and startArrow using setInterval(()=>{...}). Show difference in how this works (stop after a few increments using clearInterval).
const timer = {
    count: 0,
    startClassic() {
        const self = this;
        this.count = 0;
        let id = setInterval(function() {
            self.count++;
            console.log('Classic:', self.count);
            if (self.count >= 3) clearInterval(id);
        }, 1000);
    },
    startArrow() {
        this.count = 0;
        let id = setInterval(() => {
            this.count++;
            console.log('Arrow:', this.count);
            if (this.count >= 3) clearInterval(id);
        }, 1000);
    }
};
timer.startClassic();
timer.startArrow();
// Classic needs 'self = this' to keep context; arrow keeps 'this' automatically.

// 32. Write an arrow function that returns an object {v:10}. Show the need for parentheses.
const getObj = () => ({ v: 10 });
console.log(getObj()); // {v:10}
// Without parentheses, JS thinks { } is a block, not an object.

// 33. Give one example where arrow is a bad choice (e.g., method needing dynamic this).
const badArrow = {
    val: 5,
    getVal: () => this.val // 'this' is not the object, but the outer scope
};
// console.log(badArrow.getVal()); // undefined
// Use regular function for methods needing 'this'.

// 34. Start with function greet(name){ return 'Hi '+name+'!'; } Convert to arrow function using Const not let ya habeby :).
const greet = name => `Hi ${name}!`;
console.log(greet('Omar'));

// 35. Build pipeline functions: add2, times3, minus1 (all arrows). Write runPipeline(n, fnsArray) that loops through and applies each. Test runPipeline(5, [add2,times3,minus1]).
const add2 = n => n + 2;
const times3 = n => n * 3;
const minus1 = n => n - 1;
function runPipeline(n, fnsArray) {
    for (let fn of fnsArray) n = fn(n);
    return n;
}
console.log(runPipeline(5, [add2, times3, minus1])); // ((5+2)*3)-1 = 20

// 36. (write answers BEFORE running):
var obj = { n: 1, inc: function(){ this.n++; return this.n; } };
var inc = obj.inc;
console.log(obj.inc()); // 2 (this is obj)
console.log(inc()); // NaN or error (this is global or undefined)
// Explain both lines.
// First line increments obj.n. 
// Second line loses 'this', so 'n' is not found on global.

// 37. Create many counters in a loop (e.g. 1000) and store them in an array. Comment on potential memory considerations of large closure arrays.
const counters = [];
for (let i = 0; i < 1000; i++) {
    let count = 0;
    counters.push(() => ++count);
}
// Each counter closes over its own count. Large arrays of closures can use significant memory.

// 38. Write safeFirst() that returns undefined if called with zero args else return array of the args.
function safeFirst() {
    if (arguments.length === 0) return undefined;
    return Array.prototype.slice.call(arguments);
}
console.log(safeFirst()); // undefined
console.log(safeFirst(1, 2, 3)); // [1,2,3]

// 39. factory(namesArray) returns object with a counter function for each name (all independent). Example: var counters = factory(['a','b']); counters.a(); counters.b();
function factory(namesArray) {
    const obj = {};
    namesArray.forEach(name => {
        let count = 0;
        obj[name] = () => ++count;
    });
    return obj;
}
const myCounters = factory(['a', 'b']);
console.log(myCounters.a()); // 1
console.log(myCounters.a()); // 2
console.log(myCounters.b()); // 1

// 40. Write 2 things that were new or tricky today (comment).
// JS has been always tricky for me :)