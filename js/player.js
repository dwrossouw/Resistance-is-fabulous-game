//GLOBAL PLAYER ELEMENTS
const characterSprites = {
  level1: [
    "./images/sprites/character1Run1.png",
    "./images/sprites/character1Run2.png",
    "./images/sprites/character1Jump.png",
    "./images/sprites/character1Duck.png",
  ],
  level2: [
    "./images/sprites/character2Run1.png",
    "./images/sprites/character2Run2.png",
    "./images/sprites/character2Jump.png",
    "./images/sprites/character2Duck.png",
  ],
  level3: [
    "./images/sprites/character3Run1.png",
    "./images/sprites/character3Run2.png",
    "./images/sprites/character3Jump.png",
    "./images/sprites/character3Duck.png",
  ],
  level4: [
    "./images/sprites/character4Run1.png",
    "./images/sprites/character4Run2.png",
    "./images/sprites/character4Jump.png",
    "./images/sprites/character4Duck.png",
  ],
  level5: [
    "./images/sprites/character5Run1.png",
    "./images/sprites/character5Run2.png",
    "./images/sprites/character5Jump.png",
    "./images/sprites/character5Duck.png",
  ],
  level6: ["./images/sprites/character6.png"],
};

//PLAYER CLASS
class Player {
  constructor() {
    this.node = document.createElement("img");
    this.node.src = characterSprites.level1[0];
    gameBoxNode.append(this.node);
    this.node.className = "player";

    this.x = 200;
    this.y = 265;
    this.width = 75;
    this.height = 100;

    this.node.style.width = `${this.width}px`;
    this.node.style.height = `${this.height}px`;
    this.node.style.zIndex = "4";

    this.node.style.position = "absolute";
    this.node.style.top = `${this.y}px`;
    this.node.style.left = `${this.x}px`;

    this.isJumping = false;
    this.isDucking = false;
  }

  moveUp() {
    this.y -= 25;
    this.node.style.top = `${this.y}px`;
  }

  moveDown() {
    this.y += 25;
    this.node.style.top = `${this.y}px`;
  }

  duck() {
    this.y += 50;
    this.height = 50;
    this.width = 100;

    this.node.style.top = `${this.y}px`;
    this.node.style.height = `${this.height}px`;
    this.node.style.width = `${this.width}px`;
  }

  duckReset() {
    this.y -= 50;
    this.height = 100;
    this.width = 75;

    this.node.style.top = `${this.y}px`;
    this.node.style.width = `${this.width}px`;
    this.node.style.height = `${this.height}px`;
  }

  changeSprite(charLevel) {
    if (this.isJumping || this.isDucking) {
      return;
    }

    if (this.node.src.endsWith("Run1.png")) {
      this.node.src = characterSprites[charLevel][1];
    } else if (this.node.src.endsWith("Run2.png")) {
      this.node.src = characterSprites[charLevel][0];
    }
  }
}
