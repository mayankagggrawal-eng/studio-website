document.addEventListener("DOMContentLoaded", function () {

    const musicButton = document.getElementById("musicToggle");

    if (!musicButton) return;

    const musicIcon = musicButton.querySelector(".music-icon");
    const musicLabel = musicButton.querySelector(".music-label");

    const STORAGE_KEY = "studioMusicState";
    const TIME_KEY = "studioMusicTime";

    const audio = new Audio("/assets/music/studio-instrumental.mp3");

    audio.loop = true;
    audio.volume = 0.20;
    audio.preload = "auto";

    let isPlaying = false;

    function updateButton(playing) {
        isPlaying = playing;

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
            musicIcon.textContent = playing ? "♫" : "♫";
        }
    }

    async function playMusic() {
        try {
            const savedTime = Number(localStorage.getItem(TIME_KEY)) || 0;

            if (savedTime > 0 && Number.isFinite(savedTime)) {
                audio.currentTime = savedTime;
            }

            await audio.play();

            localStorage.setItem(STORAGE_KEY, "on");
            updateButton(true);

        } catch (error) {
            updateButton(false);
            console.log("Music playback needs user interaction.");
        }
    }

    function stopMusic() {
        audio.pause();

        localStorage.setItem(STORAGE_KEY, "off");
        localStorage.removeItem(TIME_KEY);

        updateButton(false);
    }

    musicButton.addEventListener("click", function () {

        if (isPlaying) {
            stopMusic();
        } else {
            playMusic();
        }

    });

    // Save music position periodically
    audio.addEventListener("timeupdate", function () {
        if (!audio.paused) {
            localStorage.setItem(TIME_KEY, audio.currentTime);
        }
    });

    // Restore previous music state on every page
    const savedState = localStorage.getItem(STORAGE_KEY);

    if (savedState === "on") {
        playMusic();
    } else {
        updateButton(false);
    }

});