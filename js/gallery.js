// ================================
// PROFESSIONAL GALLERY SYSTEM
// ================================

let currentIndex = 0;
let galleryImages = [];

function loadGallery(basePath, total)  {

    galleryImages = [];

    for (let i = 1; i <= total; i++) {
        galleryImages.push(
            `${basePath}/${i}.jpg`
        );
    }

    createGallery();

}

function createGallery() {

    const gallery = document.getElementById("gallery");

    if (!gallery) return;

    gallery.innerHTML = "";

    galleryImages.forEach((image, index) => {

        gallery.innerHTML += `

        <div class="gallery-item">

            <img
                src="${image}"
                onclick="openImage(${index})"
                loading="lazy"
                alt="Wedding Photo">

        </div>

        `;

    });

}// =========================
// LIGHTBOX
// =========================

function openImage(index){

    currentIndex = index;

    const lightbox = document.getElementById("gallery-lightbox");

    lightbox.innerHTML = `

        <span class="close-btn" onclick="closeGallery()">&times;</span>

        <span class="prev-btn" onclick="previousImage()">&#10094;</span>

        <img
        id="lightbox-image"
        src="${galleryImages[currentIndex]}">

        <span class="next-btn" onclick="nextImage()">&#10095;</span>

    `;

    lightbox.classList.add("active");

}

function closeGallery(){

document.getElementById("gallery-lightbox").classList.remove("active");

}

function nextImage(){

currentIndex++;

if(currentIndex>=galleryImages.length){

currentIndex=0;

}

document.getElementById("lightbox-image").src=galleryImages[currentIndex];

}

function previousImage(){

currentIndex--;

if(currentIndex<0){

currentIndex=galleryImages.length-1;

}

document.getElementById("lightbox-image").src=galleryImages[currentIndex];

}