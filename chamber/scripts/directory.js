// ---------- Footer: copyright year + last modified date ----------
const yearSpan = document.querySelector("#currentYear");
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

const modifiedSpan = document.querySelector("#lastModified");
if (modifiedSpan) modifiedSpan.textContent = `Last Updated: ${document.lastModified}`;

// ---------- Mobile nav toggle ----------
const navToggle = document.querySelector("#navToggle");
const primaryNav = document.querySelector("#primaryNav");

navToggle.addEventListener("click", () => {
  const isOpen = primaryNav.classList.toggle("is-open");
  navToggle.textContent = isOpen ? "\u2715" : "\u2630";
  navToggle.setAttribute("aria-expanded", isOpen);
});

// ---------- Member directory ----------
const directoryList = document.querySelector("#directoryList");
const memberCountEl = document.querySelector("#memberCount");
const gridBtn = document.querySelector("#gridViewBtn");
const listBtn = document.querySelector("#listViewBtn");

const tierNames = { 1: "Member", 2: "Silver", 3: "Gold" };

function cardTemplate(member) {
  return `
    <article class="member-card" data-tier="${member.membership}">
      <div class="card-top">
        <img src="images/${member.image}" alt="${member.name} logo" width="56" height="56" loading="lazy" />
        <div>
          <h2>${member.name}</h2>
          <span class="member-tier">${tierNames[member.membership]}</span>
        </div>
      </div>
      <p class="category">${member.category}</p>
      <address>
        ${member.address}<br />
        ${member.phone}
      </address>
      <p class="description">${member.description} Serving the community since ${member.founded}.</p>
      <div class="card-actions">
        <a class="visit" href="${member.website}" target="_blank" rel="noopener">Visit Website</a>
      </div>
    </article>
  `;
}

async function loadMembers() {
  try {
    const response = await fetch("data/members.json");
    if (!response.ok) throw new Error(`Network response was not ok (${response.status})`);
    const data = await response.json();

    directoryList.innerHTML = data.members.map(cardTemplate).join("");
    memberCountEl.textContent = `${data.members.length} member businesses`;
  } catch (error) {
    directoryList.innerHTML = `<p role="alert">Sorry, member information could not be loaded right now.</p>`;
    console.error("Error fetching member data:", error);
  }
}

function setView(view) {
  const isList = view === "list";
  directoryList.classList.toggle("is-list", isList);
  gridBtn.classList.toggle("active", !isList);
  listBtn.classList.toggle("active", isList);
  gridBtn.setAttribute("aria-pressed", String(!isList));
  listBtn.setAttribute("aria-pressed", String(isList));
  localStorage.setItem("directoryView", view);
}

gridBtn.addEventListener("click", () => setView("grid"));
listBtn.addEventListener("click", () => setView("list"));

// Restore the visitor's last chosen view, default to grid
setView(localStorage.getItem("directoryView") || "grid");

loadMembers();