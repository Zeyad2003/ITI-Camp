class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Stack {
  constructor() {
    this.top = null;
    this.length = 0;
  }

  push(value) {
    let newNode = new Node(value);
    if (this.length > 0) {
      newNode.next = this.top;
    }
    this.top = newNode;
    this.length++;
  }

  pop() {
    if (this.length === 0) {
      return null;
    }

    const nodeToRemove = this.top;

    this.top = nodeToRemove.next;
    this.length--;

    return nodeToRemove.value;
  }


  peek() {
    if (this.length === 0) {
      return null;
    }

    return this.top.value;
  }

  isEmpty() {
    return this.length === 0;
  }
}

const myStack = new Stack();
console.log(myStack.isEmpty()); // True

myStack.push("Apple");
myStack.push("Banana");
myStack.push("Cherry"); 

console.log("Stack length:", myStack.length); // 3

console.log("\nTop item:", myStack.peek()); // Cherry

console.log("\nPopped:", myStack.pop()); // Cherry
console.log("Popped:", myStack.pop()); // Banana

console.log("\nPeek:", myStack.peek()); // Apple
console.log("Is stack empty?", myStack.isEmpty()); // false
console.log("Stack length:", myStack.length); // 1

console.log("\nPopped:", myStack.pop()); // Apple

console.log("\nIs stack empty?", myStack.isEmpty()); // true
console.log("Final peek:", myStack.peek()); // null
console.log("Final stack length:", myStack.length); // 0
