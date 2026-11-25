/* ==========================================
   NEW PRATIBHA DIGITAL STUDIO
   PERSISTENT BACKGROUND MUSIC PLAYER
========================================== */

(function () {

    const STORAGE_KEY = "studioMusicState";
    const TIME_KEY = "studioMusicTime";

    // Create only one audio instance for the entire website session.
    if (!window.studioAudio) {

        window.studioAudio = new Audio(
            "/assets/music/studio%20instrumental.mpeg"
        );

        window.studioAudio.loop = true;
        window.studioAudio.volume = 0.23;
        window.studioAudio.preload = "auto";

    }

    const audio = window.studioAudio;

    function updateMusicButton() {

        const musicButton = document.getElementById("musicToggle");

        if (!musicButton) return;

        const musicIcon = musicButton.querySelector(".music-icon");
        const musicLabel = musicButton.querySelector(".music-label");

        const playing = !audio.paused;

        musicButton.classList.toggle("is-playing", playing);

        musicButton.setAttribute("aria-pressed", String(playing));

        musicButton.setAttribute(
            "aria-label",
            playing ? "Pause background music" : "Play background music"
        );

        if (musicLabel) {
            musicLabel.textContent = playing ? "Music On" : "Music Off";
        }

        if (musicIcon) {
            musicIcon.textContent = "♫";
        }

    }

    async function playMusic() {

        try {

            await audio.play();

            localStorage.setItem(STORAGE_KEY, "on");

            updateMusicButton();

        } catch (error) {

            console.error("Music playback error:", error);

            updateMusicButton();

        }

    }

    function stopMusic() {

        audio.pause();

        localStorage.setItem(STORAGE_KEY, "off");
        localStorage.removeItem(TIME_KEY);

        updateMusicButton();

    }

    // One delegated click listener for the entire website.
    if (!window.studioMusicClickBound) {

        document.addEventListener("click", function (event) {

            const musicButton = event.target.closest("#musicToggle");

            if (!musicButton) return;

            if (audio.paused) {
                playMusic();
            } else {
                stopMusic();
            }

        });

        window.studioMusicClickBound = true;

    }
// Save playback position.
if (!window.studioMusicTimeBound) {

    function saveMusicTime() {

        if (
            localStorage.getItem(STORAGE_KEY) === "on" &&
            Number.isFinite(audio.currentTime) &&
            audio.currentTime > 0
        ) {
            localStorage.setItem(TIME_KEY, audio.currentTime);
        }

    }

    audio.addEventListener("timeupdate", saveMusicTime);

    window.addEventListener("pagehide", saveMusicTime);
    window.addEventListener("beforeunload", saveMusicTime);

    document.addEventListener("visibilitychange", function () {

        if (document.visibilityState === "hidden") {
            saveMusicTime();
        }

    });

    window.studioMusicTimeBound = true;

}

// Update button whenever audio state changes.
audio.addEventListener("play", updateMusicButton);
audio.addEventListener("pause", updateMusicButton);

// Restore previous music state on a fresh page load.
if (!window.studioMusicRestoreStarted) {

    window.studioMusicRestoreStarted = true;

    if (localStorage.getItem(STORAGE_KEY) === "on") {

        const savedTime = Number(localStorage.getItem(TIME_KEY)) || 0;

        audio.addEventListener("loadedmetadata", async function () {

            if (
                savedTime > 0 &&
                Number.isFinite(savedTime) &&
                audio.duration > 0
            ) {
                audio.currentTime = savedTime % audio.duration;
            }

            await playMusic();

        }, { once: true });

        audio.load();

    }

}

// Keep music playing during browser Back / Forward navigation.
window.addEventListener("popstate", function () {

    if (localStorage.getItem(STORAGE_KEY) === "on" && audio.paused) {

        audio.play().then(updateMusicButton).catch(function (error) {
            console.error("Music resume error:", error);
        });

    }

});

// Resume music when the page is restored from browser history.
window.addEventListener("pageshow", function () {

    if (localStorage.getItem(STORAGE_KEY) === "on" && audio.paused) {

        audio.play().then(updateMusicButton).catch(function (error) {
            console.error("Music resume error:", error);
        });

    }

});

updateMusicButton();

})();