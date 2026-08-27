


let mobileMenuActiveService = false;
let mobileWindowService = false;
let scrollPositionService = 0;

//const header = document.getElementById('headerDiv');
const headerService = document.querySelector('service-detail-header');
//const navTitle = document.getElementById('navTitle');
//const navTitleService = document.getElementById('"navTitleService');

let headerIsVisibleService = true;
let lastScrollYService = window.scrollY;

let navBarService = document.getElementById('navBarServices');


const mobileQueryService = window.matchMedia('(max-width: 768px), (max-width: 1024px) and (pointer: coarse)');


/*
window.onload = function () {

    loadHTML('ServiceDetailNavBar', 'nav-services.html')
        .then(initServiceDetailNavbar);
};


function initServiceDetailNavbar() {

    const navBarServices = document.getElementById('navBarServices');

    if (!navBarServices) return;

    window.addEventListener("scroll", () => {

        if (window.scrollY > 10) {
            navBarServices.classList.add("scrolled");
        } else {
            navBarServices.classList.remove("scrolled");
        }

    });
}*/

/*
document.getElementById("servicesLink").addEventListener("click", function (e) {
    e.preventDefault(); // Link sofort stoppen

    setTimeout(() => {

        handleMobileMenuActions();

        document.getElementById("serviceID").scrollIntoView({
            behavior: "smooth"
        });

    }, 500);
}); */

// Eventlistener für Klick-Events der Nav-List
document.querySelector(".nav-list").addEventListener("click", e => {
    const link = e.target.closest("a");
    if (!link) return;

    const target = link.getAttribute("href");
    if (!target || !target.startsWith("#")) return;

    e.preventDefault();

    setTimeout(() => {
        handleMobileMenuActions();

        document.querySelector(target)?.scrollIntoView({
            behavior: "smooth"
        });
    }, 300);
});

function handleViewportChange(e) {
    if (e.matches) {
        // <= 500px
        mobileWindowService = true;
        console.log("Mobile Ansicht");
    } else {
        // > 500px
        mobileWindowService = false;
        console.log("Desktop Ansicht");
    }
}

// beim Laden einmal prüfen
handleViewportChange(mobileQueryService);

// auf Änderungen reagieren
mobileQueryService.addEventListener("change", handleViewportChange);


function handleMobileMenuActions() {
    if (mobileMenuActiveService === false && mobileWindowService) {
        showXImageMobileButton();
        showMobileSelectionMenu();
        mobileMenuActiveService = true;
    } else if (mobileMenuActiveService === true && mobileWindowService) {
        showHamburgerMenuMobileButton();
        hideMobileSelectionMenu(false);
        setTimeout(() => {
            mobileMenuActiveService = false;
        }, 200);
    }
}

function showXImageMobileButton() {
    document.getElementById('mobileAboutMenuXImg').classList.remove('d-none');
    document.getElementById('mobileAboutMenuBurgerImg').classList.add('d-none');
}

function showMobileSelectionMenu() {
    scrollPositionService = window.scrollY;
    // document.getElementById('navList').classList.add('show-element'); // Showing the select Menu.
    document.getElementById('navList').classList.add('nav-list-is-active'); // Showing the select Menu.
    document.getElementById('navBarServices').classList.add('nav-bar-selection-menu-color');  // Add color to the nav bar.
    document.getElementById('menuBackdrop').classList.add('menu-backdrop-is-active'); // Showing the backdrop.
    document.body.classList.add('no-scroll'); // Scrollen verhindern wenn mobile menu offen
    document.body.style.top = `-${scrollPositionService}px`;
    //navTitle.classList.add('is-visible');
    //document.getElementById('navList').classList.remove('d-none');

    /* const burger = document.getElementById("mobileAboutMenu");
     const navList = document.querySelector(".nav-list");
 
     burger.addEventListener("click", () => {
         navList.classList.toggle("is-open");
     }); */
}

function showHamburgerMenuMobileButton() {
    document.getElementById('mobileAboutMenuBurgerImg').classList.remove('d-none');
    document.getElementById('mobileAboutMenuXImg').classList.add('d-none');
}

let restoreScroll = false;
function hideMobileSelectionMenu() {
    restoreScroll = true;
    // document.getElementById('navList').classList.remove('show-element'); // Hiding the select Menu.
    document.getElementById('navList').classList.remove('nav-list-is-active'); // Hiding the select Menu.
    document.getElementById('navBarServices').classList.remove('nav-bar-selection-menu-color'); //remove  color from the nav bar
    document.getElementById('menuBackdrop').classList.remove('menu-backdrop-is-active'); // Hiding the backdrop.
    document.body.classList.remove('no-scroll'); // Scrollen wieder erlauben, wenn mobile menu wieder geschlossen
    document.body.style.top = "";

    if (restoreScroll) {
        document.documentElement.style.scrollBehavior = "auto";
        window.scrollTo(0, scrollPositionService);
        document.documentElement.style.scrollBehavior = "smooth";
        console.log(scrollPositionService);

    }
    navTitle.classList.add('is-visible');
}



// Sektion, die prüft, ob die Seitenüberchrift in der nav-bar angezeigt werden soll
/* Prüfen, ob Header sichtbar ist */
const observer = new IntersectionObserver(
    ([entry]) => {
        headerIsVisibleService = entry.isIntersecting;
    },
    {
        threshold: 0.05
    }
);

observer.observe(header);


/* 2. Scrollrichtung + Anzeige steuern */
window.addEventListener("scroll", () => {

    const current = window.scrollY;
    const scrollingUp = current < lastScrollYService;

    // ➜ Nur wenn:
    // - Header nicht mehr sichtbar
    // - und nach oben gescrollt wird
    if (scrollingUp) {
        navBarService.classList.remove('is-hidden');
    }
    if (!headerIsVisibleService && scrollingUp) {
        navTitle.classList.add('is-visible');
        //navBarService.classList.remove('is-hidden');
    }
    else if (mobileWindowService && !mobileMenuActiveService && !scrollingUp) {  // Damit die Nav-Bar beim Hochscrollen ausgeblendet wird, aber nur, wenn die mobile Ansicht aktiv ist und wenn das mobile Menu nicht angezeigt wird
        navBarService.classList.add('is-hidden');

    } else if (!mobileMenuActiveService) {
        navTitle.classList.remove('is-visible');
    }

    // ➜ Ganz oben → Titel immer ausblenden
    if (current < 10 && !mobileMenuActiveService) {
        navTitle.classList.remove('is-visible');
    }

    lastScrollYService = current;
});

const scrollbarWidth =
    window.innerWidth - document.documentElement.clientWidth;

document.documentElement.style.setProperty(
    "--scrollbar-width",
    scrollbarWidth + "px"
);
