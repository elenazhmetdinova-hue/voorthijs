const screen1 = document.getElementById("screen1");
const screen2 = document.getElementById("screen2");
const screen3 = document.getElementById("screen3");

const buttonArea = document.getElementById("buttonArea");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

const goNoteBtn = document.getElementById("goNoteBtn");
const backBtn = document.getElementById("backBtn");

let yesScale = 1;

// Screen switching helper
function showScreen(n) {
  screen1.classList.toggle("hidden", n !== 1);
  screen2.classList.toggle("hidden", n !== 2);
  screen3.classList.toggle("hidden", n !== 3);
}

// YES -> screen2
yesBtn.addEventListener("click", () => showScreen(2));

// Open note -> screen3
goNoteBtn.addEventListener("click", () => showScreen(3));

// Back -> screen2 (optional)
backBtn.addEventListener("click", () => showScreen(2));

// NO dodges (desktop + mobile)
["mouseenter", "pointerenter", "touchstart"].forEach((evt) => {
  noBtn.addEventListener(
    evt,
    (e) => {
      if (evt !== "mouseenter") e.preventDefault();
      dodgeNo();
      growYes();
    },
    { passive: false }
  );
});

function dodgeNo() {
  const area = buttonArea.getBoundingClientRect();

  const pad = 8;
  const maxX = area.width - noBtn.offsetWidth - pad;
  const maxY = area.height - noBtn.offsetHeight - pad;

  const x = rand(pad, Math.max(pad, maxX));
  const y = rand(pad, Math.max(pad, maxY));

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
  noBtn.style.transform = "translate(0, 0)"; // override center transform
}

function growYes() {
  yesScale = Math.min(yesScale + 0.12, 2.0);
  yesBtn.style.transform = `scale(${yesScale})`;
}

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

// Keep NO inside bounds after resizing
window.addEventListener("resize", () => {
  // put it back near the center-ish on resize
  noBtn.style.left = "58%";
  noBtn.style.top = "50%";
  noBtn.style.transform = "translate(-50%, -50%)";
});
