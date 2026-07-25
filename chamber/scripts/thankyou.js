const params = new URLSearchParams(window.location.search);

function setText(id, value) {
  const el = document.querySelector(`#${id}`);
  if (el) el.textContent = value || "\u2014";
}

setText("sumFirstName", params.get("first-name"));
setText("sumLastName", params.get("last-name"));
setText("sumEmail", params.get("email"));
setText("sumPhone", params.get("mobile-phone"));
setText("sumOrg", params.get("organization"));

const rawTimestamp = params.get("timestamp");
if (rawTimestamp) {
  const date = new Date(rawTimestamp);
  setText("sumTimestamp", date.toLocaleString("en-US", {
    dateStyle: "long",
    timeStyle: "short",
  }));
} else {
  setText("sumTimestamp", null);
}
