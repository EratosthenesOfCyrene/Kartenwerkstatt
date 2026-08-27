/*
window.onload = function () {
    console.log('huhuhuhhuhuhuhuhuh');

    loadHTML('aboutMe', 'html-files/about.html');
    loadHTML('services', 'html-files/services.html');
    loadHTML('contact', 'html-files/contact.html');
    loadHTML('mobileElements', 'html-files/mobile_elements.html');
    loadHTML('fullscreenElement', 'fullscreen-services.html');  // Fullscreen für Services Desktop
    loadHTML('ServiceDetailNavBar', 'nav-services.html')   // Nav Bar für Services Desktop
    loadHTML('mobileElementsDetailPage', '/html-files/mobile_elements.html')   // Nav Bar für Services Desktop
    //loadHTML('mobileElements', '/html-files/mobile_elements.html')   // Nav Bar für Services Desktop
    testMobileActive();
}; */ 

window.onload = async function () {

    loadHTML('aboutMe', 'html-files/about.html');
    loadHTML('services', 'html-files/services.html');
    loadHTML('contact', 'html-files/contact.html');
    loadHTML('mobileElements', 'html-files/mobile_elements.html');
    loadHTML('fullscreenElement', 'fullscreen-services.html');

    const navLoaded = await loadHTML(
        'ServiceDetailNavBar',
        'nav-services.html'
    );

    if (navLoaded) {
        loadHTML(
            'mobileElementsDetailPage',
            '../html-files/mobile_elements.html'
        );
    }

    testMobileActive();
};


/*
function loadHTML(id, url) {
    return fetch(url)
        .then(response => response.text())
        .then(data => {
            const el = document.getElementById(id);
            if (!el) return;
            el.innerHTML = data;
        });
}*/


function loadHTML(id, url) {
    const target = document.getElementById(id);

    if (!target) {
        return Promise.resolve(false);
    }

    return fetch(url)
        .then(r => r.text())
        .then(html => {
            target.innerHTML = html;
            return true;
        })
        .catch(err => {
            console.error('Fehler beim Laden:', err);
            return false;
        });
}



/*
function loadHTML(id, url) {
    const target = document.getElementById(id);

    if (!target) {
        // Element existiert auf dieser Seite nicht → einfach abbrechen
        return;
    }

    fetch(url)
        .then(response => response.text())
        .then(data => {
            target.innerHTML = data;
        })
        .catch(err => console.error('Fehler beim Laden:', err));
} */ 

/*
function loadHTML(id, url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
        })
        .catch(err => console.error('Fehler beim Laden:', err));
}  */

/*
function loadHTML(id, file, callback) {
    fetch(file)
        .then(res => res.text())
        .then(html => {
            const el = document.getElementById(id);
            if (!el) return;

            el.innerHTML = html;

            if (typeof callback === "function") {
                callback();
            }
        });
}*/


/*
function loadHTML(id, url, callback) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
            if (callback) callback();   // <-- hier
        })
        .catch(err => console.error('Fehler beim Laden:', err));
} */


function testMobileActive() {
    setInterval(() => {
        console.log(scrollPosition);
    }, 500);
}