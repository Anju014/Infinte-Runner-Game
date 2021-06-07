var score = 0
var gameState = "play"

function preload(){
  backgroundImg = loadImage('ground.jpg')
  kidImg = loadAnimation('kid1.png','kid2.png','kid3.png')
  coinImg = loadImage('coin.png')
  obsImg = loadImage('obstacle.png')
}

function setup() {
  createCanvas(displayWidth,displayHeight/2);
  
  ground = createSprite(0,0,400,400)
  ground.addImage(backgroundImg)
  ground.scale = 1.5;
  
  
  kid = createSprite(40,330,10,30)
  kid.addAnimation('kids',kidImg)
  kid.scale=0.8
  
  invisibleGround = createSprite(250,390,500,20)
  invisibleGround.visible = false;
  
  coinsGroup = new Group();
  obsGroup = new Group();
}

function draw() {
  background(220);

  camera.position.x = displayWidth/2
  camera.position.y = kid.y
  
  if(gameState === "play"){
    ground.velocityX = -3;
  
    if(ground.x<0){
      ground.x = ground.width/2;
    }
    
    if(keyDown("space")){
      kid.velocityY = -10;
    }
    kid.velocityY = kid.velocityY + 0.8
    
    if(kid.isTouching(coinsGroup)){
      coinsGroup.destroyEach()
      score = score + 1
    }

    if(kid.isTouching(obsGroup)){
      gameState = "end"
    }

    spawnCoins();
    spawnObstacle()
  }
  else if(gameState === "end"){
    ground.velocityX = 0;
    kid.velocityY = 0;
    coinsGroup.setVelocityXEach(0)
    obsGroup.setVelocityXEach(0)
    coinsGroup.setLifetimeEach(-1)
    obsGroup.setLifetimeEach(-1)  
  }

  
  kid.collide(invisibleGround)

  drawSprites();
  if(gameState === "end"){
    background("lightGreen");
    fill("black")
    textSize(40)
    text("Game Over", 500, 250)
  }
  textSize(15)
  text("Score: "+ score, displayWidth-100,displayHeight/4)
}

function spawnCoins(){
  if(frameCount % 150 === 0){
    coin = createSprite(displayWidth-10,random(220,270),20,20)
    coin.addImage(coinImg)
    coin.scale = 0.5
    coin.velocityX = -(3+3*score/100);
    coin.lifetime = 500;
    coinsGroup.add(coin)
  }
}

function spawnObstacle(){
  if(frameCount % 120 === 0){
    obs = createSprite(displayWidth-10,random(340,400),20,20)
    obs.addImage(obsImg)
    obs.scale = random(0.6,0,9)
    obs.velocityX = -(3+3*score/100);
    obs.lifetime = 500;
    obsGroup.add(obs)
  }
}