/* ==========================================
   NEW PRATIBHA DIGITAL STUDIO
   PJAX NAVIGATION SYSTEM
   ENGLISH WEBSITE
========================================== */

(function () {

    if (window.studioNavigationInitialized) return;

    window.studioNavigationInitialized = true;

    let navigationInProgress = false;

    // Track the page currently displayed.
    let currentPageURL = new URL(window.location.href);

    // Browser scroll will be handled by this system.
    history.scrollRestoration = "manual";


    /* ==========================================
       LOAD PAGE DATA SCRIPT
    ========================================== */

    function loadScript(src) {

        return new Promise((resolve, reject) => {

            const script = document.createElement("script");

            script.src = src;
            script.async = false;

            script.onload = resolve;

            script.onerror = function () {

                reject(
                    new Error("Script failed to load: " + src)
                );

            };

            document.body.appendChild(script);

        });

    }


    /* ==========================================
       UPDATE PAGE HEAD INFORMATION
    ========================================== */

    function updatePageHead(newDocument) {

        document.title = newDocument.title;

        document.documentElement.lang =
            newDocument.documentElement.lang || "en";


        // Update canonical URL.

        const newCanonical = newDocument.querySelector(
            'link[rel="canonical"]'
        );

        let currentCanonical = document.querySelector(
            'link[rel="canonical"]'
        );

        if (newCanonical) {

            if (!currentCanonical) {

                currentCanonical = document.createElement("link");

                currentCanonical.rel = "canonical";

                document.head.appendChild(currentCanonical);

            }

            currentCanonical.href = newCanonical.href;

        } else if (currentCanonical) {

            currentCanonical.remove();

        }


        // Update meta description.

        const newDescription = newDocument.querySelector(
            'meta[name="description"]'
        );

        let currentDescription = document.querySelector(
            'meta[name="description"]'
        );

        if (newDescription) {

            if (!currentDescription) {

                currentDescription = document.createElement("meta");

                currentDescription.name = "description";

                document.head.appendChild(currentDescription);

            }

            currentDescription.content =
                newDescription.content;

        }

    }


    /* ==========================================
       LOAD DESTINATION PAGE DATA
    ========================================== */

    async function loadPageData(newDocument, targetURL) {

        // Clear previous gallery data.

        window.galleryData = undefined;


        const dataScripts = Array.from(
            newDocument.querySelectorAll("script[src]")
        ).filter(script => {

            const src = script.getAttribute("src") || "";

            return (
                src.includes("weddingData.js") ||
                src.includes("prewedding.js") ||
                src.includes("eventsData.js") ||
                src.includes("album.js")
            );

        });


        // Load destination page data.

        for (const oldScript of dataScripts) {

            const scriptURL = new URL(
                oldScript.getAttribute("src"),
                targetURL.href
            ).href;

            await loadScript(scriptURL);

        }


        // Load gallery.js if not already available.

        if (typeof window.initServiceGallery !== "function") {

            const galleryScriptURL = new URL(
                "../../js/gallery.js",
                targetURL.href
            ).href;

            await loadScript(galleryScriptURL);

        }

    }


    /* ==========================================
       NAVIGATE TO PAGE
    ========================================== */

    async function navigateToPage(
        url,
        addHistory = true,
        forceNavigation = false
    ) {

        if (navigationInProgress) return;


        const targetURL = new URL(
            url,
            window.location.href
        );

// English, Hindi and Marathi pages use PJAX.

const supportedLanguagePage =
    /^\/(en|hi|mr)(\/|$)/i.test(targetURL.pathname);

if (
    targetURL.origin !== window.location.origin ||
    !supportedLanguagePage
) {
    window.location.href = targetURL.href;
    return;
}


        // Handle same-page navigation.

        if (
            targetURL.pathname === currentPageURL.pathname &&
            targetURL.search === currentPageURL.search
        ) {

            if (targetURL.hash !== currentPageURL.hash) {

                currentPageURL = targetURL;

                if (targetURL.hash) {

                    document.querySelector(targetURL.hash)
                        ?.scrollIntoView();

                } else {

                    window.scrollTo(0, 0);

                }

            } else if (!forceNavigation) {

                return;

            }

        }


        navigationInProgress = true;


        try {

            // Fetch destination page.

            const response = await fetch(targetURL.href);

            if (!response.ok) {

                throw new Error(
                    "Page could not be loaded: " + response.status
                );

            }


            const html = await response.text();


            const newDocument = new DOMParser().parseFromString(
                html,
                "text/html"
            );


            // Preserve the existing music button.

            const currentMusicButton =
                document.getElementById("musicToggle");

            const incomingMusicButton =
                newDocument.getElementById("musicToggle");


            // Remove incoming music button from new document.

            if (incomingMusicButton) {
                incomingMusicButton.remove();
            }


            // Replace page body content.

            const newBodyElements = Array.from(
                newDocument.body.children
            ).filter(element => {

                return element.tagName !== "SCRIPT";

            });


            document.body.replaceChildren(
                ...newBodyElements
            );


            // Restore existing music button.

            const musicButton =
                currentMusicButton || incomingMusicButton;

            if (musicButton) {

                document.body.appendChild(musicButton);

            }


            // Update page title and metadata.

            updatePageHead(newDocument);


            // Load destination page scripts.

            await loadPageData(
                newDocument,
                targetURL
            );


            // Initialize destination gallery.

            if (
                typeof window.initServiceGallery === "function"
            ) {

                window.initServiceGallery();

            }


            // Initialize destination page features.

            if (
                typeof window.initMainPageFeatures === "function"
            ) {

                window.initMainPageFeatures();

            }


            // Update browser history.

            if (addHistory) {

                // Save current page scroll position.

                history.replaceState(
                    {
                        ...history.state,
                        scrollY: window.scrollY
                    },
                    "",
                    window.location.href
                );


                // Add destination page to history.

                history.pushState(
                    {
                        scrollY: 0
                    },
                    "",
                    targetURL.href
                );

            }


            // Track currently displayed page.

            currentPageURL = targetURL;


            // Handle scrolling.

            if (targetURL.hash) {

                setTimeout(() => {

                    document.querySelector(targetURL.hash)
                        ?.scrollIntoView();

                }, 100);

            } else if (!addHistory) {

                // Restore previous scroll position on Back/Forward.

                window.scrollTo(
                    0,
                    history.state?.scrollY || 0
                );

            } else {

                window.scrollTo(0, 0);

            }


        } catch (error) {

            console.error(
                "PJAX Navigation Error:",
                error
            );

            // Fallback to normal page navigation.

            window.location.href = targetURL.href;


        } finally {

            navigationInProgress = false;

        }

    }


    // Make navigation available to main.js.

    window.navigateToPage = navigateToPage;


    /* ==========================================
       INTERCEPT INTERNAL ENGLISH PAGE LINKS
    ========================================== */

    document.addEventListener("click", function (event) {

        if (!(event.target instanceof Element)) return;


        const link = event.target.closest("a[href]");

        if (!link) return;


        if (
            event.defaultPrevented ||
            event.button !== 0 ||
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey ||
            event.metaKey ||
            link.target === "_blank" ||
            link.hasAttribute("download")
        ) {

            return;

        }


        const targetURL = new URL(
            link.href,
            window.location.href
        );


   const supportedLanguagePage =
    /^\/(en|hi|mr)(\/|$)/i.test(targetURL.pathname);

if (
    targetURL.origin !== window.location.origin ||
    !supportedLanguagePage
) {
    return;
}


        // Let same-page anchor links work normally.

        if (
            targetURL.pathname === currentPageURL.pathname &&
            targetURL.search === currentPageURL.search &&
            targetURL.hash
        ) {

            return;

        }


        event.preventDefault();


        navigateToPage(targetURL.href);

    });


    /* ==========================================
       BROWSER BACK AND FORWARD SUPPORT
    ========================================== */

    window.addEventListener("popstate", function () {

        navigateToPage(
            window.location.href,
            false,
            true
        );

    });


})();