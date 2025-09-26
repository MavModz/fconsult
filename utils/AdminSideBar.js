

export function activateMenu(id, t, isbtn = false) {
    if (document.getElementById('title1')) document.getElementById('title1').innerHTML = t;
    if (document.getElementById('title2')) document.getElementById('title2').innerHTML = t;
    if (isbtn && document.getElementById('backbtn1')) {
        document.getElementById('backbtn1').style.display = 'block';
    } else if (document.getElementById('backbtn1')) {
        document.getElementById('backbtn1').style.display = 'block';
    }
    if (isbtn && document.getElementById('backbtn2')) {
        document.getElementById('backbtn2').style.display = 'block';
    } else if (document.getElementById('backbtn2')) {
        document.getElementById('backbtn2').style.display = 'block';
    }
    var elements = document.querySelectorAll('.active-submenu, .active-page');
    elements.forEach(function (element) {
        element.classList.remove('active-submenu', 'active-page');
    });
    var menuElement = document.getElementById(id);
    if (menuElement) {
        menuElement.classList.add('active-page');
    }
}

export function activateSubmenu(elementId, t, isbtn = false) {
    if (document.getElementById('title1')) document.getElementById('title1').innerHTML = t;
    if (document.getElementById('title2')) document.getElementById('title2').innerHTML = t;
    if (isbtn && document.getElementById('backbtn1')) {
        document.getElementById('backbtn1').style.display = 'block';
    } else if (document.getElementById('backbtn1')) {
        document.getElementById('backbtn1').style.display = 'block';
    }
    if (isbtn && document.getElementById('backbtn2')) {
        document.getElementById('backbtn2').style.display = 'block';
    } else if (document.getElementById('backbtn2')) {
        document.getElementById('backbtn2').style.display = 'block';
    }
    var elements = document.querySelectorAll('.active-submenu, .active-page');
    elements.forEach(function (element) {
        element.classList.remove('active-submenu', 'active-page');
    });
    var element = document.getElementById(elementId);
    if (element) {
        element.classList.add('active-submenu');
        var parentElement = element.parentElement;
        while (parentElement && !parentElement.classList.contains('men')) {
            parentElement = parentElement.parentElement;
        }
        if (parentElement) {
            parentElement.classList.add('active-page');
        }
    }
}

