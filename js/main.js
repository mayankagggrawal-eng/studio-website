/* ===========================================================
   NEW PRATIBHA DIGITAL STUDIO
   MAIN SCRIPT
   PART 1
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
      "../../assets/services/wedding/3.jpg",
    ],
  },

  prewedding: {
    title: "Pre-Wedding Shoot",
    images: [
      "../../assets/services/Pre-Wedding/hero.jpg",
      "../../assets/services/Pre-Wedding/1.jpg",
      "../../assets/services/Pre-Wedding/2.jpg",
      "../../assets/services/Pre-Wedding/3.jpg",
    ],
  },

  events: {
    title: "Event Coverage",
    images: [
      "../../assets/services/Event/hero.jpg",
      "../../assets/services/Event/1.jpg",
      "../../assets/services/Event/2.jpg",
      "../../assets/services/Event/3.jpg",
    ],
  },
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
                loading="lazy">
            `).join("")}

          </div>

      </div>
  `;

  lightbox.style.display = "flex";

  const closeBtn = lightbox.querySelector(".lightbox-close");

  closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
  });

  lightbox.addEventListener("click", (e) => {

    if (e.target === lightbox) {
      lightbox.style.display = "none";
    }

  });

}
/* ===========================================================
   MAIN SCRIPT
   PART 2
=========================================================== */

/* ===============================
   PREMIUM LOADER
================================ */
window.addEventListener("load", () => {

    setTimeout(() => {
        document.getElementById("loader").classList.add("hide");
    }, 3000);

});

/* ===============================
   DOM READY
================================ */

document.addEventListener("DOMContentLoaded", () => {

    const navbar = document.querySelector(".navbar");
    const menu = document.querySelector(".menu-toggle");
    const header = document.querySelector(".header");

    /* Mobile Menu Close */

    document.addEventListener("click", (event) => {

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

    /* Keyboard Support */

    if (menu) {

        menu.addEventListener("keydown", (event) => {

            if (event.key === "Enter" || event.key === " ") {

                event.preventDefault();
                toggleMenu();

            }

        });

    }

    /* Sticky Header */

    if (header) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 50) {
                header.classList.add("sticky");
            } else {
                header.classList.remove("sticky");
            }

        });

    }

    /* Disable Image Drag */

    document.querySelectorAll("img").forEach(img => {
        img.setAttribute("draggable", "false");
    });

});


/* ===============================
   SCROLL REVEAL
================================ */

const revealElements = document.querySelectorAll(

".about, .owner, .services, .why-us, .portfolio, .testimonials, .faq, .booking, .contact, .location-section, .footer"

);

revealElements.forEach(section => {

    section.classList.add("reveal");

});

const revealObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("active");

        }

    });

}, {

    threshold: 0.15

});

revealElements.forEach(section => {

    revealObserver.observe(section);

});


/* ===============================
   PORTFOLIO IMAGE LOAD EFFECT
================================ */

document.querySelectorAll(".portfolio-item img").forEach(img => {

    if (img.complete) {

        img.parentElement.classList.add("loaded");

    } else {

        img.addEventListener("load", () => {

            img.parentElement.classList.add("loaded");

        });

    }

});
/* ===========================================================
   MAIN SCRIPT
   PART 3
=========================================================== */


/* ===============================
   PREMIUM PORTFOLIO SLIDER
================================ */

document.addEventListener("DOMContentLoaded", () => {

    const track = document.querySelector(".portfolio-track");

    if (!track) return;

    let position = 0;
    const speed = 1;
    let paused = false;

    track.addEventListener("mouseenter", () => {
        paused = true;
    });

    track.addEventListener("mouseleave", () => {
        paused = false;
    });

    function animateSlider() {

        if (!paused) {

            position += speed;

            if (position >= track.scrollWidth / 2) {
                position = 0;
            }

            track.style.transform = `translateX(-${position}px)`;
        }

        requestAnimationFrame(animateSlider);

    }

    requestAnimationFrame(animateSlider);

});


/* ===============================
   GALLERY CARD NAVIGATION
================================ */

document.addEventListener("DOMContentLoaded", () => {

    const cards = document.querySelectorAll(".gallery-card");

    cards.forEach(card => {

        card.addEventListener("click", () => {

            const target = card.dataset.category;

            if (!target) return;

            const section = document.getElementById(target);

            if (!section) {

                console.warn(`Section "${target}" not found.`);
                return;

            }

            section.scrollIntoView({

                behavior: "smooth",
                block: "start"

            });

        });

    });

});


/* ===============================
   END OF FILE
================================ */




/* ===============================
   BASIC COPY PROTECTION
================================ */

document.addEventListener("copy", (e) => {
    e.preventDefault();
});

document.addEventListener("cut", (e) => {
    e.preventDefault();
});

document.addEventListener("selectstart", (e) => {
    e.preventDefault();
});

document.addEventListener("contextmenu", (e) => {
    if (e.target.closest("img")) {
        e.preventDefault();
    }
});

document.addEventListener("dragstart", (e) => {
    if (e.target.closest("img")) {
        e.preventDefault();
    }
});

document.addEventListener("keydown", (e) => {

    // Ctrl+C
    if (e.ctrlKey && e.key.toLowerCase() === "c") {
        e.preventDefault();
    }

    // Ctrl+X
    if (e.ctrlKey && e.key.toLowerCase() === "x") {
        e.preventDefault();
    }

    // Ctrl+A
    if (e.ctrlKey && e.key.toLowerCase() === "a") {
        e.preventDefault();
    }

    // Ctrl+S
    if (e.ctrlKey && e.key.toLowerCase() === "s") {
        e.preventDefault();
    }

});

/* ===========================================
   GLOBAL IMAGE PROTECTION
   =========================================== */

// Disable right click on entire website
document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
});

// Disable image drag
document.addEventListener("dragstart", function (e) {
    if (e.target.closest("img")) {
        e.preventDefault();
    }
});

// Disable Save (Ctrl+S)
document.addEventListener("keydown", function (e) {

    const key = e.key.toLowerCase();

    if (e.ctrlKey && key === "s") {
        e.preventDefault();
        return false;
    }

});

// Disable image selection
document.addEventListener("selectstart", function (e) {
    if (e.target.closest("img")) {
        e.preventDefault();
    }
});

// Disable image mouse down
document.addEventListener("mousedown", function (e) {
    if (e.target.closest("img")) {
        e.preventDefault();
    }
});

// Make every image non-draggable
window.addEventListener("load", function () {

    document.querySelectorAll("img").forEach(function (img) {

        img.setAttribute("draggable", "false");
        img.setAttribute("oncontextmenu", "return false");
        img.style.userSelect = "none";
        img.style.webkitUserDrag = "none";
        img.style.webkitUserSelect = "none";

    });

});