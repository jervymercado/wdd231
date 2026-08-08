// rinks.js — ES module: fetches schedule data and renders it dynamically
import { initNav } from './nav.js';

const DATA_URL = './data/schedule.json';
const STORAGE_KEY = 'preferredLevel';

async function getSchedule() {
  try {
    const response = await fetch(DATA_URL);
    if (!response.ok) {
      throw new Error(`Network response was not ok (status ${response.status})`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Could not load the schedule:', error);
    const list = document.querySelector('#schedule-list');
    if (list) {
      list.innerHTML = `<li>Sorry, the schedule could not be loaded right now. Please try again later.</li>`;
    }
    return [];
  }
}

function renderSchedule(items) {
  const list = document.querySelector('#schedule-list');
  if (!list) return;

  // array method: map() builds the markup, template literals construct each card
  const cardsHtml = items
    .map(
      (item, index) => `
      <li class="schedule-card" data-index="${index}">
        <h3>${item.rink}</h3>
        <p>${item.location}</p>
        <p>${item.day} • ${item.time}</p>
        <p>Level: ${item.level} — ₱${item.price}</p>
        <button type="button" class="details-btn" data-index="${index}">View details</button>
      </li>`
    )
    .join('');

  list.innerHTML = cardsHtml || '<li>No sessions match that filter.</li>';
}

function populateLevelFilter(items) {
  const select = document.querySelector('#level-filter');
  if (!select) return;

  // array method: reduce a unique, sorted list of levels
  const levels = [...new Set(items.map((item) => item.level))].sort();
  select.innerHTML =
    '<option value="all">All levels</option>' +
    levels.map((level) => `<option value="${level}">${level}</option>`).join('');
}

function openModal(item) {
  const dialog = document.querySelector('#details-dialog');
  if (!dialog) return;

  dialog.querySelector('#dialog-title').textContent = item.rink;
  dialog.querySelector('#dialog-body').innerHTML = `
    <p><strong>Location:</strong> ${item.location}</p>
    <p><strong>Day:</strong> ${item.day}</p>
    <p><strong>Time:</strong> ${item.time}</p>
    <p><strong>Level:</strong> ${item.level}</p>
    <p><strong>Price:</strong> ₱${item.price}</p>
  `;
  dialog.showModal();
}

function wireUpEvents(items) {
  const list = document.querySelector('#schedule-list');
  const select = document.querySelector('#level-filter');
  const dialog = document.querySelector('#details-dialog');
  const closeBtn = document.querySelector('#dialog-close');

  // DOM event: click on a "View details" button opens the modal
  list?.addEventListener('click', (event) => {
    const btn = event.target.closest('.details-btn');
    if (!btn) return;
    const item = items[Number(btn.dataset.index)];
    if (item) openModal(item);
  });

  closeBtn?.addEventListener('click', () => dialog.close());

  // DOM event: changing the filter re-renders the list and saves the choice
  select?.addEventListener('change', () => {
    const value = select.value;
    localStorage.setItem(STORAGE_KEY, value);
    const filtered = value === 'all' ? items : items.filter((item) => item.level === value);
    renderSchedule(filtered);
  });
}

async function init() {
  initNav();
  const items = await getSchedule();
  if (items.length === 0) return;

  populateLevelFilter(items);

  // Local storage: restore the visitor's last-used filter, if any
  const savedLevel = localStorage.getItem(STORAGE_KEY);
  const select = document.querySelector('#level-filter');
  if (savedLevel && select) {
    select.value = savedLevel;
  }

  const initial =
    savedLevel && savedLevel !== 'all' ? items.filter((item) => item.level === savedLevel) : items;
  renderSchedule(initial);
  wireUpEvents(items);
}

document.addEventListener('DOMContentLoaded', init);
