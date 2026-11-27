/* ==========================================
   NEW PRATIBHA DIGITAL STUDIO
   PERSISTENT BACKGROUND MUSIC PLAYER
   POSITION MEMORY + PJAX SUPPORT
========================================== */

(function () {

    const STORAGE_KEY = "studioMusicState";
    const TIME_KEY = "studioMusicTime";

    // Prevent duplicate initialization.
    if (window.studioMusicControllerInitialized) {
        return;
    }

    window.studioMusicControllerInitialized = true;


    /* ==========================================
       SINGLE AUDIO INSTANCE
    ========================================== */

    if (!window.studioAudio) {

        window.studioAudio = new Audio(
            "/assets/music/studio%20instrumental.mpeg"
        );

        window.studioAudio.loop = true;
        window.studioAudio.volume = 0.12;
        window.studioAudio.preload = "auto";

    }

    const audio = window.studioAudio;


    /* ==========================================
       SAVE EXACT PLAYBACK POSITION
    ========================================== */

    function saveMusicTime() {

        if (
            Number.isFinite(audio.currentTime) &&
            audio.currentTime > 0
        ) {

            localStorage.setItem(
                TIME_KEY,
                String(audio.currentTime)
            );

        }

    }


    /* ==========================================
       RESTORE PREVIOUS PLAYBACK POSITION
    ========================================== */

    async function restoreMusicTime() {

        if (audio.readyState < 1) {

            await new Promise(resolve => {

                audio.addEventListener(
                    "loadedmetadata",
                    resolve,
                    { once: true }
                );

            });

        }

        const savedTime =
            Number(localStorage.getItem(TIME_KEY)) || 0;

        if (
            savedTime > 0 &&
            Number.isFinite(audio.duration) &&
            audio.duration > 0
        ) {

            audio.currentTime =
                savedTime % audio.duration;

        }

    }


    /* ==========================================
       UPDATE MUSIC BUTTON
    ========================================== */

    function updateMusicButton() {

        const button =
            document.getElementById("musicToggle");

        if (!button) return;

        const playing = !audio.paused;

        const label =
            button.querySelector(".music-label");

        const icon =
            button.querySelector(".music-icon");

        button.classList.toggle(
            "is-playing",
            playing
        );

        button.setAttribute(
            "aria-pressed",
            String(playing)
        );

        button.setAttribute(
            "aria-label",
            playing
                ? "Pause background music"
                : "Play background music"
        );

        if (label) {

            label.textContent =
                playing ? "Music On" : "Music Off";

        }

        if (icon) {
            icon.textContent = "♫";
        }

    }


    /* ==========================================
       PLAY MUSIC
    ========================================== */

    async function playMusic() {

        try {

            // Restore saved position before playing
            // if this is a newly created audio instance.

            if (audio.currentTime === 0) {
                await restoreMusicTime();
            }

            await audio.play();

            localStorage.setItem(
                STORAGE_KEY,
                "on"
            );

            updateMusicButton();

        } catch (error) {

            console.error(
                "Music playback error:",
                error
            );

            updateMusicButton();

        }

    }


    /* ==========================================
       STOP MUSIC WITHOUT DELETING POSITION
    ========================================== */

    function stopMusic() {

        // Save position BEFORE pausing.

        saveMusicTime();

        audio.pause();

        // Do not reset currentTime.
        // Do not delete TIME_KEY.

        localStorage.setItem(
            STORAGE_KEY,
            "off"
        );

        updateMusicButton();

    }


    /* ==========================================
       MUSIC BUTTON CLICK
    ========================================== */

    document.addEventListener("click", function (event) {

        const button =
            event.target.closest("#musicToggle");

        if (!button) return;

        if (audio.paused) {

            playMusic();

        } else {

            stopMusic();

        }

    });


    /* ==========================================
       CONTINUOUS POSITION SAVING
    ========================================== */

    audio.addEventListener(
        "timeupdate",
        saveMusicTime
    );

    audio.addEventListener(
        "pause",
        saveMusicTime
    );

    window.addEventListener(
        "pagehide",
        saveMusicTime
    );

    window.addEventListener(
        "beforeunload",
        saveMusicTime
    );

    document.addEventListener(
        "visibilitychange",
        function () {

            if (
                document.visibilityState === "hidden"
            ) {

                saveMusicTime();

            }

        }
    );


    /* ==========================================
       AUDIO STATE EVENTS
    ========================================== */

    audio.addEventListener(
        "play",
        updateMusicButton
    );

    audio.addEventListener(
        "pause",
        updateMusicButton
    );


    /* ==========================================
       RESTORE BUTTON STATE ON PAGE LOAD
    ========================================== */

    if (
        localStorage.getItem(STORAGE_KEY) === "on"
    ) {

        // Restore position and attempt playback.
        // Browser autoplay restrictions may block this.

        playMusic();

    } else {

        updateMusicButton();

    }


    /* ==========================================
       PJAX NAVIGATION SUPPORT
    ========================================== */

    window.addEventListener(
        "popstate",
        function () {

            updateMusicButton();

        }
    );

    window.addEventListener(
        "pageshow",
        function () {

            updateMusicButton();

        }
    );

})();