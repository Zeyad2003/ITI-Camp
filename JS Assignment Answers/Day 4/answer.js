// 1. Select the first <div> on the page using getElementsByTagName and log its innerHTML.
const firstDiv = document.getElementsByTagName('div')[0];
console.log('Task 1:', firstDiv.innerHTML);

// 2. Using getElementById change the text of #my-p to "Hello DOM".
const myP = document.getElementById('my-p');
myP.textContent = 'Hello DOM';
console.log('Task 2: Note that \"Hello ISI\" has changed to \"Hello DOM\"');

// 3. Use querySelector to select the element with class "target-div" and log its nodeName.
const targetDiv = document.querySelector('.target-div');
console.log('Task 3:', targetDiv.nodeName);

// 4. Use querySelectorAll to count how many <div> elements exist; log the count.
const allDivs = document.querySelectorAll('div');
console.log('Task 4: Number of divs =', allDivs.length);

// 5. Use getElementsByName on the email input (name="user-email") and set its value to "user@test.com".
const emailInputs = document.getElementsByName('user-email');
emailInputs[0].value = 'user@test.com';
console.log("Task 5: Note that the email input field is set to 'user@test.com'");

// 6. Check if the text input has a "name" attribute; if not add name="user-name" via setAttribute.
const textInput = document.getElementById('my-input');
if (!textInput.hasAttribute('name')) {
  textInput.setAttribute('name', 'user-name');
  console.log('Task 6: name attribute added to text input, new name =', textInput.getAttribute('name'));
} else {
  console.log('Task 6: name attribute already exists on text input');
}

// 7. Append the string " - UPDATED" to the existing innerText of #my-p (keep original text).
myP.innerText += ' - UPDATED';
console.log('Task 7: #my-p text updated');

// 8. Create Images slider that work automatically and with next/prev/start/stop buttons. (Simple ES5 version)
var sliderImages = [
  'assets/Apple-Logo-500x281.png',
  'assets/Acer-Logo-500x313.png',
  'assets/Amazon-Logo-500x281.png',
  'assets/Google-logo-500x281.png',
  'assets/Huawei-Logo-500x281.png',
  'assets/IBM-logo-500x281.png',
  'assets/Instagram-Logo-500x281.png',
  'assets/Microsoft-Logo-500x163.png',
  'assets/Samsung-Logo-2-500x281.png'
];
var sliderIndex = 0;
var sliderInterval = null;

function showSliderImage(idx) {
  var sliderImg = document.getElementById('slider-img');
  sliderImg.src = sliderImages[idx];
}

function nextSliderImage() {
  sliderIndex = sliderIndex + 1;
  if (sliderIndex >= sliderImages.length) {
    sliderIndex = 0;
  }
  showSliderImage(sliderIndex);
}

function prevSliderImage() {
  sliderIndex = sliderIndex - 1;
  if (sliderIndex < 0) {
    sliderIndex = sliderImages.length - 1;
  }
  showSliderImage(sliderIndex);
}

function startSlider() {
  if (!sliderInterval) {
    sliderInterval = setInterval(nextSliderImage, 1500);
  }
}

function stopSlider() {
  if (sliderInterval) {
    clearInterval(sliderInterval);
    sliderInterval = null;
  }
}
// Start slider automatically
startSlider();

// 9. Set the placeholder of the text input to "Type your full name" using setAttribute.
textInput.setAttribute('placeholder', 'Type your full name');
console.log('Task 9: Text input placeholder set to "Type your full name"');

// 10. Log whether the email input has attribute "required"; if missing add it.
if (emailInputs[0].hasAttribute('required')) {
  console.log('Task 10: Email input already has required attribute');
} else {
  emailInputs[0].setAttribute('required', '');
  console.log('Task 10: required attribute added to email input');
}

// 11. Write function getSelectedValue(selectId) returning the current selected option value.
function getSelectedValue(selectId) {
  var select = document.getElementById(selectId);
  return select ? select.value : null;
}
console.log('Task 11: Selected value of my-select =', getSelectedValue('my-select'));

// 12. Loop through all options of the select and log each option's text and value.
var selectEl = document.getElementById('my-select');
for (var i = 0; i < selectEl.options.length; i++) {
  var opt = selectEl.options[i];
  console.log('Task 12: Option', i, 'text =', opt.text, ', value =', opt.value);
}

// 13. Programmatically select the option with value "EG".
selectEl.value = 'EG';
console.log('Task 13: Option with value "EG" selected. Current value =', selectEl.value);

// 14. Create function selectByText(selectId, text) that selects the first option whose text matches exactly.
function selectByText(selectId, text) {
  var sel = document.getElementById(selectId);
  for (var i = 0; i < sel.options.length; i++) {
    if (sel.options[i].text === text) {
      sel.selectedIndex = i;
      return true;
    }
  }
  return false;
}
// Example usage:
selectByText('my-select', 'United Kingdom');
console.log('Task 14: Selected by text "United Kingdom". Current value =', selectEl.value);

// 15. Replace innerHTML of #div-2 with a <p><b>Bold Text</b></p> (ensure bold renders, not printed literally).
var div2 = document.getElementById('div-2');
div2.innerHTML = '<p><b>Bold Text</b></p>';
console.log('Task 15: #div-2 innerHTML replaced with bold text.');

// 16. Add classes class-a and class-b to #div-2 then remove class-b (using classList).
div2.classList.add('class-a', 'class-b');
div2.classList.remove('class-b');
console.log('Task 16: class-a added, class-b added then removed from #div-2.');

// 17. Toggle class "hidden" on #div-2 twice; comment final visibility.
div2.classList.toggle('hidden');
div2.classList.toggle('hidden');
// After two toggles the class is not hidden
console.log('Task 17: Toggled hidden twice. #div-2 is visible.');

// 18. Create function insertAfter(refNode, newNode) that inserts newNode immediately after refNode.
function insertAfter(refNode, newNode) {
  if (refNode.parentNode) {
    if (refNode.nextSibling) {
      refNode.parentNode.insertBefore(newNode, refNode.nextSibling); // Make it a child for the parent node
    } else {
      refNode.parentNode.appendChild(newNode);
    }
  }
}
// Example usage:
insertAfter(div2, document.createElement('div'));

// 19. Create a new <div> saying "Dynamic Box" with yellow background and append inside #div-2.
var dynamicBox = document.createElement('div');
dynamicBox.textContent = 'Dynamic Box';
dynamicBox.style.background = 'yellow';
div2.appendChild(dynamicBox);
console.log('Task 19: Dynamic Box div appended to #div-2.');

// 20. Insert a new <p> BEFORE the first child of #div-2 (insertBefore).
var newP = document.createElement('p');
newP.textContent = 'Inserted before first child';
div2.insertBefore(newP, div2.firstChild);
console.log('Task 20: <p> inserted before first child of #div-2.');

// 21. Insert a <span> with text "AFTER END" right after #div-2 using insertAdjacentHTML.
div2.insertAdjacentHTML('afterend', '<span>AFTER END</span>');
console.log('Task 21: <span>AFTER END</span> inserted after #div-2.');

// 22. Form onsubmit: prevent default and log values of text, email, and select inputs.
var form = document.querySelector('form');
form.onsubmit = function(e) {
  e.preventDefault();
  var textVal = document.getElementById('my-input').value;
  var emailVal = document.getElementById('my-email').value;
  var selectVal = document.getElementById('my-select').value;
  console.log('Task 22: Form submitted. Text:', textVal, 'Email:', emailVal, 'Select:', selectVal);
};

// 23. Add input event on the text input that logs its length whenever it changes.
textInput.addEventListener('input', function() {
  console.log('Task 23: Text input length =', this.value.length);
});

// 24. Write validateEmailSimple(value) returning true if value contains both '@' and '.'; add 2 passing / 2 failing examples (comments).
function validateEmailSimple(value) {
  return value.includes('@') && value.includes('.');
}
// Passing examples:
console.log('Task 24: validateEmailSimple("user@test.com") =', validateEmailSimple('user@test.com'));
console.log('Task 24: validateEmailSimple("a.b@c.d") =', validateEmailSimple('a.b@c.d'));
// Failing examples:
console.log('Task 24: validateEmailSimple("usertest.com") =', validateEmailSimple('usertest.com'));
console.log('Task 24: validateEmailSimple("user@testcom") =', validateEmailSimple('user@testcom'));


// 25. Create an element, append it to #div-2, then remove it using parent.removeChild(child).
var tempEl = document.createElement('div');
tempEl.textContent = 'To be removed from #div-2';
div2.appendChild(tempEl);
div2.removeChild(tempEl);
console.log('Task 25: Created and removed element from #div-2.');

// 26. Create an element, append it to <div id="wrapper">, then remove it using parent.removeChild(child).
var wrapper = document.getElementById('wrapper');
if (wrapper) {
  var tempEl = document.createElement('span');
  tempEl.textContent = 'Appended then removed from #wrapper';
  wrapper.appendChild(tempEl);
  wrapper.removeChild(tempEl);
  console.log('Task 26: Created and removed element from #wrapper.');
} else {
  console.log('Task 26: #wrapper not found in DOM.');
}

// 27. Clone #div-2, set clone id="div-2-clone", and insert it after original using insertAfter.
var div2Clone = div2.cloneNode(true);
div2Clone.id = 'div-2-clone';
insertAfter(div2, div2Clone); // From Task 18
console.log('Task 27: #div-2 cloned and inserted after original.');

// 28. Highlight all text & email inputs (green border) in a function highlightInputs(form) and call it on DOMContentLoaded.
function highlightInputs(form) {
  var inputs = form.querySelectorAll('input[type="text"], input[type="email"]');
  inputs.forEach(function(input) {
    input.style.border = '2px solid green';
  });
}
document.addEventListener('DOMContentLoaded', function() {
  highlightInputs(form);
});
console.log('Task 28: highlightInputs called on DOMContentLoaded.');

// 29. Build function buildCard(title, content) returning <div class="card"> with an <h3> and <p>; append two cards to body.
function buildCard(title, content) {
  var card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = '<h3>' + title + '</h3><p>' + content + '</p>';
  return card;
}
document.body.appendChild(buildCard('Card 1', 'This is the first card.'));
document.body.appendChild(buildCard('Card 2', 'This is the second card.'));
console.log('Task 29: Two cards appended to body.');

// 30. Add delegated click listener on body logging when a .card is clicked.
document.body.addEventListener('click', function(e) {
  var card = e.target.closest('.card');
  if (card) {
    var h3 = card.querySelector('h3');
    console.log('Task 29: Card clicked:', h3 ? h3.textContent : '');
  }
}); // Click on the div to test

// 31. Reflection (comment): Which two tasks were most challenging and why?
// Task: 8 (slidebar)
// Task: 28 (DOMContentLoaded) 

// 32. create and unordered list dynamically with at 10 items, the odd list items should have class "odd" and even items "even", -create the two classes in your CSS file.
var ul = document.createElement('ul');
for (var i = 1; i <= 10; i++) {
  var li = document.createElement('li');
  li.textContent = 'Item ' + i;
  li.className = (i % 2 === 0) ? 'even' : 'odd';
  ul.appendChild(li);
}
document.body.appendChild(ul);
console.log('Task 32: Unordered list with 10 items created.');
// Styling Part
var style = document.createElement('style');
style.textContent = '.odd { background: #e2e267ff; } .even { background: #53b0e2ff; }';
document.head.appendChild(style);

// 33. Use the existing form and display 3 divs under the form with the entered data.
var mainForm = document.querySelector('form');
var showDataBtn = document.createElement('button');
showDataBtn.type = 'button';
showDataBtn.textContent = 'Show Data';
mainForm.appendChild(showDataBtn);
var dataContainer = document.createElement('div');
mainForm.insertAdjacentElement('afterend', dataContainer);
showDataBtn.onclick = function() {
  dataContainer.innerHTML = '';
  var name = document.getElementById('my-input').value;
  var email = document.getElementById('my-email').value;
  var city = document.getElementById('my-select').value;
  ['Name: ' + name, 'Email: ' + email, 'City: ' + city].forEach(function(text) {
    var d = document.createElement('div');
    d.textContent = text;
    dataContainer.appendChild(d);
  });
  console.log('Task 33: Show Data button clicked. Data shown below form.');
};
console.log('Task 33: Show Data button added to main form.');
