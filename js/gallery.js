if (!window.galleryData) {
  console.error("galleryData missing");
}
console.log("galleryData loaded:", galleryData);
const galleryGrid = document.querySelector(".gallery-grid");
const filterButtons = document.querySelectorAll(".category-btn");
const lightbox = document.getElementById("gallery-lightbox");

let currentImages = [];
let currentIndex = 0;

// =====================
// RENDER GALLERY
// =====================
function renderGallery(filter = "all") {

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
    img.alt = item.category;

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
// =====================
// CLICK IMAGE OPEN
// =====================
galleryGrid.addEventListener("click", (e) => {
  const item = e.target.closest(".gallery-item");
  if (!item) return;

  const index = Number(item.dataset.index);
  if (Number.isNaN(index)) return;

  currentIndex = index;
  openLightbox();
});

// =====================
// LIGHTBOX OPEN
// =====================
function openLightbox() {
  if (!currentImages.length) return;

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

// =====================
// LIGHTBOX CONTROLS
// =====================
function closeLightbox() {
  lightbox.classList.remove("active");
}

function nextImage() {
  currentIndex = (currentIndex + 1) % currentImages.length;
  updateLightbox();
}

function prevImage() {
  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
  updateLightbox();
}

function updateLightbox() {
  const image = lightbox.querySelector("img");
  image.style.opacity = "0";

  setTimeout(() => {
    image.src = currentImages[currentIndex];
    image.onload = () => {
      image.style.opacity = "1";
    };
  }, 120);
}

// =====================
// FILTER BUTTONS
// =====================
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderGallery(btn.dataset.filter);
  });
});

// INIT
renderGallery("all");