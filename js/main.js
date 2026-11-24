/* ===========================================================
   NEW PRATIBHA DIGITAL STUDIO
   MAIN SCRIPT
   PJAX COMPATIBLE VERSION
=========================================================== */


/* ===============================
   GALLERY DATA
================================ */

const galleries = {

    wedding: {
        title: "Wedding Photography",
        images: [
            "../../assets/services/wedding/hero.jpg",
            "../../assets/services/wedding/1.jpg",
            "../../assets/services/wedding/2.jpg",
            "../../assets/services/wedding/3.jpg"
        ]
    },

    prewedding: {
        title: "Pre-Wedding Shoot",
        images: [
            "../../assets/services/Pre-Wedding/hero.jpg",
            "../../assets/services/Pre-Wedding/1.jpg",
            "../../assets/services/Pre-Wedding/2.jpg",
            "../../assets/services/Pre-Wedding/3.jpg"
        ]
    },

    events: {
        title: "Event Coverage",
        images: [
            "../../assets/services/Event/hero.jpg",
            "../../assets/services/Event/1.jpg",
            "../../assets/services/Event/2.jpg",
            "../../assets/services/Event/3.jpg"
        ]
    }

};


/* ===============================
   WHATSAPP BOOKING
================================ */

function sendWhatsApp() {

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const eventType = document.getElementById("event").value;
    const date = document.getElementById("date").value;
    const location = document.getElementById("location").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !phone || !eventType || !date || !location) {
        alert("Please fill all required fields.");
        return;
    }

    const text = encodeURIComponent(
`📸 NEW SHOOT BOOKING

👤 Name: ${name}
📞 Phone: ${phone}
📷 Shoot Type: ${eventType}
📅 Date: ${date}
📍 Location: ${location}
📝 Details: ${message || "N/A"}`
    );

    window.open(
        `https://wa.me/919834532026?text=${text}`,
        "_blank",
        "noopener,noreferrer"
    );

}


/* ===============================
   MOBILE MENU
================================ */

function toggleMenu() {

    const navbar = document.querySelector(".navbar");
    const menu = document.querySelector(".menu-toggle");

    if (!navbar || !menu) return;

    const isOpen = navbar.classList.toggle("active");

    menu.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
    );

}


/* ===============================
   GALLERY LIGHTBOX
================================ */

function openGallery(key) {

    const gallery = galleries[key];
    const lightbox = document.getElementById("gallery-lightbox");

    if (!gallery || !lightbox) return;

    lightbox.innerHTML = `
        <div class="lightbox-content">

            <button
                class="lightbox-close"
                aria-label="Close Gallery">
                &times;
            </button>

            <h3>${gallery.title}</h3>

            <div class="gallery-grid">

                ${gallery.images.map(image => `
                    <img
                        src="${image}"
                        alt="${gallery.title}"
                        loading="lazy"
                        draggable="false"
                        ondragstart="return false"
                        oncontextmenu="return false">
                `).join("")}

            </div>

        </div>
    `;

    lightbox.style.display = "flex";

    const closeBtn = lightbox.querySelector(".lightbox-close");

    closeBtn.addEventListener("click", () => {
        lightbox.style.display = "none";
    });

    lightbox.addEventListener("click", (event) => {

        if (event.target === lightbox) {
            lightbox.style.display = "none";
        }

    });

}


/* ===========================================================
   PJAX PAGE REINITIALIZATION
=========================================================== */

(function () {

    let revealObserver = null;


    /* ===============================
       INITIALIZE PAGE FEATURES
    ================================ */

    window.initMainPageFeatures = function () {


        /* ===============================
           IMAGE DRAG PROTECTION
        ================================ */

        document.querySelectorAll("img").forEach(img => {

            img.draggable = false;
            img.setAttribute("draggable", "false");

        });


        /* ===============================
           SCROLL REVEAL
        ================================ */

        if (!revealObserver) {

            revealObserver = new IntersectionObserver(
                function (entries) {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {
                            entry.target.classList.add("active");
                        }

                    });

                },
                {
                    threshold: 0.15
                }
            );

        }

        const revealElements = document.querySelectorAll(
            ".about, .owner, .services, .why-us, .portfolio, .testimonials, .faq, .booking, .contact, .location-section, .footer"
        );

        revealElements.forEach(section => {

            section.classList.add("reveal");

            if (!section.dataset.pjaxRevealBound) {

                revealObserver.observe(section);

                section.dataset.pjaxRevealBound = "true";

            }

        });


        /* ===============================
           PORTFOLIO IMAGE LOAD EFFECT
        ================================ */

        document.querySelectorAll(".portfolio-item img").forEach(img => {

            if (img.dataset.pjaxImageBound) return;

            if (img.complete) {

                img.parentElement.classList.add("loaded");

            } else {

                img.addEventListener("load", function () {

                    img.parentElement.classList.add("loaded");

                });

            }

            img.dataset.pjaxImageBound = "true";

        });


        /* ===============================
           PREMIUM PORTFOLIO SLIDER
        ================================ */

        const track = document.querySelector(".portfolio-track");

        if (track && !track.dataset.pjaxSliderBound) {

            let position = 0;
            const speed = 1;
            let paused = false;
            let animationFrame;

            track.addEventListener("mouseenter", function () {
                paused = true;
            });

            track.addEventListener("mouseleave", function () {
                paused = false;
            });

            function animateSlider() {

                if (!document.body.contains(track)) {

                    cancelAnimationFrame(animationFrame);
                    return;

                }

                if (!paused) {

                    position += speed;

                    if (position >= track.scrollWidth / 2) {
                        position = 0;
                    }

                    track.style.transform = `translateX(-${position}px)`;

                }

                animationFrame = requestAnimationFrame(animateSlider);

            }

            animationFrame = requestAnimationFrame(animateSlider);

            track.dataset.pjaxSliderBound = "true";

        }

    };


})();


/* ===========================================================
   GLOBAL EVENT HANDLERS
=========================================================== */


/* ===============================
   MOBILE MENU CLOSE
================================ */

document.addEventListener("click", function (event) {

    const navbar = document.querySelector(".navbar");
    const menu = document.querySelector(".menu-toggle");

    if (
        navbar &&
        menu &&
        navbar.classList.contains("active") &&
        !navbar.contains(event.target) &&
        !menu.contains(event.target)
    ) {

        navbar.classList.remove("active");

        menu.setAttribute("aria-expanded", "false");

    }

});


/* ===============================
   MOBILE MENU KEYBOARD SUPPORT
================================ */

document.addEventListener("keydown", function (event) {

    const menu = event.target.closest(".menu-toggle");

    if (!menu) return;

    if (event.key === "Enter" || event.key === " ") {

        event.preventDefault();

        toggleMenu();

    }

});


/* ===============================
   STICKY HEADER
================================ */

window.addEventListener("scroll", function () {

    const header = document.querySelector(".header");

    if (!header) return;

    if (window.scrollY > 50) {

        header.classList.add("sticky");

    } else {

        header.classList.remove("sticky");

    }

});


/* ===============================
   GALLERY CARD NAVIGATION
   SINGLE GLOBAL HANDLER
================================ */

document.addEventListener("click", function (event) {

    const card = event.target.closest(".gallery-card");

    if (!card) return;

    const target = card.dataset.category;

    let page = "";

    switch (target) {

        case "wedding":
            page = "wedding.html";
            break;

        case "prewedding":
            page = "prewedding.html";
            break;

        case "events":
            page = "events.html";
            break;

        case "album":
            page = "album.html";
            break;

    }

    if (!page) return;

    if (typeof window.navigateToPage === "function") {

        window.navigateToPage(page);

    } else {

        window.location.href = page;

    }

});


/* ===============================
   PREMIUM LOADER
================================ */

window.addEventListener("load", function () {

    setTimeout(function () {

        const loader = document.getElementById("loader");

        if (loader) {
            loader.classList.add("hide");
        }

    }, 3000);

});


/* ===============================
   CONTENT PROTECTION
================================ */

(function () {


    // Disable Right Click

    document.addEventListener("contextmenu", function (event) {
        event.preventDefault();
    });


    // Disable Drag

    document.addEventListener("dragstart", function (event) {
        event.preventDefault();
    });


    // Disable Drop

    document.addEventListener("drop", function (event) {
        event.preventDefault();
    });


    // Disable Copy

    document.addEventListener("copy", function (event) {
        event.preventDefault();
    });


    // Disable Cut

    document.addEventListener("cut", function (event) {
        event.preventDefault();
    });


    // Disable Selection

    document.addEventListener("selectstart", function (event) {
        event.preventDefault();
    });


    // Disable Keyboard Shortcuts

    document.addEventListener("keydown", function (event) {

        const key = event.key.toLowerCase();

        if (
            event.ctrlKey &&
            ["a", "c", "x", "s", "u", "p"].includes(key)
        ) {
            event.preventDefault();
        }

        if (key === "f12") {
            event.preventDefault();
        }

    });


})();


/* ===============================
   INITIAL PAGE SETUP
================================ */

if (document.readyState === "loading") {

    document.addEventListener(
        "DOMContentLoaded",
        function () {

            window.initMainPageFeatures();

        },
        { once: true }
    );

} else {

    window.initMainPageFeatures();

}


/* ===========================================================
   END OF MAIN SCRIPT
=========================================================== */