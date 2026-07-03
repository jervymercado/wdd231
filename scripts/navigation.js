const menuButton = document.querySelector("#menu");
const navigation = document.querySelector("#nav");

menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");

    if (navigation.classList.contains("open")) {
        menuButton.innerHTML = "&times;";
    } else {
        menuButton.innerHTML = "&#9776;";
    }
});