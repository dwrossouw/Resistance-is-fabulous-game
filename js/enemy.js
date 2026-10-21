//GlOBAL ENEMY ELEMENTS
const enemiesAirArr = [
  "./images/enemy/smallflags.png",
  "./images/enemy/discoball.png",
  "./images/enemy/featherboa.png",
  "./images/enemy/glittercloud.png",
  "./images/enemy/unicorn.png",
  "./images/enemy/heart.png",
];
const enemiesGroundArr = [
  "./images/enemy/cupcake.png",
  "./images/enemy/flowers.png",
  "./images/enemy/megaphone.png",
  "./images/enemy/prideflag.png",
  "./images/enemy/paint.png",
  "./images/enemy/skates.png",
];

const superEnemyArr = [
  "./images/enemy/pridefloat.png",
  "./images/enemy/prideparade.png",
  "./images/enemy/boombox.png",
  "./images/enemy/glitterbomb.png",
  "./images/enemy/rainbowcake.png"
];

//ENEMY CLASS
class Enemy {
  constructor(posY) {
    this.node = document.createElement("img");
    gameBoxNode.append(this.node);
    this.node.className = "enemy";
    this.isColliding = false;

    this.x = 800;
    this.y = posY;
    this.width = 50;
    this.height = 50;

    this.node.style.width = `${this.width}px`;
    this.node.style.height = `${this.height}px`;
    this.node.style.zIndex = "4";

    this.node.style.position = "absolute";
    this.node.style.top = `${this.y}px`;
    this.node.style.left = `${this.x}px`;
  }

  move() {
    this.x -= 2;
    this.node.style.left = `${this.x}px`;
  }
}
