



let slides = [
    {
        img: 'img/karten_imgs/wegbeschreibungen.jpg',
        text: 'Wegbeschreibungen'
    },
    {
        img: 'img/karten_imgs/historische_karte_small.png',
        text: 'Karten für wissenschaftliche Forschung'
    },
    {
        img: 'img/karten_imgs/karte_wissenschaftl_publiktionen.jpg',
        text: 'Karten für wissenschaftliche Publikationen'
    },
    {
        img: 'img/karten_imgs/karten_fuer_museen.jpg',
        text: 'Karten für Museen'
    },
    {
        img: 'img/karten_imgs/historische_karten.jpg',
        text: 'Aufbereitung historischer Karten'
    },
];




let currentIndex = 0;
let automaticSlideInterval = null;
let isFullscreenOpen = false;


//const carousel = document.querySelector(".carousel-slide-outer");
const carousel = document.getElementById("slideImgDiv");

const mainImg = document.querySelector(".slide-img");
const mainText = document.querySelector(".slide-txt");
const smallImgs = document.querySelectorAll(".carousel-slide-small img");

const btnLeft = document.querySelector(".carousel-btn.left");
const btnRight = document.querySelector(".carousel-btn.right");

function updateCarousel() {
    const total = slides.length;

    // Hauptbild
    mainImg.src = slides[currentIndex].img;
    mainText.textContent = slides[currentIndex].text;

    // Kleine Vorschauen (2 links, 2 rechts)
    const indexes = [
        (currentIndex - 2 + total) % total,
        (currentIndex - 1 + total) % total,
        (currentIndex + 1) % total,
        (currentIndex + 2) % total,
    ];

    smallImgs.forEach((img, i) => {
        img.src = slides[indexes[i]].img;
    });
}

btnLeft.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
});

btnRight.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
});

// Initial laden
//updateCarousel();




//automatisches weiterklicken des Karussells
function startAutomaticSlide() {
    if (isFullscreenOpen) return; // Abbruch wenn Fullscreen geöffnet ist
    if (automaticSlideInterval !== null) return; // INterval läuft bereits

    automaticSlideInterval = setInterval(() => {
        nextSlide();
    }, 4000);

    console.log('Carousel läuft!!!!!');

    setTimeout(() => {
        serviceCardImg();
    }, 1000);

}

function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
}

function stopAutomaticSlide() {
    if (automaticSlideInterval === null) return;
    clearInterval(automaticSlideInterval);
    console.log("⏸ Autoplay gestoppt", automaticSlideInterval);
    automaticSlideInterval = null;

}

// Event-listener für Karussell Logik

carousel.addEventListener("mouseenter", stopAutomaticSlide);
carousel.addEventListener("mouseleave", startAutomaticSlide);




btnLeft.addEventListener("click", () => {
    stopAutomaticSlide();
    //prevSlide();
    startAutomaticSlide();
});

btnRight.addEventListener("click", () => {
    stopAutomaticSlide();
    // nextSlide();
    startAutomaticSlide();
});



// Fullscreen
function loadFullscreen() {
    isFullscreenOpen = true;
    stopAutomaticSlide();
    removeDNone('fullscreemImgDivOuter', 'remove');
    let imgPath = slides[currentIndex].img;
    document.getElementById('fulscreenImg').src = imgPath;
    disableScroll();
}

function closeFullscreen() {
    isFullscreenOpen = false;
    startAutomaticSlide();
    removeDNone('fullscreemImgDivOuter', 'add');
    enableScroll();
}


/*
let isScrolling;

window.addEventListener("scroll", () => {
    console.log("Scroll detected");
    stopAutomaticSlide();

    // Clear the timeout while scrolling
    window.clearTimeout(isScrolling);

    // Set a timeout to run after scrolling ends
    isScrolling = setTimeout(() => {
        console.log("Scroll finished");
        startAutomaticSlide();
    }, 150); // 150ms nach letztem Scroll
});

*/


updateCarousel();
startAutomaticSlide(); 