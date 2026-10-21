//GLOBAL DOM ELEMENTS
const startScreenNode = document.querySelector("#start-screen");
const gameScreenNode = document.querySelector("#game-screen");
const gameOverScreenNode = document.querySelector("#game-over-screen");
const startBtnNode = document.querySelector("#start-btn");
const restartBtnNode = document.querySelector("#restart-btn");
const gameBoxNode = document.querySelector("#game-box");
const timerNode = document.querySelector("#timer");
const fabObjectNode = document.querySelector("#fab-object");
const gameOverTimeNode = document.querySelector("#game-over-screen h3");
const startScreenImageNode = document.querySelector("#start-screen img");

//AUDIO ELEMENTS
const startMusic = new Audio("./sounds/startMusic.mp3");
const gameMusic = new Audio("./sounds/gameMusic.mp3");
const gameOverMusic = new Audio("./sounds/gameOverMusic.mp3");
const collisionSound = new Audio("./sounds/collision.wav");

startMusic.loop = true;
gameMusic.loop = true;

//GLOBAL GAME VARIABLES
let playerObj = null;
let enemiesArr = [];

let isGameRunning = false;
let mainAnimationId = null;
let enemyIntervalId = null;
let runningIntervalId = null;
let timerIntervalId = null;

let timer = 0;
let finalTime;
let fabCount = 0;
let charLevel = "level1";
let superEnemyCount = 0;

//GLOBAL GAME FUNCTIONS
function gameStart() {
  startMusic.pause();
  startMusic.currentTime = 0;
  startScreenNode.style.display = "none";
  gameScreenNode.style.display = "flex";

  //Adding the initial elements of the game
  addPlayer();
  addEnemy();
  startTimer();

  gameMusic.play();

  isGameRunning = true;
  //Starts the main game loop which updates enemy movement and checks for collisions on each animation frame
  mainAnimationId = requestAnimationFrame(gameLoop);
  enemyIntervalId = setInterval(addEnemy, 2000); //Spawn objects every 2 seconds
  runningIntervalId = setInterval(() => {
    //Interval to create running effect
    playerObj.changeSprite(charLevel);
  }, 150);
}

//Main gameplay loop: moves enemies, removes off-screen objects, checks collisions, and schedules the next animation frame
function gameLoop() {
  if (!isGameRunning) {
    //Stops the loop if the game is no longer running
    return;
  }
  //Loops through every active enemy and update its position
  enemiesArr.forEach((enemy) => {
    enemy.move();
  });
  //Remove enemies that have moved out of the picture
  checkEnemyDespawn();
  //Check for collisions
  checkCollisionPlayerEnemy();

  //Checks if game is still running after collisions
  if (!isGameRunning) {
    return;
  }
  //Request the next animation frame to keep the game running
  mainAnimationId = requestAnimationFrame(gameLoop);
}

function addPlayer() {
  playerObj = new Player();
}

function addEnemy() {
  let posY = Math.random() > 0.5 ? 265 : 315;
  let picArrLength =
    posY === 315 ? enemiesGroundArr.length : enemiesAirArr.length;
  let randomEnemy = Math.floor(Math.random() * picArrLength);
  let newEnemy;

  if (posY === 315) {
    newEnemy = spawnSuperEnemy();
    if (!newEnemy) {
      newEnemy = new Enemy(posY);
      newEnemy.node.src = enemiesGroundArr[randomEnemy];
    }
  } else if (posY === 265) {
    newEnemy = new Enemy(posY);
    newEnemy.node.src = enemiesAirArr[randomEnemy];
  }
  enemiesArr.push(newEnemy);
}

function spawnSuperEnemy() {
  //20% chance of creating a super enemy
  if (Math.random() < 0.3) {
    let superEnemy = new Enemy(265);
    superEnemy.width = 200;
    superEnemy.height = 100;
    superEnemy.node.style.width = "200px";
    superEnemy.node.style.height = "100px";
    superEnemy.node.src = superEnemyArr[superEnemyCount];

    superEnemyCount === 3 ? (superEnemyCount = 0) : superEnemyCount++;
    return superEnemy;
  }
  return null;
}

//Removes elements that have moved off the left side of the screen
function checkEnemyDespawn() {
  if (enemiesArr[0] && enemiesArr[0].x < -100) {
    enemiesArr[0].node.remove(); //Remove the HTML element
    enemiesArr.shift(); //Remove it from the array
  }
}

//Checks whether two game objects overlap
//Returns true if they collide, or false if they do not
function checkCollision(element1, element2) {
  return (
    element1.x < element2.x + element2.width &&
    element1.x + element1.width > element2.x &&
    element1.y < element2.y + element2.height &&
    element1.y + element1.height > element2.y
  );
}

//Checks for collisions between the player and the obstacles
function checkCollisionPlayerEnemy() {
  enemiesArr.forEach((enemy) => {
    //Checks for each active obstacle
    if (checkCollision(enemy, playerObj)) {
      if (!enemy.isColliding) {
        //Initial isCollidng = false, so !false = true
        fabCount++; //How many collisions have happened
        collisionSound.play();
        charLevel = `level${fabCount + 1}`; //Variable to keep track of the appearance of the character
        fabulousBar(); //Update the progress bar at the top
        enemy.isColliding = true; //Change state to true as not to trigger collision incident again multiple times (Due the requestAnimationFrame)
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
  gameMusic.pause(); //Stop game music
  gameMusic.currentTime = 0; //Reset music to beginning
  gameOverMusic.play(); //Start game over audio

  isGameRunning = false; //This is the main variable that controls the game loop
  clearInterval(enemyIntervalId); //Stop obstacles from spawning
  clearInterval(runningIntervalId); //Stop running animation
  clearInterval(timerIntervalId); //Stop game timer
  playerObj.node.src = characterSprites["level6"][0]; //Change to the last outfit for the character just before the screen changes to the game over screen

  setTimeout(() => {
    //Creates a very short delay to see the character change
    gameScreenNode.style.display = "none";
    gameOverScreenNode.style.display = "flex";
  }, 500);

  finalTimeGameOver(); //Display the final survival time and message
}

//Returns game to original state so a new game can be played
function gameRestart() {
  gameOverScreenNode.style.display = "none";
  startScreenNode.style.display = "flex";
  playerObj.node.remove(); //Remove the player's image

  enemiesArr.forEach((element) => {
    //remove all the obstacle's images
    element.node.remove();
  });

  playerObj = null;
  enemiesArr = [];
  timer = 0;
  fabCount = 0;
  charLevel = "level1";
  superEnemyCount = 0;
  fabObjectNode.style.left = "0px";
  timerUpdate();
  isGameRunning = false;
  gameOverMusic.pause();
  gameOverMusic.currentTime = 0;
}

function startTimer() {
  timerIntervalId = setInterval(() => {
    timer++;
    timerUpdate();
  }, 1000);
}

function timerUpdate() {
  //Calculate the number of minutes, convert it to a string and add a leading zero if necessary
  const minutes = Math.floor(timer / 60)
    .toString()
    .padStart(2, "0");
  //Calculate the number of seconds, convert it to a string and add a leading zero if necessary
  const seconds = (timer % 60).toString().padStart(2, "0");
  finalTime = timerNode.innerText = `${minutes}:${seconds}`;
}

function fabulousBar() {
  let progress = fabCount * 120;
  fabObjectNode.style.left = `${progress}px`;
}

function finalTimeGameOver() {
  let message = ``;
  if (timer < 60) {
    message = `You resisted only ${timer} seconds before becoming FABULOUS!`;
  } else if (timer >= 60) {
    const min = Math.floor(timer / 60);
    const sec = timer % 60;
    message = `You resisted only ${min} minute(s) and ${sec} second(s)before becoming FABULOUS!`;
  }
  gameOverTimeNode.innerText = message;
}

//EVENT LISTENERS
startBtnNode.addEventListener("click", (event) => {
  event.stopPropagation(); //Prevent the click from triggering event listeners on parent elements
  gameStart(); //The official start of the game loop
});

restartBtnNode.addEventListener("click", gameRestart);

startScreenNode.addEventListener("click", () => {
  startMusic.play(); //Click anywhere on the start screen to start the music
});

//Keyboard input events to control the character
window.addEventListener("keydown", (event) => {
  if (!isGameRunning) {
    //Ignore any keyboard events if the game is not running
    return;
  }
  if (event.code === "ArrowUp") {
    //Checks three conditions before jumping can be implemented
    if (!playerObj.isJumping && !event.repeat && !playerObj.isDucking) {
      playerObj.isJumping = true;
      playerObj.node.src = characterSprites[charLevel][2]; //Change the character's sprite to the jumping sprite

      playerObj.moveUp();
      playerObj.moveUp();
      playerObj.moveUp();

      setTimeout(() => {
        //The character stays in the air for half a second.
        playerObj.moveDown();
        playerObj.moveDown();
        playerObj.moveDown();

        playerObj.node.src = characterSprites[charLevel][0]; //Change the character's sprite back to the running sprite
        playerObj.isJumping = false; //Reset the isJumping variable to finish the jumping action
      }, 500);
    }
  } else if (event.code === "ArrowDown") {
    if (!playerObj.isDucking && !playerObj.isJumping) {
      //Only able to duck if the character is not jumping or ducking already
      playerObj.node.src = characterSprites[charLevel][3]; //Change character's sprite
      playerObj.isDucking = true; //Change the ducking state
      playerObj.duck(); //Change character's position
    }
  }
});

//Checks for when the player releases the down arrow key after ducking
window.addEventListener("keyup", (event) => {
  if (!isGameRunning) {
    return;
  }

  if (event.code === "ArrowDown" && playerObj.isDucking) {
    playerObj.isDucking = false;
    playerObj.duckReset();
    playerObj.node.src = characterSprites[charLevel][0];
  }
});
