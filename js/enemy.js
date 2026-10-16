class Enemy {
  constructor(posY) {
    this.node = document.createElement("div");
    gameBoxNode.append(this.node);
    this.node.className = "enemy";

    this.x = 750;
    this.y = posY;
    this.width = 50;
    this.height = 50;

    this.node.style.width = `${this.width}px`;
    this.node.style.height = `${this.height}px`;
    this.node.style.backgroundColor = "red";
    this.node.style.border = "solid white 2px";

    this.node.style.position = "absolute";
    this.node.style.top = `${this.y}px`;
    this.node.style.left = `${this.x}px`;
  }

  move() {
    this.x -= 2;
    this.node.style.left = `${this.x}px`;
  }
}
