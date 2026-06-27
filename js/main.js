/* Main site logic — used on home pages */

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

function sendWhatsApp() {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const eventType = document.getElementById("event").value;
  const date = document.getElementById("date").value;
  const location = document.getElementById("location").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !phone || !eventType || !date || !location) {
    alert("Please fill all required fields");
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

function toggleMenu() {
  const navbar = document.querySelector(".navbar");
  const menu = document.querySelector(".menu-toggle");

  if (!navbar || !menu) {
    return;
  }

  const isOpen = navbar.classList.toggle("active");
  menu.setAttribute("aria-expanded", isOpen ? "true" : "false");
}

function openGallery(key) {
  const gallery = galleries[key];
  const lightbox = document.getElementById("gallery-lightbox");

  if (!gallery || !lightbox) {
    return;
  }

  lightbox.innerHTML = `
    <div class="lightbox-content">
      <button type="button" class="lightbox-close" aria-label="Close gallery">&times;</button>
      <h3>${gallery.title}</h3>
      <div class="gallery-grid">
        ${gallery.images
          .map(
            (src) =>
              `<img src="${src}" alt="${gallery.title}" loading="lazy">`
          )
          .join("")}
      </div>
    </div>
  `;

  lightbox.style.display = "flex";

  lightbox.querySelector(".lightbox-close").addEventListener("click", () => {
    lightbox.style.display = "none";
  });

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      lightbox.style.display = "none";
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  const menu = document.querySelector(".menu-toggle");
  const header = document.querySelector(".header");

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

  if (menu) {
    menu.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleMenu();
      }
    });
  }

  if (header) {
    window.addEventListener("scroll", () => {
      header.classList.toggle("sticky", window.scrollY > 50);
    });
  }

  document.querySelectorAll("img").forEach((img) => {
    img.setAttribute("draggable", "false");
  });
});
/* Premium Loader */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    const minimumTime = 1200; // 1.2 seconds

    setTimeout(() => {

        loader.classList.add("hide");

    }, minimumTime);

});/* Sticky Header */

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if(window.scrollY > 80){
        header.classList.add("sticky");
    }else{
        header.classList.remove("sticky");
    }

});
/* ==========================
   Scroll Reveal
========================== */

const revealElements = document.querySelectorAll(
".about, .owner, .services, .why-us, .portfolio, .testimonials, .faq, .booking, .contact, .location-section, .footer"
);

revealElements.forEach(el => {
    el.classList.add("reveal");
});

const revealObserver = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("active");

        }

    });

},{
    threshold:0.15
});

revealElements.forEach(el=>{
    revealObserver.observe(el);
});
/* ===============================
   Portfolio Image Load Animation
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
/* ===============================
   Premium Infinite Portfolio Slider
================================ */

document.addEventListener("DOMContentLoaded", () => {

    const track = document.querySelector(".portfolio-track");

    if (!track) return;

    let position = 0;
    const speed = 1; // Speed (1 - 2)

    function animate() {

        position += speed;

        if (position >= track.scrollWidth / 2) {
            position = 0;
        }

        track.style.transform = `translateX(-${position}px)`;

        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);

});
let paused = false;

track.addEventListener("mouseenter", () => paused = true);
track.addEventListener("mouseleave", () => paused = false);

function animate(){

    if(!paused){

        position += speed;

        if(position >= track.scrollWidth / 2){
            position = 0;
        }

        track.style.transform = `translateX(-${position}px)`;
    }

    requestAnimationFrame(animate);

}