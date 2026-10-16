class Player {
  constructor() {
    this.node = document.createElement("div");
    gameBoxNode.append(this.node);
    this.node.className = "player";

    this.x = 200;
    this.y = 300;
    this.width = 50;
    this.height = 100;

    this.node.style.width = `${this.width}px`;
    this.node.style.height = `${this.height}px`;
    this.node.style.backgroundColor = "white";

    this.node.style.position = "absolute";
    this.node.style.top = `${this.y}px`;
    this.node.style.left = `${this.x}px`;

    this.speed = 20;
  }

  moveUp() {
    this.y -= 25;
    this.node.style.top = `${this.y}px`;
  }

  moveDown() {
    this.y += 25;
    this.node.style.top = `${this.y}px`;
  }

  duck(){
    this.y += 50;
    this.node.style.top = `${this.y}px`;
    this.node.style.height = "50px";
  }

  duckReset(){
    this.y -= 50;
    this.node.style.top = `${this.y}px`;
    this.node.style.height = "100px";
  }
}
