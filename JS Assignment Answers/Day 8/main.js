const { greetUser } = require('./utils');

// 1. Create a module file called 'utils.js' that exports a function named 'greetUser' which takes a name parameter and returns "Hello, [name]!". Then import and use this function in another file.
console.log(greetUser('Gad-Alhaq'));

// 2. Write a Promise that resolves after 2 seconds with the message "Task completed!". Use .then() to log the result to the console.
const taskPromise = new Promise((resolve) => {
    setTimeout(() => {
        resolve('Task completed!');
    }, 2000);
});

// Example usage:
taskPromise.then(console.log);

// 3. Create an async function called 'waitAndGreet' that uses setTimeout with a Promise to wait 1 second, then returns "Welcome!".
async function waitAndGreet() {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return "Ya Welcome Ya Welcome!";
}

// Example usage:
waitAndGreet().then(console.log);

// 4. Write an async function that fetches user data from 'https://jsonplaceholder.typicode.com/users/1' and logs the user's name and email to the console.
async function fetchAndLogUser() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users/1');
    const user = await res.json();
    console.log(`User: ${user.name}, Email: ${user.email}`);
}
// Example usage:
fetchAndLogUser();

// 5. Create a function that fetches the first 3 posts from 'https://jsonplaceholder.typicode.com/posts' and returns only their titles as an array.
async function fetchFirst3PostTitles() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await res.json();
    return posts.slice(0, 3).map(post => post.title);
}
// Example usage:
fetchFirst3PostTitles().then(console.log);

// 6. Create a simple timer function using Promise that counts from 1 to 3, logging each number after 1 second intervals.
async function timerCount() {
    for (let i = 1; i <= 3; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log(i);
    }
}
// Example usage:
timerCount();

// 7. Write a function that safely parses JSON data with try/catch. Test it with both valid JSON string '{"name": "Omar"}' and invalid JSON '{name: Omar}'.
function safeJsonParse(str) {
    try {
        return JSON.parse(str);
    } catch (e) {
        return `Invalid JSON: ${e.message}`;
    }
}
// Test with valid and invalid JSON
console.log(safeJsonParse('{"name": "Omar"}'));
console.log(safeJsonParse('{name: Omar}'));

// 8. Create an async function that fetches data from 'https://jsonplaceholder.typicode.com/users/1/todos', converts it to JSON, and returns the count of completed todos.
async function countCompletedTodos() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users/1/todos');
    const todos = await res.json();
    return todos.filter(todo => todo.completed).length;
}
// Example usage:
countCompletedTodos().then(count => console.log('Completed todos:', count));

// 9. Build a simple module that exports a default class called 'DataFetcher' with a method 'getUser(id)' that fetches and returns user data from the JSONPlaceholder API.
class DataFetcher {
    async getUser(id) {
        const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        return await res.json();
    }
}
// Example usage:
const df = new DataFetcher();
df.getUser(1).then(console.log);
