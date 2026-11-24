/* ==========================================
   NEW PRATIBHA DIGITAL STUDIO
   UNIVERSAL GALLERY SYSTEM
   PJAX COMPATIBLE
========================================== */

(function () {

    let currentImages = [];
    let currentIndex = 0;

    let galleryInitialized = false;


    /* ======================================
       RENDER GALLERY
    ====================================== */

    function renderGallery(filter = "all") {

        const galleryGrid = document.querySelector(".gallery-grid");

        if (!galleryGrid || !Array.isArray(window.galleryData)) {
            console.warn("Gallery grid or gallery data missing.");
            return;
        }

        galleryGrid.innerHTML = "";

        const safeFilter = filter || "all";

        const filtered = window.galleryData.filter(item =>
            safeFilter === "all" || item.category === safeFilter
        );

        currentImages = [];

        filtered.forEach((item, index) => {

            currentImages.push(item.image);

            const div = document.createElement("div");
            div.className = "gallery-item";
            div.dataset.index = index;

            const img = document.createElement("img");

            img.src = item.image;
            img.alt = item.category || "Studio Gallery";

            img.loading = "lazy";
            img.decoding = "async";
            img.draggable = false;

            img.setAttribute("fetchpriority", "low");

            img.onerror = function () {
                this.src = "../../assets/no-image.jpg";
            };

            div.appendChild(img);
            galleryGrid.appendChild(div);

        });

    }


    /* ======================================
       LIGHTBOX OPEN
    ====================================== */

    function openLightbox() {

        const lightbox = document.getElementById("gallery-lightbox");

        if (!lightbox || !currentImages.length) return;

        lightbox.classList.add("active");

        lightbox.innerHTML = `
            <span class="close-btn">&times;</span>

            <span class="prev-btn">&#10094;</span>

            <img
                src="${currentImages[currentIndex]}"
                alt=""
                loading="eager"
                decoding="async"
                draggable="false">

            <span class="next-btn">&#10095;</span>
        `;

        lightbox.querySelector(".close-btn").onclick = closeLightbox;
        lightbox.querySelector(".prev-btn").onclick = prevImage;
        lightbox.querySelector(".next-btn").onclick = nextImage;

    }


    /* ======================================
       LIGHTBOX CLOSE
    ====================================== */

    function closeLightbox() {

        const lightbox = document.getElementById("gallery-lightbox");

        if (!lightbox) return;

        lightbox.classList.remove("active");

    }


    /* ======================================
       NEXT IMAGE
    ====================================== */

    function nextImage() {

        if (!currentImages.length) return;

        currentIndex = (currentIndex + 1) % currentImages.length;

        updateLightbox();

    }


    /* ======================================
       PREVIOUS IMAGE
    ====================================== */

    function prevImage() {

        if (!currentImages.length) return;

        currentIndex =
            (currentIndex - 1 + currentImages.length) % currentImages.length;

        updateLightbox();

    }


    /* ======================================
       UPDATE LIGHTBOX IMAGE
    ====================================== */

    function updateLightbox() {

        const lightbox = document.getElementById("gallery-lightbox");

        if (!lightbox) return;

        const image = lightbox.querySelector("img");

        if (!image) return;

        image.style.opacity = "0";

        setTimeout(() => {

            image.src = currentImages[currentIndex];

            image.onload = function () {
                image.style.opacity = "1";
            };

        }, 120);

    }


    /* ======================================
       INITIALIZE GALLERY
    ====================================== */

    function initServiceGallery() {

        const galleryGrid = document.querySelector(".gallery-grid");

        if (!galleryGrid) return;

        if (!Array.isArray(window.galleryData)) {
            console.warn("Gallery data not available.");
            return;
        }

        currentImages = [];
        currentIndex = 0;

        renderGallery("all");

    }


    /* ======================================
       GLOBAL CLICK HANDLER
       Attached ONLY ONCE
    ====================================== */

    if (!galleryInitialized) {

        document.addEventListener("click", function (e) {

            /* Gallery Image Click */

            const item = e.target.closest(".gallery-item");

            if (item) {

                const index = Number(item.dataset.index);

                if (Number.isNaN(index)) return;

                currentIndex = index;

                openLightbox();

                return;

            }


            /* Category Filter Click */

            const button = e.target.closest(".category-btn");

            if (button) {

                const buttons = document.querySelectorAll(".category-btn");

                buttons.forEach(btn => {
                    btn.classList.remove("active");
                });

                button.classList.add("active");

                renderGallery(button.dataset.filter || "all");

            }

        });

        galleryInitialized = true;

    }


    /* ======================================
       PUBLIC INITIALIZATION FUNCTION
    ====================================== */

    window.initServiceGallery = initServiceGallery;


    /* ======================================
       INITIAL PAGE LOAD
    ====================================== */

    if (document.readyState === "loading") {

        document.addEventListener("DOMContentLoaded", initServiceGallery);

    } else {

        initServiceGallery();

    }


})();