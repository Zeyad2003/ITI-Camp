// Task 1
function openWindowAndAutoClose() {
  var w = window.open('https://example.com', '', 'width=400,height=300');
  var closeFun = function() {
    if (w) {
        w.close();
    }
  }
  setTimeout(closeFun, 3000);
}

// Task 2
function showUserAgent() {
    alert(navigator.userAgent);
}

// Task 3
function checkOnlineStatus() {
    alert(navigator.onLine ? "Online" : "Offline");
}

// Task 4
function scheduleReloadIn5s() {
    var fun = function() {
        location.reload();
    }
    
    setTimeout(fun, 5000);
}

// Task 5
function logLocationDetails() {
    alert("URL: " + location.href + "\nProtocol: " + location.protocol + "\nHostname: " + location.hostname);
}

// Task 7
function showScreenSize() {
    var d = document.getElementById('screenInfo');
    if (d) d.innerHTML = "Screen: " + screen.width + " x " + screen.height;
}

// Task 8
var linkTimeout;
function changeLinkAfter2s() {
    var a = document.getElementById('linkToChange');
    if (!a) return;

    var fun = function() {
        a.innerHTML = "New Link Text";
        a.href = "https://developer.mozilla.org/";
    }

    linkTimeout = setTimeout(fun, 2000);
}
function cancelChangeLink() {
    clearTimeout(linkTimeout);
}

// Task 9
var titleInterval;
function startTitleClock() {
    stopTitleClock();
    originalTitle = document.title;

    var fun = function() {
        var now = new Date();
        document.title = originalTitle + " | " + now.toLocaleTimeString();
    }

    titleInterval = setInterval(fun, 1000);
}
function stopTitleClock() {
    if (titleInterval) {
        clearInterval(titleInterval);
        titleInterval = null;
    }
}

// Task 10
function askToContinue() {
    var result = confirm("Do you want to continue?");
    if (result) {
        alert("user said yes");
    } else {
        alert("user said no");
    }
}

// ===========================================================================

// Task 11
// childNodes returns all child nodes of an element (elements, text, comments), while children returns only child elements (tags), ignoring text and comments.
function showUlChildNodesAndChildren() {
    var ul = document.getElementById('sampleUl');
    if (!ul) return;
    alert('childNodes: ' + ul.childNodes.length + '\nchildren: ' + ul.children.length);
}

// Task 12
function showBodyDirectChildren() {
    var arr = [];
    var kids = document.body.children;
    for (var i = 0; i < kids.length; ++i) {
        arr.push(kids[i].tagName);
    }
    alert('Body direct children: ' + arr.join(', '));
}

// Task 13
function showElementNodesInUl(selector) {
    var parent = document.querySelector(selector);
    if (!parent) return;
    var arr = [];
    var nodes = parent.childNodes;
    for (var i = 0; i < nodes.length; ++i) {
        if (nodes[i].nodeType === 1) {
            arr.push(nodes[i].tagName);
        }
    }
    alert('Element nodes: ' + arr.join(', '));
}

// Task 14
function showFirstChildVsFirstElementChild(selector) {
    var c = document.querySelector(selector);
    if (!c) return;
    var fc = c.firstChild;
    var fec = c.firstElementChild;
    alert('firstChild: ' + (fc ? fc.nodeName : 'null') + '\nfirstElementChild: ' + (fec ? fec.tagName : 'null'));
}

// Task 15
function showAllLiInUl(selector) {
    var ul = document.querySelector(selector);
    if (!ul) return;
    var arr = [];
    for (var i = 0; i < ul.children.length; ++i) {
        if (ul.children[i].tagName.toLowerCase() === 'li') {
            arr.push(ul.children[i].textContent);
        }
    }
    alert('LI elements: ' + arr.join(', '));
}

// Task 17
function showSiblingsOfElement(selector) {
    var el = document.querySelector(selector);
    if (!el) return;
    var arr = [];
    var sibs = el.parentNode.children;
    for (var i = 0; i < sibs.length; ++i) {
        if (sibs[i] !== el) arr.push(sibs[i].tagName + (sibs[i].id ? '#' + sibs[i].id : ''));
    }
    alert('Siblings: ' + arr.join(', '));
}

// Task 18
function traverseUlChildren(selector) {
    var ul = document.querySelector(selector);
    if (!ul) return;
    var n = ul.firstChild;
    var all = [];
    while (n) {
        all.push(n.nodeName);
        n = n.nextSibling;
    }
    var e = ul.firstElementChild;
    var elems = [];
    while (e) {
        elems.push(e.tagName);
        e = e.nextElementSibling;
    }
    alert('nextSibling: ' + all.join(', ') + '\nnextElementSibling: ' + elems.join(', '));
}

// Task 19
function countElementChildren(selector) {
    var node = document.querySelector(selector);
    if (!node) return;
    var count = 0;
    for (var c = node.firstChild; c; c = c.nextSibling) {
        if (c.nodeType === 1) count++;
    }
    alert('Element children count: ' + count);
}

// Task 20
function showFormInputNamesAndValues() {
    var form = document.getElementById('sampleForm');
    if (!form) return;
    var arr = [];
    for (var i = 0; i < form.elements.length; ++i) {
        var el = form.elements[i];
        if (el.name) arr.push(el.name + '=' + el.value);
    }
    alert('Form inputs: ' + arr.join(', '));
}

// Task 21
function logAllFormNames() {
    var forms = document.forms;
    var names = [];
    for (var i = 0; i < forms.length; ++i) {
        names.push(forms[i].name || forms[i].id || '[no name]');
    }
    alert('Form names: ' + names.join(', '));
}

// Task 22
function logAllImageSrcs() {
    var imgs = document.images;
    var srcs = [];
    for (var i = 0; i < imgs.length; ++i) {
        srcs.push(imgs[i].src);
    }
    alert('Image srcs: ' + srcs.join('\n'));
}

// Task 23
function disableFormInputs(form) {
    if (!form || !form.elements) return;
    for (var i = 0; i < form.elements.length; ++i) {
        form.elements[i].disabled = true;
    }
}
function disableSampleFormInputs() {
    var form = document.getElementById('sampleForm');
    disableFormInputs(form);
}

// Task 24
function filterWideImages() {
    var imgs = Array.from(document.images);

    var fun = function(img) {
        return img.width > 100;
    }

    var fun2 = function(img) {
        return img.src;
    }

    var wideImgs = imgs.filter(fun);
    var srcs = wideImgs.map(fun2);
    alert('Images with width > 100px:\n' + srcs.join('\n'));
}
