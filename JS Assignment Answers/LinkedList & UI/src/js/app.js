import LinkedList from './LinkedList.js';
import { renderList } from './renderer.js';

const linkedList = new LinkedList();

// DOM elements (match index.html IDs)
const inputField = document.getElementById('nodeValue');
const insertButton = document.getElementById('insertBtn');
const removeButton = document.getElementById('removeBtn');
const reverseButton = document.getElementById('reverseBtn');
const peekButton = document.getElementById('peekBtn');
const listContainer = document.getElementById('linkedList');
const lengthLabel = document.getElementById('listLength');
const isEmptyLabel = document.getElementById('isEmpty');

function refreshUI() {
    renderList(linkedList, listContainer);
    lengthLabel.textContent = `Length: ${linkedList.length()}`;
    isEmptyLabel.textContent = `Is Empty: ${linkedList.isEmpty()}`;
}

insertButton.addEventListener('click', () => {
    const value = inputField.value.trim();
    if (value) {
        linkedList.insert(value);
        inputField.value = '';
        refreshUI();
    }
});

removeButton.addEventListener('click', () => {
    if (!linkedList.isEmpty()) {
        linkedList.remove();
        refreshUI();
    }
});

reverseButton.addEventListener('click', () => {
    linkedList.reverse();
    refreshUI();
});

peekButton.addEventListener('click', () => {
    const headVal = linkedList.peek();
    alert(headVal !== null ? `Head: ${headVal}` : 'List is empty');
});

// start render
refreshUI();