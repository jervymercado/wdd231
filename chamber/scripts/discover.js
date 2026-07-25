import { discoverItems } from "../data/discover.mjs";

// ---------- Render the 8 cards ----------
const grid = document.querySelector("#discoverGrid");

function cardTemplate(item) {
  return `
    <article class="discover-card">
      <h2>${item.name}</h2>
      <figure>
        <img src="images/${item.image}" alt="${item.name}" width="300" height="200" loading="lazy" />
      </figure>
      <address>${item.address}</address>
      <p>${item.description}</p>
      <button type="button">Learn More</button>
    </article>
  `;
}

grid.innerHTML = discoverItems.map(cardTemplate).join("");

// ---------- Last-visit message via localStorage ----------
const visitMessageEl = document.querySelector("#visitMessage");
const STORAGE_KEY = "discoverLastVisit";
const now = Date.now();
const lastVisit = localStorage.getItem(STORAGE_KEY);

let message;
if (!lastVisit) {
  message = "Welcome! Let us know if you have any questions.";
} else {
  const msSinceVisit = now - Number(lastVisit);
  const daysSinceVisit = Math.floor(msSinceVisit / (1000 * 60 * 60 * 24));

  if (msSinceVisit < 1000 * 60 * 60 * 24) {
    message = "Back so soon! Awesome!";
  } else if (daysSinceVisit === 1) {
    message = "You last visited 1 day ago.";
  } else {
    message = `You last visited ${daysSinceVisit} days ago.`;
  }
}

if (visitMessageEl) visitMessageEl.textContent = message;
localStorage.setItem(STORAGE_KEY, String(now));
