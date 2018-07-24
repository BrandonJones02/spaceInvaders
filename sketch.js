let alien, alienX, alienY, alienColumn, newFirstColumn, newLastColumn;
let playerX, playerY, playerShip, laser;//player related stuff
let alive;//this is the array of aliens
let spaceLives = 3; //?
let moveLeft = true; //This dictates if the block of aliens is moving left or not
let toLeft, toRight, toBottom; //This has to do with the rows and columns of the alien block.
let bulletFired, bulletX, bulletY;
let theme;
let gameMode = false;
let laserS;

function preload(){
    alien = loadImage("Graphics/Alien1.png");
    playerShip = loadImage("Graphics/Player.png");
    theme = loadSound("Sounds/newTheme.mp3");
    laser = loadImage("Graphics/Lasers.png");
    SpaceZ = loadImage("Graphics/Invader.png");
    laserS = loadSound("Sounds/shootingEffect.mp3");
}

function setup () {
  createCanvas(700 , 700);
  background(30);
  alienColumn = 5;//Sets how many aliens will be in the column
  alive = new Array(alienColumn);
  alienX = 20; alienY = 20;//Sets the starting posions of the alien block starting from the top right
  newFirstColumn = 0;
  bulletFired = false;
  setUpAliens();
  newLastColumn = alive[0].length - 1;
  theme.play();

    playerX = 350;
    playerY = 650;

    toLeft = alienX + (newFirstColumn + 1) * 40;
    toRight = alienX + (newLastColumn + 1) * 40;
    toBottom = alienY + (alive[0].length + 1) * 40;
  
}

function draw () {
    if(!gameMode){ 
        stroke("White");
        strokeWeight(8);
        fill(0)
        rect(0,0,600,600)   
        image(SpaceZ, 150,100,250,250)
        noStroke()
        rect(200,250,150,150)
        rect(200,250,50,30)
        fill(255);
        text("Click to start game.",250,310);
    }else{
        if(!theme.isPlaying()){
            theme.play();
                }
                rectMode(CORNER);
                background(30);
              alienBlockMove();
              reDeclare();
              playerMovement();
              image(playerShip, playerX, playerY);
              image(laser, bulletX, bulletY);
              createAlienBLock();
              bulletY -= 5;

    }
    
}

function keyPressed() {
    if (keyCode === 13) {
    gameMode = true;
  }
  if(keyCode == 32){
    laserS.play();
    bulletX = playerX + 36;
    bulletY = playerY - 10;   
}
}

function playerMovement(){
    if(keyIsDown(RIGHT_ARROW) && playerX < 640){
          playerX += 5;
      }
    if(keyIsDown(LEFT_ARROW) && playerX > -15){
          playerX -= 5;
      }
    if(keyIsDown(UP_ARROW)){
          playerY -= 5;
      }
      if(keyIsDown(DOWN_ARROW)){
          playerY += 5;
      }
    image(playerShip, playerX, playerY);
  }


function setUpAliens () {
  for (let x = 0; x < alive.length; x++) {
    alive[x] = Array(10);
    for (let y = 0; y < alive[x].length; y++) {
      alive[x][y] = true;
      
    }
  }

  for (let i = 0; i < alive.length; i++) {
    console.log(alive[i]);
  }
}

function createAlienBLock () {
    imageMode(CORNER);
  let row = 0;
  let column = 0;
  for (let x = 0; x < alive.length; x++) {
    for (let y = 0; y < alive[x].length; y++) {
      if (alive[x][y] == true) {
        image(alien, alienX + row, alienY + column);
        row += 40;
      }else{
          row += 40;
      }
    }
    row = 0;
    column += 30;
  }
}

function alienBlockMove(){
    if(moveLeft == true){
        if(toLeft < 5){
            moveLeft = false;
            moveDown();
        }else{
            alienX -= .9;
        }
    }else{
        if(toRight > 660){
            moveLeft = true;
            moveDown();
        }else{
            alienX += .9;
        }
    }

}
function moveDown(){
    alienY += 20;
}



//   function checkArray(){
//       let d = 0;
//         for(let y = 0; y < alive[newFirstColumn].length; y++){
//             if(alive[newFirstColumn] == false){
//                 d++;
//                 console.log(d);
//             }
//             if(d == alive[newFirstColumn].length){
//                 newFirstColumn += 1;
//             }
//         }
        
//         d = 0;
//         for(let x = 0; x < alive[newLastColumn]; x++){
//             if(alive[newLastColumn] == false){
//                 d++;
//                 console.log(d);
//             }
//             if(d == alive[newLastColumn].length){
//                 newLastColumn -= 1;
//             }
//         }
      
//   }

  function reDeclare(){
    toLeft = alienX + (newFirstColumn + 1) * 40;
    toRight = alienX + (newLastColumn + 1) * 40;
    console.log(Math.floor(toLeft) + "->" + Math.floor(toRight) + ": Difference :" + Math.floor(toRight - toLeft));
  }