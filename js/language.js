/* Language switch — used on index.html only */

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
