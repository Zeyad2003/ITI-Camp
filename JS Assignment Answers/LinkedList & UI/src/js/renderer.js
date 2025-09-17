function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

export function renderList(linkedList, containerEl) {
    // Clear container
    containerEl.innerHTML = '';

    // Show message if list is empty
    if (linkedList.isEmpty()) {
        containerEl.innerHTML = '<p class="empty-message">The list is empty.</p>';
        return;
    }

    // Go through each node and display it
    let currentNode = linkedList.head;
    while (currentNode) {
        // Create visual element for this node
        const nodeElement = document.createElement('div');
        nodeElement.textContent = currentNode.value;
        
        // Give new nodes a random color
        if (!currentNode.color) {
            currentNode.color = getRandomColor();
        }
        
        nodeElement.style.backgroundColor = currentNode.color;
        nodeElement.classList.add('node');
        containerEl.appendChild(nodeElement);

        // Move to next node
        currentNode = currentNode.next;
    }
}
