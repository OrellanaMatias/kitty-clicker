let points = 0;
let score = document.getElementById("score");
let store = document.getElementById("store");

function getPoints() {
    points += 1;
    score.innerText = score;
}

function showStore() {
    store.style.display = "block";

}