// form-action.js — ES module: reads submitted form data from the URL query string
import { initNav } from './nav.js';

function renderSubmission() {
  const params = new URLSearchParams(window.location.search);
  const output = document.querySelector('#submission-output');
  if (!output) return;

  const name = params.get('name');

  if (!name) {
    output.innerHTML = `<p>No sign-up details were found. Please fill out the <a href="lessons.html">lessons form</a> first.</p>`;
    return;
  }

  const fields = {
    Name: params.get('name'),
    Email: params.get('email'),
    'Preferred rink': params.get('rink'),
    'Preferred day': params.get('day'),
    Level: params.get('level'),
  };

  // array method: Object.entries + map to build the summary rows
  const rows = Object.entries(fields)
    .map(([label, value]) => `<p><strong>${label}:</strong> ${value || 'Not provided'}</p>`)
    .join('');

  output.innerHTML = `<div class="card">${rows}</div>`;
}

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  renderSubmission();
});
