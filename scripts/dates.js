const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

// Current Year
currentYear.textContent = new Date().getFullYear();

// Last Modified Date
lastModified.textContent = `Last Modified: ${document.lastModified}`;