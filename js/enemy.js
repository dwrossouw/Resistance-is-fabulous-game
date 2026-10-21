const enemiesAirArr = [
  "./images/smallflags.png",
  "./images/discoball.png",
  "./images/featherboa.png",
  "./images/glittercloud.png",
  "./images/smallflags.png",
  "./images/heart.png",
];
const enemiesGroundArr = [
  "./images/cupcake.png",
  "./images/flowers.png",
  "./images/megaphone.png",
  "./images/prideflag.png",
  "./images/paint.png",
  "./images/skates.png",
];

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
