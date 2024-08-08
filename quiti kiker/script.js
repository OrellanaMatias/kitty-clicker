let points;
let multiplier;
let multiplierPrice = document.getElementById("multiplierPrice").innerText;

if (!localStorage.getItem("points")) {
    points = 0;
} else {
    points = parseInt(localStorage.getItem("points"));
}

if (!localStorage.getItem("multiplier")) {
    multiplier = 1;
} else {
    multiplier = parseInt(localStorage.getItem("multiplier"));
}

if (!localStorage.getItem("multiplierPrice")) {
    multiplierPrice = document.getElementById("multiplierPrice").innerText;
} else {
    multiplierPrice = parseInt(localStorage.getItem("multiplierPrice"))
}

let score = document.getElementById("score");
let store = document.getElementById("store");
let flexBox = document.getElementById("flexBox");
let storeImg = document.getElementById("storeImg");
let navBar = document.getElementById("navBar");

function getPoints() {
    points += (1 * multiplier)
    console.log(points);
    score.innerText = points;
    saveData();
}

function showStore() {
    store.style.display = "block";
    flexBox.style.display = "none";
    navBar.style.backgroundColor = "#58d68d";
    storeImg.src = "img/back.png";
    storeImg.setAttribute("onClick", "returnGame()");
}

function returnGame() {
    store.style.display = "none";
    flexBox.style.display = "flex";
    navBar.style.backgroundColor = "#030508";
    storeImg.src = "img/store.png";
    storeImg.setAttribute("onClick", "showStore()");
    score.innerText = points;
}

function getMultiplier() {
    if (points >= multiplierPrice) {
        multiplier += 1;
        points = points - multiplierPrice;
        multiplierPrice += (multiplierPrice * 2);
        document.getElementById("multiplierPrice").innerText = multiplierPrice;
    } else {
        console.log("¡No tenes suficientes puntos!");
    }
}

function saveData() {
    localStorage.setItem("points", points);
    localStorage.setItem("multiplier", multiplier);
    localStorage.setItem("multiplierPrice", multiplierPrice);
}