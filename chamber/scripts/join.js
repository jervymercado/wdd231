// ---------- Hidden timestamp ----------
const timestampField = document.querySelector("#timestamp");
if (timestampField) timestampField.value = new Date().toISOString();

// ---------- Membership benefit modals ----------
const modalTriggers = document.querySelectorAll(".modal-trigger");

modalTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const modal = document.querySelector(`#${trigger.dataset.modal}`);
    if (modal) modal.showModal();
  });
});

const closeButtons = document.querySelectorAll(".modal-close");
closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    button.closest("dialog").close();
  });
});
