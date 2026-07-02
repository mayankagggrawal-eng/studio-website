/* Language Switch */

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  const languageBox = document.querySelector(".language-box");

  languageBox.classList.remove("show");

  setTimeout(() => {
    loader.classList.add("hide");
    languageBox.classList.add("show");
  }, 3000);
});

function changeLanguage(lang) {
  const routes = {
    en: "pages/en/home.html",
    hi: "pages/hi/home.html",
    mr: "pages/mr/home.html",
  };

  if (routes[lang]) {
    window.location.href = routes[lang];
  }
}