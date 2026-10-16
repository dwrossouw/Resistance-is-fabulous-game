//GLOBAL DOM ELEMENTS
const startScreenNode = document.querySelector("#start-screen");
const gameScreenNode = document.querySelector("#game-screen");
const gameOverScreenNode = document.querySelector("#game-over-screen");
const startBtnNode = document.querySelector("#start-btn");
const gameBoxNode = document.querySelector("#game-box");

//GLOBAL GAME VARIABLES
let playerObj = null;
let enemiesArr = [];
let testEnemy1 = null;
let testEnemy2 = null;

//GLOBAL GAME FUNCTIONS
function gameStart() {
  //Changing the screens
  startScreenNode.style.display = "none";
  gameScreenNode.style.display = "flex";

  //Adding the initial elements of the game
  addPlayer();
  addEnemy();
}

function addPlayer() {
  playerObj = new Player();
}

function addEnemy (){
    let testEnemy1 = new Enemy (300);
    let testEnemy2 = new Enemy (350);
}

//EVENT LISTENERS
startBtnNode.addEventListener("click", gameStart);
