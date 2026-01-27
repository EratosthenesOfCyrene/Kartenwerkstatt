
window.onload = function() {
    console.log('huhuhuhhuhuhuhuhuh');
    
    loadHTML('aboutMe', 'html-files/about.html');
    loadHTML('services', 'html-files/services.html');
    loadHTML('contact', 'html-files/contact.html');
};



function loadHTML(id, url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
        })
        .catch(err => console.error('Fehler beim Laden:', err));
}  

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