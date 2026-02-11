const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const btnArea = document.getElementById("btnArea");
const result = document.getElementById("result");
const resultTitle = document.getElementById("resultTitle");
const resultText = document.getElementById("resultText");
const noteBtn = document.getElementById("noteBtn");
const note = document.getElementById("note");
const nameTo = document.getElementById("nameTo");

nameTo.textContent = "Thijs";

let yesScale = 1;

// Place the NO button nicely on load
placeNoButton(0.68, 0.5);

// YES click
yesBtn.addEventListener("click", () => {
  result.hidden = false;
  btnArea.style.display = "none";

  resultTitle.textContent = "Aww! I'm the luckiest homikje now! 💖";
  resultText.textContent = "Okayyy then… open the small note 😇";

  createHeartsBurst();
});

// NO dodges (works on desktop + mobile)
["mouseenter", "touchstart"].forEach((evt) => {
  noBtn.addEventListener(evt, (e) => {
    e.preventDefault();
    dodgeNoButton();
    growYesButton();
  }, { passive: false });
});

function dodgeNoButton() {
  const area = btnArea.getBoundingClientRect();

  // keep button inside container
  const padding = 6;
  const maxX = area.width - noBtn.offsetWidth - padding;
  const maxY = area.height - noBtn.offsetHeight - padding;

  // random position
  const x = clamp(rand(0, maxX), padding, maxX);
  const y = clamp(rand(0, maxY), padding, maxY);

  noBtn.style.position = "absolute";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;

  // tiny wiggle for fun
  noBtn.animate(
    [
      { transform: "translateX(0px)" },
      { transform: "translateX(-6px)" },
      { transform: "translateX(6px)" },
      { transform: "translateX(0px)" },
    ],
    { duration: 220, easing: "ease-out" }
  );
}

function growYesButton() {
  yesScale = Math.min(yesScale + 0.12, 2.0);
  yesBtn.style.transform = `scale(${yesScale})`;
}

// Love note reveal
noteBtn.addEventListener("click", () => {
  note.hidden = false;
  noteBtn.style.display = "none";

  note.innerHTML = `
    <p>
      Count yourself lucky as well cause you are invited for a date at
      <strong>17:00 on Feb 14</strong> at <strong>Archibald!</strong> 💌
    </p>
  `;
});

// Helpers
function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function placeNoButton(xRatio, yRatio) {
  // place relative to container
  const area = btnArea.getBoundingClientRect();
  const x = area.width * xRatio - noBtn.offsetWidth / 2;
  const y = area.height * yRatio - noBtn.offsetHeight / 2;

  noBtn.style.position = "absolute";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

// Cute heart burst when YES is clicked
function createHeartsBurst() {
  for (let i = 0; i < 22; i++) {
    const heart = document.createElement("div");
    heart.textContent = ["💖", "💘", "❤️", "💕"][Math.floor(Math.random() * 4)];
    heart.style.position = "fixed";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.top = "100vh";
    heart.style.fontSize = Math.random() * 18 + 18 + "px";
    heart.style.animation = "floatUp 3.2s linear forwards";
    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 3200);
  }
}

// Re-position NO button after resize (keeps it in bounds)
window.addEventListener("resize", () => placeNoButton(0.68, 0.5));
