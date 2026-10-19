//GLOBAL DOM ELEMENTS
const startScreenNode = document.querySelector("#start-screen");
const gameScreenNode = document.querySelector("#game-screen");
const gameOverScreenNode = document.querySelector("#game-over-screen");
const startBtnNode = document.querySelector("#start-btn");
const restartBtnNode = document.querySelector("#restart-btn");
const gameBoxNode = document.querySelector("#game-box");
const timerNode = document.querySelector("#timer");
const fabObjectNode = document.querySelector("#fab-object");
const gameOverTimeNode = document.querySelector ("#game-over-screen h3");
const startScreenImageNode = document.querySelector("#start-screen img");

//GLOBAL GAME VARIABLES
let playerObj = null;
let enemiesArr = [];
let enemiesAirArr = [
  "/images/smallflags.png",
  "/images/discoball.png",
  "/images/featherboa.png",
  "/images/glittercloud.png",
  "/images/smallflags.png",
  "/images/heart.png",
];
let enemiesGroundArr = [
  "/images/cupcake.png",
  "/images/flowers.png",
  "/images/megaphone.png",
  "/images/prideflag.png",
  "/images/paint.png",
  "/images/skates.png",
];

let isGameRunning = false;
let mainIntervalId = null;
let enemyIntervalId = null;
let runningIntervalId = null;
let timerIntervalId = null;

let timer = 0;
let finalTime;
let fabCount = 0;

//GLOBAL GAME FUNCTIONS
console.log(startScreenImageNode);
startScreenImage();
function gameStart() {
  startScreenNode.style.display = "none";
  gameScreenNode.style.display = "flex";

  //Adding the initial elements of the game
  addPlayer();
  addEnemy();
  startTimer();

  isGameRunning = true;
  mainIntervalId = requestAnimationFrame(gameLoop);
  enemyIntervalId = setInterval(addEnemy, 2000);
  runningIntervalId = setInterval(() => {
    playerObj.changeSprite();
  }, 150);
}

function gameLoop() {
  if (!isGameRunning) {
    return;
  }
  enemiesArr.forEach((enemy) => {
    enemy.move();
  });

  checkEnemyDespawn();
  checkCollisionPlayerEnemy();

  if (!isGameRunning) {
    return;
  }

  mainIntervalId = requestAnimationFrame(gameLoop);
}

function addPlayer() {
  playerObj = new Player();
}

function addEnemy() {
  let posY = Math.random() > 0.5 ? 265 : 315;
  let picArrLength =
    posY === 315 ? enemiesGroundArr.length : enemiesAirArr.length;
  let randomEnemy = Math.floor(Math.random() * picArrLength);
  let newEnemy = new Enemy(posY);

  if (posY === 315) {
    newEnemy.node.src = enemiesGroundArr[randomEnemy];
  } else if (posY === 265) {
    newEnemy.node.src = enemiesAirArr[randomEnemy];
  }
  enemiesArr.push(newEnemy);
}

function checkEnemyDespawn() {
  if (enemiesArr[0] && enemiesArr[0].x < -100) {
    enemiesArr[0].node.remove();
    enemiesArr.shift();
  }
}

function checkCollision(element1, element2) {
  return (
    element1.x < element2.x + element2.width &&
    element1.x + element1.width > element2.x &&
    element1.y < element2.y + element2.height &&
    element1.y + element1.height > element2.y
  );
}

function checkCollisionPlayerEnemy() {
  enemiesArr.forEach((enemy) => {
    if (checkCollision(enemy, playerObj)) {
      if (!enemy.isColliding) {
        fabCount++;
        fabulousBar();
        enemy.isColliding = true;
        if (fabCount >= 5) {
          gameOver();
        }
      }
    } else {
      enemy.isColliding = false;
    }
  });
}

function gameOver() {
  isGameRunning = false;
  clearInterval(enemyIntervalId);
  clearInterval(runningIntervalId);
  clearInterval(timerIntervalId);

  setTimeout(() => {
    gameScreenNode.style.display = "none";
    gameOverScreenNode.style.display = "flex";
  }, 500);

  finalTimeGameOver();
}

function gameRestart() {
  gameOverScreenNode.style.display = "none";
  startScreenNode.style.display = "flex";
  playerObj.node.remove();
  enemiesArr.forEach((element) => {
    element.node.remove();
  });
  playerObj = null;
  enemiesArr = [];
  timer = 0;
  fabCount = 0;
  fabObjectNode.style.left = "0px";
  timerUpdate();
  isGameRunning = false;
}

function startTimer() {
  timerIntervalId = setInterval(() => {
    timer++;
    timerUpdate();
  }, 1000);
}

function timerUpdate() {
  const minutes = Math.floor(timer / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (timer % 60).toString().padStart(2, "0");
  finalTime = timerNode.innerText = `${minutes}:${seconds}`;
  
}

function fabulousBar() {
  let progress = 1;
  progress = fabCount * 120;
  fabObjectNode.style.left = `${progress}px`;
}

function finalTimeGameOver (){
  let message = ``;
  if (timer<60){
    message = `It took you only ${timer} seconds to become fabulous.`
  }
  else if (timer > 60) {
    const min = Math.floor (timer/60);
    const sec = timer%60;
    message = `It took you only ${min} minute(s) and ${sec} second(s) to become fabulous.`
    
  }
  gameOverTimeNode.innerText = message;
  console.log(message);
}

function startScreenImage(){
  startScreenImageNode.style.visibility = "visible";
  setInterval (()=>{
    if (startScreenImageNode.style.visibility === "visible"){
      startScreenImageNode.style.visibility = "hidden";
    } else if (startScreenImageNode.style.visibility = "hidden") {
      startScreenImageNode.style.visibility = "visible";
    }
  },500)
}

//EVENT LISTENERS
startBtnNode.addEventListener("click", gameStart);
restartBtnNode.addEventListener("click", gameRestart);

window.addEventListener("keydown", (event) => {
  if (!isGameRunning) {
    return;
  }
  if (event.code === "ArrowUp") {
    //Checks three conditions before jumping can be implemented
    if (!playerObj.isJumping && !event.repeat && !playerObj.isDucking) {
      playerObj.isJumping = true;
      playerObj.node.src = "/images/characterJump.png";

      playerObj.moveUp();
      playerObj.moveUp();
      playerObj.moveUp();

      setTimeout(() => {
        playerObj.moveDown();
        playerObj.moveDown();
        playerObj.moveDown();

        playerObj.node.src = "/images/characterRun1.png";
        playerObj.isJumping = false;
      }, 500);
    }
  } else if (event.code === "ArrowDown") {
    if (!playerObj.isDucking && !playerObj.isJumping) {
      playerObj.node.src = "/images/characterDuck.png";
      playerObj.isDucking = true;
      playerObj.duck();
    }
  }
});

window.addEventListener("keyup", (event) => {
  if (!isGameRunning) {
    return;
  }

  if (event.code === "ArrowDown" && playerObj.isDucking) {
    playerObj.isDucking = false;
    playerObj.duckReset();
    playerObj.node.src = "/images/characterRun1.png";
  }
});
