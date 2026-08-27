//const navbar = document.getElementById('navBar');


if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}



function removeDNone(param1, param2) {
    document.getElementById(param1).classList[param2]('d-none');
}

/*
// Nav-Bar dunkler machen wenn gescrollt wurde
window.addEventListener("scroll", () => {
    if (window.scrollY > 10) {
        navbar.classList.add("scrolled");
      //  navBarServices.classList.add('scrolled');
    } else {
        navbar.classList.remove("scrolled");
     //  navBarServices.classList.remove('scrolled');
    }
}); */

let activeNav = null;
let lastState = null;
let ticking = false;

function resolveActiveNav() {
    if (activeNav) return;

    activeNav =
        document.getElementById("navBar") ||
        document.getElementById("navBarServices");
}

window.addEventListener("scroll", () => {

    if (ticking) return;

    ticking = true;

    requestAnimationFrame(() => {

        resolveActiveNav();
        if (!activeNav) {
            ticking = false;
            return;
        }

        const shouldBeScrolled = window.scrollY > 10;

        if (shouldBeScrolled !== lastState) {
            activeNav.classList.toggle("scrolled", shouldBeScrolled);
            lastState = shouldBeScrolled;
        }

        ticking = false;
    });

}, { passive: true });

/*
window.addEventListener("scroll", () => {

    const navBar = document.getElementById("navBar");
    const navBarServices = document.getElementById("navBarServices");

    const activeNav = navBar || navBarServices;
    if (!activeNav) return;

    if (window.scrollY > 10) {
        activeNav.classList.add("scrolled");
    } else {
        activeNav.classList.remove("scrolled");
    }
}); */ 


/*
// Nav-Bar dunkler machen wenn gescrollt wurde
window.addEventListener("scroll", () => {
    const navbar = document.getElementById('navBar');
    const navBarServices = document.getElementById('navBarServices');

    if (window.scrollY > 10) {
        if (navbar) {
            navbar.classList.add("scrolled");
            console.log('desktopScrolled');
        } if (navBarServices) {
            navBarServices.classList.add('scrolled');
            console.log('mobileScrolled');

        }


    } else {
        if (navbar) {
            navbar.classList.remove("scrolled");
        } if (navBarServices) {
            navBarServices.classList.remove('scrolled');
        }
    }
}); */ 





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











window.addEventListener("load", () => {

    const navEntry = performance.getEntriesByType("navigation")[0];

    // 👉 Reload: NICHT zum Hash springen
    if (navEntry && navEntry.type === "reload") {
        window.scrollTo(0, 0);
        return;
    }

    // Nur bei echter Navigation (Link-Klick)
    if (!navEntry || navEntry.type !== "navigate") return;

    const section = window.location.hash.substring(1);
    if (!section) return;

    const scrollToTarget = () => {
        const target = document.getElementById(section);
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
            return true;
        }
        return false;
    };

    let attempts = 0;
    const interval = setInterval(() => {
        if (scrollToTarget() || attempts > 40) {
            clearInterval(interval);
        }
        attempts++;
    }, 50);
});




/*
window.addEventListener("load", () => {

    const navEntry = performance.getEntriesByType("navigation")[0];

    // Nur bei echter Navigation (Link-Klick), nicht bei Reload
    if (!navEntry || navEntry.type !== "navigate") return;

    const section = window.location.hash.substring(1);
    if (!section) return;

    const scrollToTarget = () => {
        const target = document.getElementById(section);
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
            return true;
        }
        return false;
    };

    let attempts = 0;
    const interval = setInterval(() => {
        if (scrollToTarget() || attempts > 40) {
            clearInterval(interval);
        }
        attempts++;
    }, 50);

});*/

/*
window.addEventListener("load", () => {
  // Entweder aus Hash oder Query-Parameter
  const params = new URLSearchParams(window.location.search);
  const section = params.get("scroll") || window.location.hash.substring(1);

  if (section) {
    const scrollToTarget = () => {
      const target = document.getElementById(section);
      if (target) {
        // Smooth scroll
        target.scrollIntoView({ behavior: "smooth" });
        return true; // fertig
      }
      return false; // noch nicht da
    };

    // Prüfe alle 50ms, bis das Element existiert oder 2 Sekunden vorbei sind
    let attempts = 0;
    const interval = setInterval(() => {
      if (scrollToTarget() || attempts > 40) { // 40 * 50ms = 2s
        clearInterval(interval);
      }
      attempts++;
    }, 50);
  }
});*/


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


/* [...document.querySelectorAll("*")]
  .map(e => ({
    el: e,
    sw: e.scrollWidth,
    cw: e.clientWidth
  }))
  .filter(o => o.sw > o.cw)
  .sort((a, b) => b.sw - a.sw)
  .slice(0, 10) */

