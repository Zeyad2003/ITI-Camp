class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

export default class LinkedList {
    constructor() {
        this.head = null;
        this._length = 0;
    }

    peek() {
        return this.head ? this.head.value : null;
    }

    insert(value) {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
        this._length++;
    }

    remove() {
        if (!this.head) return null;
        const removedValue = this.head.value;
        this.head = this.head.next;
        this._length--;
        return removedValue;
    }

    isEmpty() {
        return this._length === 0;
    }

    length() {
        return this._length;
    }

    reverse() {
        let prev = null;
        let current = this.head;
        while (current) {
            const next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }
        this.head = prev;
    }
}