var ground, player, playerImage, groundImage, fireImage, obstacle, coinImage, invisibleGround, coinsGroup,
 obstaclesGroup, score, gameState = "play", gameOver, gameOverImage, coinSound, dieSound, jetpackSound;

function preload(){
playerImage = loadImage("player.png")
groundImage = loadImage("background game.png")
fireImage = loadImage("obstacles (1).png")
coinImage = loadImage("coin.png")
gameOverImage = loadImage("Game over.png")
coinSound = loadSound("checkPoint.mp3");
dieSound = loadSound("game over.wav")
jetpackSound = loadSound("jump.mp3")

}


function setup() {
createCanvas(windowWidth, windowHeight);
ground = createSprite (width/2, height-900);
ground.visible = true;
player = createSprite (50, height-500, 50, 50);
invisibleGround = createSprite(width/2, height-50, width, 100);
invisibleGround.visible = false;
score = 0;
gameOver = createSprite(width/2,350);
gameOver.addImage(gameOverImage);
gameOver.visible = false;
gameOver.scale = 1.5;
player.debug = true;
ground.debug = true;

coinsGroup = new Group();
obstaclesGroup = new Group();

ground.velocityX = -3;

player.addImage(playerImage);
player.scale = 0.3;
ground.addImage(groundImage);
ground.scale = 2.5;
ground.x = ground.width/2
}

function draw() {
  background(0,0,0);


console.log (player.y)


if(gameState==="play"){

  if(touches.length > 0 ||keyDown ("space") && player.y  >= 10){
    player.velocityY = -10; 
    jetpackSound.play();
   touches = [];
   }

  if(ground.x<380){
    ground.x = ground.width/2
  }
  obstacles();
  coins();
  if(coinsGroup.isTouching(player)){
    coinSound.play();
    coinsGroup[0].destroy();
    score = score+1
  }
  if(obstaclesGroup.isTouching(player)){
    
   gameState = "end";
   dieSound.play();
    }
}


else if(gameState==="end"){
gameOver.visible = true;
ground.visible = false;
coinsGroup.destroyEach();
obstaclesGroup.destroyEach();

ground.velocityX = 0;

background(0);

// textSize(60)
//     fill("white")
//     text("Game Over", 470,410);
}

  
  
  player.velocityY = player.velocityY+1; 
  player.collide(invisibleGround);    
  
  

  
  //obstacles2();



 

  

  drawSprites ();
  fill("white");
  textSize(30)
  text("Score "+score, 980, 90)

  

}

function obstacles(){
if(frameCount % 160 === 0){
var obstacle = createSprite(Math.round(random(200, 1000)),Math.round(random(50,650)),100,100);
obstacle.velocityX = -6;
obstacle.addImage(fireImage)
obstaclesGroup.add(obstacle)
obstacle.lifetime = 200;	
}	
}

function coins(){
if(frameCount % 100 === 0){
  var coin = createSprite(1200,Math.round(random(50,650)),100,100);
  coin.velocityX = -6;
  coin.addImage(coinImage)
  coin.scale = 0.3;
  coinsGroup.add(coin)
  coin.lifetime = 200;
}
}

// function obstacles2(){
//   if(frameCount % 160 === 0){
//   var obstacle2 = createSprite(Math.round(random(200, 1000)),50, 100, 100);
//   obstacle2.velocityY = +6;
//   obstacle2.addImage(fireImage)
//   obstaclesGroup.add(obstacle2)
//   obstacle2.lifetime = 200;	
//   }	
//   }
