class Player {
  constructor() {
    //this.node = document.createElement("div");
    this.node = document.createElement("img");
    this.node.src = "/images/characterRun1.png"
    gameBoxNode.append(this.node);
    this.node.className = "player";

    this.x = 200;
    this.y = 250;
    this.width = 50;
    this.height = 100;

    this.node.style.width = `${this.width}px`;
    this.node.style.height = `${this.height}px`;
    //this.node.style.backgroundColor = "white";

    this.node.style.position = "absolute";
    this.node.style.top = `${this.y}px`;
    this.node.style.left = `${this.x}px`;

    this.speed = 20;

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

  changeSprite(){
    if (this.node.src.endsWith("characterRun1.png")){
      this.node.src = "/images/characterRun2.png";
    } else if (this.node.src.endsWith("characterRun2.png")){
      this.node.src = "/images/characterRun1.png";
    }
  }
}
