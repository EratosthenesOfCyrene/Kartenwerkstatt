
const navbar = document.getElementById('navBar');





function removeDNone(param1, param2) {
    document.getElementById(param1).classList[param2]('d-none');
}


// Nav-Bar dunkler machen wenn gescrollt wurde
window.addEventListener("scroll", () => {
    if (window.scrollY > 10) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});





// Service-Section Card Elements hover
function serviceCardImg() {
    document.querySelectorAll(".service-card").forEach(card => {
        const img = card.dataset.img;
        card.style.setProperty("--bg", `url(${img})`);
        card.style.setProperty("background-image", `url(${img})`);
    });

    document.querySelectorAll(".service-card").forEach(card => {
        card.style.setProperty("--bg", `url(${card.dataset.img})`);
    });
}

/*
function initServices() {
    document.querySelectorAll(".service-card").forEach(card => {
        const img = card.dataset.img;
        card.style.setProperty("--bg", `url(${img})`);
        card.style.setProperty("background-image", `url(${img})`);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".service-card").forEach(card => {
        const img = card.dataset.img;
        card.style.setProperty("--bg", `url(${img})`);
        console.log(document.querySelectorAll(".service-card"));
    });
});
*/




