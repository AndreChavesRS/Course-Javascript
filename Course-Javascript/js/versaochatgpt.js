const body = document.querySelector("body");
const game = document.querySelector(".game");
const count = document.querySelector("h1");
const reset = document.querySelector("#reset");
const ash = document.querySelector("#ash");
const charmander = document.querySelector("#charmander");
const zubat = document.querySelector("#zubat");
const pikachu = document.querySelector("#pikachu");
const audio = document.querySelector("audio");
const musicControl = document.querySelector(".music-control");

const ASH_MOVEMENT_AMOUNT = 8;
const POKEMON_TOP_OFFSETS = { charmander: 64, zubat: 136, pikachu: 72 };

let findCharmander = false;
let findZubat = false;
let findPikachu = false;
let currentCount = 20;
let interval;

// Configuração inicial
audio.volume = 0.1;
musicControl.addEventListener("click", toggleMusic);
reset.addEventListener("click", () => window.location.reload());
gameLoop();

function toggleMusic(event) {
    event.stopPropagation();
    const isPlaying = audio.paused;
    musicControl.src = isPlaying ? "../assets/icons/on.png" : "../assets/icons/off.png";
    isPlaying ? audio.play() : audio.pause();
}

function clearCharactersAndFinishGame() {
    [ash, charmander, zubat, pikachu].forEach(pokemon => pokemon.style.display = "none");
    reset.style.display = "block";
    count.textContent = "";
}

function finishGame() {
    if (findCharmander && findPikachu && findZubat) {
        clearCharactersAndFinishGame();
        game.style.backgroundImage = "url('../assets/winner.jpg')";
        clearInterval(interval);
        audio.pause();
    }
}

function gameLoop() {
    interval = setInterval(() => {
        if (currentCount <= 0) {
            game.style.backgroundImage = "url('../assets/game-over.jpg')";
            clearCharactersAndFinishGame();
            clearInterval(interval);
            return;
        }
        currentCount--;
        count.textContent = currentCount;
    }, 1000);
}

function getRightPosition() {
    return parseInt(ash.style.right.split("px")[0]) || 2;
}

function getTopPosition() {
    return parseInt(ash.style.top.split("px")[0]) || 2;
}

function updatePokemonPosition(pokemon, to) {
    const rightPosition = getRightPosition() + (to === "ArrowLeft" ? -ASH_MOVEMENT_AMOUNT : ASH_MOVEMENT_AMOUNT);
    const topPosition = getTopPosition() + (to === "ArrowUp" ? -POKEMON_TOP_OFFSETS[pokemon.id] : POKEMON_TOP_OFFSETS[pokemon.id]);
    pokemon.style.right = `${rightPosition}px`;
    pokemon.style.top = `${topPosition}px`;
}

function verifyLookPokemon(to) {
    finishGame();
    if (getRightPosition() >= 130 && getRightPosition() <= 216 && getTopPosition() >= 2 && getTopPosition() <= 98) {
        charmander.style.display = "block";
        findCharmander = true;
    }
    if (getRightPosition() <= 138 && getRightPosition() >= 42 && getTopPosition() >= 474 && getTopPosition() <= 594) {
        zubat.style.display = "block";
        findZubat = true;
    }
    if (getRightPosition() >= 546 && getRightPosition() <= 650 && getTopPosition() >= 266 && getTopPosition() <= 394) {
        pikachu.style.display = "block";
        findPikachu = true;
    }
}

body.addEventListener("keydown", event => {
    event.stopPropagation();
    switch (event.code) {
        case "ArrowLeft":
        case "ArrowRight":
        case "ArrowDown":
        case "ArrowUp":
            updateAshPosition(event.code);
            verifyLookPokemon(event.code);
            break;
        default:
            break;
    }
});

function updateAshPosition(direction) {
    const horizontalMovement = direction === "ArrowLeft" || direction === "ArrowRight";
    const oppositeDirection = horizontalMovement ? "ArrowLeft" : "ArrowUp";
    const canMove = horizontalMovement ? getRightPosition() >= 2 && getRightPosition() <= 770 : getTopPosition() >= 2 && getTopPosition() <= 626;
    if (canMove) {
        ash.style[horizontalMovement ? "right" : "top"] = `${getTopPosition() + (direction === "ArrowUp" ? -ASH_MOVEMENT_AMOUNT : ASH_MOVEMENT_AMOUNT)}px`;
        ash.src = `../assets/${direction.toLowerCase()}.png`;
    }
}
