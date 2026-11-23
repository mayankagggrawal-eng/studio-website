/* =================================
   NEW PRATIBHA DIGITAL STUDIO
   PREMIUM BACKGROUND MUSIC PLAYER
================================= */

document.addEventListener("DOMContentLoaded", function () {

    const button = document.getElementById("musicToggle");

    if (!button) return;

    let music = null;
    let isPlaying = false;

    button.addEventListener("click", async function () {

        if (!music) {

            music = new Audio(
                "/assets/music/studio instrumental.mpeg"
            );

            music.loop = true;
            music.volume = 0.20;
            music.preload = "none";

        }

        if (!isPlaying) {

            try {

                await music.play();

                isPlaying = true;

                button.classList.add("is-playing");

                button.querySelector(".music-label").textContent =
                    "Music On";

                button.setAttribute("aria-pressed", "true");

                button.setAttribute(
                    "aria-label",
                    "Pause background music"
                );

            }

            catch (error) {

                console.error("Music playback error:", error);

                button.querySelector(".music-label").textContent =
                    "Try Again";

            }

        }

        else {

            music.pause();

            isPlaying = false;

            button.classList.remove("is-playing");

            button.querySelector(".music-label").textContent =
                "Music Off";

            button.setAttribute("aria-pressed", "false");

            button.setAttribute(
                "aria-label",
                "Play background music"
            );

        }

    });

});ś