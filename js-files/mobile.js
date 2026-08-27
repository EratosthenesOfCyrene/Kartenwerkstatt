
let mobileMenuActive = false;
let mobileWindow = false;
let scrollPosition = 0;

const header = document.getElementById('headerDiv');
//let navTitle = document.getElementById('navTitle');
/*const navTitle =
    document.getElementById('navTitle')
document.getElementById('navTitleService');*/

let headerIsVisible = true;
let lastScrollY = window.scrollY;

/*let navBar =
    document.getElementById('navBar') ||
    document.getElementById('mobileElementsDetailPage');*/

let navBar = null;
let navTitle = null;

function resolveMobileNavElements() {
    if (!navBar) navBar = document.getElementById('navBar');
    if (!navTitle) navTitle = document.getElementById('navTitleService'); // oder deine echte ID
}


const mobileQuery = window.matchMedia('(max-width: 768px), (max-width: 1024px) and (pointer: coarse)');

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


document.addEventListener("click", e => {

    const navList = e.target.closest(".nav-list");
    if (!navList) return;

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


/*
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
});*/

function handleViewportChange(e) {
    if (e.matches) {
        // <= 500px
        mobileWindow = true;
        console.log("Mobile Ansicht");
    } else {
        // > 500px
        mobileWindow = false;
        console.log("Desktop Ansicht");
    }
}

// beim Laden einmal prüfen
handleViewportChange(mobileQuery);

// auf Änderungen reagieren
mobileQuery.addEventListener("change", handleViewportChange);


function handleMobileMenuActions() {
    if (mobileMenuActive === false && mobileWindow) {
        showXImageMobileButton();
        showMobileSelectionMenu();
        mobileMenuActive = true;
    } else if (mobileMenuActive === true && mobileWindow) {
        showHamburgerMenuMobileButton();
        hideMobileSelectionMenu(false);
        setTimeout(() => {
            mobileMenuActive = false;
        }, 200);
    }
}

function showXImageMobileButton() {
    document.getElementById('mobileAboutMenuXImg').classList.remove('d-none');
    document.getElementById('mobileAboutMenuBurgerImg').classList.add('d-none');
}

function showMobileSelectionMenu() {
    scrollPosition = window.scrollY;
    // document.getElementById('navList').classList.add('show-element'); // Showing the select Menu.
    document.getElementById('navList').classList.add('nav-list-is-active'); // Showing the select Menu.
    document.getElementById('navBar').classList.add('nav-bar-selection-menu-color');  // Add color to the nav bar.
    document.getElementById('menuBackdrop').classList.add('menu-backdrop-is-active'); // Showing the backdrop.
    document.body.classList.add('no-scroll'); // Scrollen verhindern wenn mobile menu offen
    document.body.style.top = `-${scrollPosition}px`;
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
    document.getElementById('navBar').classList.remove('nav-bar-selection-menu-color'); //remove  color from the nav bar
    document.getElementById('menuBackdrop').classList.remove('menu-backdrop-is-active'); // Hiding the backdrop.
    document.body.classList.remove('no-scroll'); // Scrollen wieder erlauben, wenn mobile menu wieder geschlossen
    document.body.style.top = "";

    if (restoreScroll) {
        document.documentElement.style.scrollBehavior = "auto";
        window.scrollTo(0, scrollPosition);
        document.documentElement.style.scrollBehavior = "smooth";
        console.log(scrollPosition);

    }
    resolveMobileNavElements();

    if (!navTitle) return;
    navTitle.classList.add('is-visible');
}



// Sektion, die prüft, ob die Seitenüberchrift in der nav-bar angezeigt werden soll
/* Prüfen, ob Header sichtbar ist */
/*const observer = new IntersectionObserver(
    ([entry]) => {
        headerIsVisible = entry.isIntersecting;
    },
    {
        threshold: 0.05
    }
);

observer.observe(header); */


//const header_1 = document.getElementById("header");   // oder deine echte ID
let header_1 = null;
let headerObserverInitialized = false;

function initHeaderObserver() {

    if (headerObserverInitialized) return;

    header_1 = document.getElementById("header");

    // Auf Detailseiten gibt es keinen Header
    if (!header_1) {
        headerIsVisible = false;
        headerObserverInitialized = true;
        return;
    }

    const observer = new IntersectionObserver(
        ([entry]) => {
            headerIsVisible = entry.isIntersecting;
        },
        { threshold: 0.05 }
    );

    observer.observe(header_1);
    headerObserverInitialized = true;
}
/*
function resolveHeader_1() {
    if (!header_1) {
        header_1 = document.getElementById("header");
    }
}

window.addEventListener("scroll", () => {
    resolveHeader_1();
    if (header_1) {

        const observer = new IntersectionObserver(
            ([entry]) => {
                headerIsVisible = entry.isIntersecting;
            },
            { threshold: 0.05 }
        );

        observer.observe(header_1);
    }
});*/


/* 2. Scrollrichtung + Anzeige steuern */
/*
window.addEventListener("scroll", () => {

    const current = window.scrollY;
    const scrollingUp = current < lastScrollY;

    // ➜ Nur wenn:
    // - Header nicht mehr sichtbar
    // - und nach oben gescrollt wird
    if (scrollingUp) {
        navBar.classList.remove('is-hidden');
    }
    if (!headerIsVisible && scrollingUp) {
        navTitle.classList.add('is-visible');
        //navBar.classList.remove('is-hidden');
    }
    else if (mobileWindow && !mobileMenuActive && !scrollingUp) {  // Damit die Nav-Bar beim Hochscrollen ausgeblendet wird, aber nur, wenn die mobile Ansicht aktiv ist und wenn das mobile Menu nicht angezeigt wird
        navBar.classList.add('is-hidden');

    } else if (!mobileMenuActive) {
        navTitle.classList.remove('is-visible');
    }

    // ➜ Ganz oben → Titel immer ausblenden
    if (current < 10 && !mobileMenuActive) {
        navTitle.classList.remove('is-visible');
    }

    lastScrollY = current;
});*/

window.addEventListener("scroll", () => {

    resolveMobileNavElements();

    if (!navBar || !navTitle) return;

    const current = window.scrollY;
    const scrollingUp = current < lastScrollY;

    if (scrollingUp) {
        navBar.classList.remove('is-hidden');
    }

    if (!headerIsVisible && scrollingUp) {
        navTitle.classList.add('is-visible');
    }
    else if (mobileWindow && !mobileMenuActive && !scrollingUp) {
        navBar.classList.add('is-hidden');
    }
    else if (!mobileMenuActive) {
        navTitle.classList.remove('is-visible');
    }

    if (current < 10 && !mobileMenuActive) {
        navTitle.classList.remove('is-visible');
    }

    lastScrollY = current;
});

const scrollbarWidth =
    window.innerWidth - document.documentElement.clientWidth;

document.documentElement.style.setProperty(
    "--scrollbar-width",
    scrollbarWidth + "px"
);



window.addEventListener("DOMContentLoaded", () => {
    setTimeout(initHeaderObserver, 50);
});




/*

// Funktion, um zu prüfen, ob gerade nach unten oder oben gescrollt wird, um entsprechend die nav-leiste ein- oder auszublenden
const navBarNavTest = document.getElementById("navBar");

let lastScrollYNavTest = window.scrollY;
let ticking = false;

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {

      const currentScroll = window.scrollY;

      // kleine Toleranz, damit es nicht flackert
      if (Math.abs(currentScroll - lastScrollY) > 5) {

        if (currentScroll > lastScrollY && currentScroll > 80) {
          // nach unten
          navBarNavTest.classList.add("is-hidden");
        } else {
          // nach oben
          navBarNavTest.classList.remove("is-hidden");
        }

        lastScrollY = currentScroll;
      }

      ticking = false;
    });

    ticking = true;
  }
});
*/






// Diesen Code in die chrome Console einfügen, um zu sehen, welche html/css-Elemente auf meiner Seite überlaufen
/*
[...document.querySelectorAll("*")]
  .map(e => ({
    el: e,
    sw: e.scrollWidth,
    cw: e.clientWidth
  }))
  .filter(o => o.sw > o.cw)
  .sort((a, b) => (b.sw - b.cw) - (a.sw - a.cw))
  .forEach(o => {
    console.log(
      o.el,
      "→ overflow:",
      o.sw - o.cw,
      "px (scrollWidth:",
      o.sw,
      "clientWidth:",
      o.cw,
      ")"
    );
  });
  */
