/*========================================
Vote Lukhanyo 2027 — RETRO WEBSITE — script.js
========================================*/

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- Loading Screen ---------- */
  window.addEventListener("load", () => {
    setTimeout(() => {
      const loader = document.getElementById("loading-screen");
      if (!loader) return;
      loader.style.opacity = "0";
      setTimeout(() => { loader.style.display = "none"; }, 600);
    }, 3000);
  });

  /* ---------- Visitor Counter ---------- */
  let visitors = 392;
  const counter = document.getElementById("counter");
  if (counter) {
    setInterval(() => {
      visitors++;
      counter.innerHTML = visitors.toString().padStart(6, "0");
    }, 2500);
  }

  /* ---------- TRAP Button (hero) ---------- */
  const trapButton = document.querySelector(".hero button");
  if (trapButton) {
    trapButton.addEventListener("click", () => {
      alert("Welcome to the TRAP Movement.\n\nThink Bigger.\nRespond Better.\nAdapt Faster.\nPerform Together.");
    });
  }

  /* ---------- Fake Poll (sidebar widget) ---------- */
  const voteButton = document.querySelector(".widget form button");
  if (voteButton) {
    voteButton.addEventListener("click", () => {
      voteButton.innerHTML = "THANK YOU!";
      voteButton.style.background = "#28c840";
      launchConfetti();
    });
  }

  /* ---------- Hero Tilt Effect ---------- */
  const heroImage = document.querySelector(".hero-image img");
  if (heroImage) {
    document.addEventListener("mousemove", (e) => {
      let x = (window.innerWidth / 2 - e.pageX) / 60;
      let y = (window.innerHeight / 2 - e.pageY) / 60;
      heroImage.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
    });
  }

  /* ---------- Sparkles ---------- */
  function createSparkle() {
    let sparkle = document.createElement("div");
    sparkle.className = "sparkle";
    sparkle.style.left = Math.random() * window.innerWidth + "px";
    sparkle.style.top = Math.random() * window.innerHeight + "px";
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 2000);
  }
  setInterval(createSparkle, 400);

  /* ---------- News Animation ---------- */
  const news = document.querySelectorAll(".news div");
  news.forEach((item, index) => {
    item.style.opacity = "0";
    item.style.transform = "translateX(-80px)";
    setTimeout(() => {
      item.style.transition = ".6s";
      item.style.opacity = "1";
      item.style.transform = "translateX(0)";
    }, index * 250);
  });

  /* ---------- Confetti ---------- */
  function launchConfetti() {
    for (let i = 0; i < 150; i++) {
      let piece = document.createElement("div");
      piece.className = "confetti";
      piece.style.left = Math.random() * 100 + "vw";
      piece.style.background = ["gold", "#fff", "#6A0D25", "#FFD95A", "#071A35"][Math.floor(Math.random() * 5)];
      piece.style.animationDuration = Math.random() * 2 + 2 + "s";
      document.body.appendChild(piece);
      setTimeout(() => piece.remove(), 4000);
    }
  }

  /* ---------- Easter Egg (click TRAP heading 5x) ---------- */
  let clicks = 0;
  const trapTitle = document.querySelector(".trap h2");
  if (trapTitle) {
    trapTitle.addEventListener("click", () => {
      clicks++;
      if (clicks === 5) {
        alert("🏆 Achievement Unlocked\n\nWelcome to THE TRAP.");
        document.body.classList.add("gold-mode");
      }
    });
  }

  /* ---------- Random Title Messages ---------- */
  const messages = [
    "Welcome to LUKHANYO.COM!",
    "Have YOU joined the TRAP?",
    "Vote Lukhanyo for Prefect!",
    "#GodBlessTheTRAP",
    "Thanks for stopping by!"
  ];
  setInterval(() => {
    document.title = messages[Math.floor(Math.random() * messages.length)];
  }, 3000);

  /* ---------- Fake Campaign Update Popup ---------- */
  setTimeout(() => {
    let popup = document.createElement("div");
    popup.className = "popup";
    popup.innerHTML = `
      <h2>📢 Campaign Update</h2>
      <p>Welcome to the official Vote Lukhanyo website!</p>
      <button type="button">Close</button>
    `;
    document.body.appendChild(popup);
    popup.querySelector("button").addEventListener("click", () => popup.remove());
  }, 5000);

  /* ---------- Floating widget tilt ---------- */
  document.querySelectorAll(".widget").forEach(widget => {
    widget.addEventListener("mouseenter", () => { widget.style.transform = "rotate(-2deg) scale(1.03)"; });
    widget.addEventListener("mouseleave", () => { widget.style.transform = "rotate(0deg)"; });
  });

  /* =========================================================
     NEW: features referenced in the HTML that had no JS yet
     ========================================================= */

  /* ---------- Arcade game: Catch The Vote ---------- */
  const gameArea = document.getElementById("gameArea");
  const scoreEl = document.getElementById("score");
  const startGameBtn = document.getElementById("startGame");
  let gameInterval = null;
  let gameTimeout = null;
  let score = 0;

  function spawnStar() {
    if (!gameArea) return;
    const star = document.createElement("button");
    star.className = "star";
    star.type = "button";
    star.textContent = "⭐";
    const areaW = gameArea.clientWidth - 30;
    const areaH = gameArea.clientHeight - 30;
    star.style.left = Math.max(0, Math.random() * areaW) + "px";
    star.style.top = Math.max(0, Math.random() * areaH) + "px";
    star.addEventListener("click", () => {
      score++;
      if (scoreEl) scoreEl.textContent = score;
      star.remove();
    });
    gameArea.appendChild(star);
    setTimeout(() => star.remove(), 1200);
  }

  if (startGameBtn && gameArea) {
    startGameBtn.addEventListener("click", () => {
      clearInterval(gameInterval);
      clearTimeout(gameTimeout);
      gameArea.innerHTML = "";
      score = 0;
      if (scoreEl) scoreEl.textContent = "0";
      startGameBtn.disabled = true;
      startGameBtn.textContent = "GAME RUNNING...";

      gameInterval = setInterval(spawnStar, 500);

      gameTimeout = setTimeout(() => {
        clearInterval(gameInterval);
        gameArea.innerHTML = `<div class="placeholder">Time's up! Final score: ${score}</div>`;
        startGameBtn.disabled = false;
        startGameBtn.textContent = "START GAME";
      }, 15000);
    });
  }

  /* ---------- Daily motivation quote rotator ---------- */
  const quotes = [
    "Leadership begins with service.",
    "Think Bigger. Respond Better.",
    "Adapt Faster. Perform Together.",
    "Great leaders lift others up.",
    "Small actions, big impact.",
    "Vote Lukhanyo for Prefect 2027!"
  ];
  const quoteEl = document.getElementById("quote");
  const newQuoteBtn = document.getElementById("newQuote");
  if (newQuoteBtn && quoteEl) {
    newQuoteBtn.addEventListener("click", () => {
      const next = quotes[Math.floor(Math.random() * quotes.length)];
      quoteEl.textContent = `"${next}"`;
    });
  }

  /* ---------- Campaign poll (final stretch) ---------- */
  let pollVotes = 0;
  const pollResult = document.getElementById("pollResult");
  document.querySelectorAll(".poll-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      pollVotes++;
      if (pollResult) pollResult.textContent = `${pollVotes} Vote${pollVotes === 1 ? "" : "s"}`;
      launchConfetti();
    });
  });

  /* ---------- Guestbook (final stretch) ---------- */
  const guestNameInput = document.getElementById("guestName");
  const guestMessageInput = document.getElementById("guestMessage");
  const signGuestbookBtn = document.getElementById("signGuestbook");
  const guestEntries = document.getElementById("guestEntries");

  if (signGuestbookBtn && guestEntries) {
    signGuestbookBtn.addEventListener("click", () => {
      const name = (guestNameInput && guestNameInput.value.trim()) || "Anonymous";
      const message = (guestMessageInput && guestMessageInput.value.trim()) || "";
      if (!message) return;

      const entry = document.createElement("div");
      entry.className = "guest-entry";
      const strong = document.createElement("strong");
      strong.textContent = name;
      const p = document.createElement("p");
      p.textContent = message;
      entry.appendChild(strong);
      entry.appendChild(p);
      guestEntries.prepend(entry);

      if (guestNameInput) guestNameInput.value = "";
      if (guestMessageInput) guestMessageInput.value = "";
    });
  }

  /* ---------- Lightbox for photo gallery ---------- */
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const closeLightbox = document.getElementById("closeLightbox");

  document.querySelectorAll(".gallery-photo").forEach(photo => {
    photo.addEventListener("click", () => {
      if (!lightbox || !lightboxImage) return;
      lightboxImage.src = photo.src;
      lightbox.classList.add("open");
    });
  });

  if (closeLightbox && lightbox) {
    closeLightbox.addEventListener("click", () => lightbox.classList.remove("open"));
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) lightbox.classList.remove("open");
    });
  }

});
