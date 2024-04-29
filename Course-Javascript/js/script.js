const body = document.querySelector("body");
const game = document.querySelector(".game");;

const count = document.querySelector("h1");
const reset = document.querySelector(".reset");;

const ash = document.querySelector("#ash");

const charmander = document.querySelector("#charmander");
const zubat = document.querySelector("#zubat");
const pikachu = document.querySelector("#pikachu");

body.addEventListener("keydown", (event) => {
    event.stopPropagation();;

    // console.log(event.code)

    switch (event.code) {
        case "ArrowLeft":
            ash.src = "../assets/left.png";
            break;

        case "ArrowRight":
            ash.src = "../assets/right.png";

            break;

        case "ArrowDown":
            ash.src = "../assets/front.png";

            break;

        case "ArrowUp":
            ash.src = "../assets/back.png";

            break;

        default:

            break;
    }
});