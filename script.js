let points;
let multiplier;
let multiplierPrice;
let currentTheme = 'light';

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
    multiplierPrice = parseInt(document.getElementById("multiplierPrice").innerText);
} else {
    multiplierPrice = parseInt(localStorage.getItem("multiplierPrice"));
}

let score = document.getElementById("score");
let store = document.getElementById("store");
let stats = document.getElementById("stats");
let achievements = document.getElementById("achievements");
let settings = document.getElementById("settings");
let navBar = document.getElementById("navBar");
let confirmationModal = document.getElementById("confirmationModal");
let confirmBtn = document.getElementById("confirmBtn");
let cancelBtn = document.getElementById("cancelBtn");

score.innerText = points;

function getPoints() {
    points += (1 * multiplier);
    console.log(points);
    score.innerText = points;
    saveData();
}

function showStore() {
    hideAllSections();
    store.style.display = "block";
}

function showStats() {
    hideAllSections();
    stats.style.display = "block";
}

function showAchievements() {
    hideAllSections();
    achievements.style.display = "block";
}

function showSettings() {
    hideAllSections();
    settings.style.display = "block";
}

function returnGame() {
    hideAllSections();
    navBar.style.display = "flex";
    score.innerText = points;
}

function hideAllSections() {
    store.style.display = "none";
    document.getElementById("game1").style.display = "none";
    document.getElementById("game2").style.display = "none";
    document.getElementById("game3").style.display = "none";
    navBar.style.display = "none";
}

document.querySelectorAll('.storeItem').forEach(item => {
    item.addEventListener('click', function() {
        showConfirmationModal(getMultiplier);
    });
});

function showConfirmationModal(callback) {
    confirmationModal.style.display = 'block';
    
    confirmBtn.onclick = function() {
        callback();
        hideConfirmationModal();
    };
    
    cancelBtn.onclick = function() {
        hideConfirmationModal();
    };
}

function hideConfirmationModal() {
    confirmationModal.style.display = 'none';
}

function getMultiplier() {
    if (points >= multiplierPrice) {
        multiplier += 1;
        points = points - multiplierPrice;
        multiplierPrice = Math.floor(multiplierPrice * 2);
        document.getElementById("multiplierPrice").innerText = multiplierPrice;
        saveData();
    } else {
        console.log("¡No tienes suficientes puntos!");
    }
}

function saveData() {
    localStorage.setItem("points", points);
    localStorage.setItem("multiplier", multiplier);
    localStorage.setItem("multiplierPrice", multiplierPrice);
}

function goToGame(game) {
    let gameUrls = {
        'game1': 'flappy_cat/index.html',
        'game2': 'flappy_cat/index.html',
        'game3': 'flappy_cat/index.html'
    };

    if (gameUrls[game]) {
        window.location.href = gameUrls[game];
    } else {
        console.log("No se encontro la URL del juego.");
    }
}

themeToggle.addEventListener('click', () => {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.body.dataset.theme = currentTheme;
});
