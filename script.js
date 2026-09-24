/* ================= ELEMENT ================= */

const pages = document.querySelectorAll(".page");

const openBtn = document.getElementById("openBtn");

const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");

const toast = document.getElementById("toast");

const restartBtn = document.getElementById("restartBtn");

let currentPage = 0;


/* ================= PAGE SYSTEM ================= */

function showPage(index) {

    if (index < 0) {
        index = 0;
    }

    if (index >= pages.length) {
        index = pages.length - 1;
    }

    pages.forEach((page, i) => {

        page.classList.toggle(
            "active",
            i === index
        );

    });

    currentPage = index;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* ================= OPEN ================= */

openBtn.addEventListener("click", () => {

    showPage(1);

    startMusic();

    createHearts(12);

});


/* ================= NEXT BUTTON ================= */

const nextButtons = document.querySelectorAll(".next-btn");

nextButtons.forEach(button => {

    button.addEventListener("click", () => {

        showPage(currentPage + 1);

        createHearts(8);

    });

});


/* ================= MUSIC ================= */

function startMusic() {

    music.play()
        .then(() => {

            musicBtn.innerHTML = "♫";

        })
        .catch(() => {

            showToast(
                "Tap tombol musik untuk memulai 🎵"
            );

        });

}


musicBtn.addEventListener("click", () => {

    if (music.paused) {

        music.play();

        musicBtn.innerHTML = "♫";

        showToast("Musik dinyalakan ♫");

    } else {

        music.pause();

        musicBtn.innerHTML = "🔇";

        showToast("Musik dimatikan");

    }

});


/* ================= TOAST ================= */

function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}


/* ================= HEARTS ================= */

function createHearts(amount = 10) {

    const container = document.querySelector(".hearts");

    for (let i = 0; i < amount; i++) {

        const heart = document.createElement("div");

        heart.className = "heart";

        heart.innerHTML =
            Math.random() > 0.5 ? "♥" : "♡";

        heart.style.left =
            Math.random() * 100 + "%";

        heart.style.fontSize =
            (10 + Math.random() * 20) + "px";

        heart.style.animationDuration =
            (5 + Math.random() * 6) + "s";

        heart.style.animationDelay =
            Math.random() * 2 + "s";

        container.appendChild(heart);


        setTimeout(() => {

            heart.remove();

        }, 12000);

    }

}


/* ================= RANDOM HEARTS ================= */

setInterval(() => {

    if (currentPage !== 0) {

        createHearts(1);

    }

}, 2500);


/* ================= RESTART ================= */

restartBtn.addEventListener("click", () => {

    showPage(0);

    music.pause();

    music.currentTime = 0;

    musicBtn.innerHTML = "♫";

});


/* ================= KEYBOARD ================= */

document.addEventListener("keydown", (event) => {

    if (event.key === "ArrowRight") {

        showPage(currentPage + 1);

    }

    if (event.key === "ArrowLeft") {

        showPage(currentPage - 1);

    }

});


/* ================= START ================= */

showPage(0);