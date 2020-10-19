var climber, climberAnimation, mountain, mountainImage;
var stone, stone1, stone2, stone3, stone4, stoneGroup;
var snowflake, snowflake1, snowflake2, snowflake3, snowflake4, snowflake5, snowflake6, snowflake7, snowflake8, snowflake9, snowflake10, snowflakeGroup;
var replay, replayImage;
var score = 0;
var gameState = "play";
var checkpointSound, jumpSound, dieSound;
var music;
var lives = 3;
var lifeImage, life1, life2, life3;

function preload() {
  climberAnimation = loadAnimation("climber1.png", "climber2.png");
  climberStop = loadAnimation("climber1.png");
  mountainImage = loadImage("mountain.png");
  stone1 = loadImage("stone1.png");
  stone2 = loadImage("stone2.png");
  stone3 = loadImage("stone3.png");
  stone4 = loadImage("stone4.png");
  snowflake1 = loadImage("snowflake1.png");
  snowflake2 = loadImage("snowflake2.png");
  snowflake3 = loadImage("snowflake3.png");
  snowflake4 = loadImage("snowflake4.png");
  snowflake5 = loadImage("snowflake5.png");
  snowflake6 = loadImage("snowflake6.png");
  snowflake7 = loadImage("snowflake7.png");
  snowflake8 = loadImage("snowflake8.png");
  snowflake9 = loadImage("snowflake9.png");
  snowflake10 = loadImage("snowflake10.png");
  replayImage = loadImage("replay.png");
  lifeImage = loadImage("life.png");
  checkpointSound = loadSound("checkpoint.mp3");
  dieSound = loadSound("die.mp3");
  jumpSound = loadSound("jump.mp3");
  music = loadSound("music.mp3");
}

function setup() {
  createCanvas(400, 400);
  
  music.play();
  
  mountain = createSprite(100, 100);
  mountain.addImage("mountain", mountainImage);
  mountain.scale = 1;
  mountain.debug = false;
  mountain.setCollider("rectangle", -100, 200, 1000, 400, 45);
  
  climber = createSprite(300, 300);
  climber.addAnimation("climberWalking", climberAnimation);
  climber.addAnimation("climberStop", climberStop);
  climber.frameDelay = 20;
  climber.debug = false;
  climber.setCollider("circle", 0, 0, 100);
  climber.scale = 0.6;
  
  replay = createSprite(200, 50);
  replay.addImage("replay", replayImage);
  replay.scale = 0.1;
  replay.visible = false;
  
  life1 = createSprite(80, 20);
  life1.addImage("life", lifeImage);
  
  life2 = createSprite(50, 20);
  life2.addImage("life", lifeImage);
  
  life3 = createSprite(20, 20);
  life3.addImage("life", lifeImage);

  invisiGround = createSprite(200, 350, 400, 20);
  invisiGround.visible = false;
  
  snowflakeGroup = new Group();
  stoneGroup = new Group();
}

function draw() {
  background("deepskyblue");
  textSize(20);
  text("Score: " + score, 250, 20);
  
  climber.setVelocity(0, 0);
  
  if(gameState === "play"){
    mountain.setVelocity(2, 2);
    
    if(mountain.x > 300 && mountain.y > 300) {
      mountain.x = 200;
      mountain.y = 200;
    }
    score += Math.round(getFrameRate()/30);
    snowflakeCreator();
    stoneCreator();
    
    if(score % 200 === 0 && gameState === "play") {
      checkpointSound.play();
    }
    
    if(climber.isTouching(stoneGroup)) {
      climber.scale -= 0.1;
      lives -= 1;
      stoneGroup.setVelocityEach(-50, -50);
      dieSound.play();
    }

    if(lives === 3) {
      life1.visible = true;
      life2.visible = true;
      life3.visible = true;
    }

    if(lives === 2) {
      life1.visible = false;
      life2.visible = true;
      life3.visible = true;
    }
    
    if(lives === 1) {
      life2.visible = false;
      life3.visible = true;
      life1.visible = false;
    }
    
    //console.log(lives);
    
    if(lives === 0) {
      life3.visible = false;
      life2.visible = false;
      life1.visible = false;
      dieSound.play();
      gameState = "end";
    }
  }
    
  if(gameState === "end") {
    replay.visible = true;
    mountain.setVelocity(0, 0);
    stoneGroup.setLifetimeEach(-1);
    stoneGroup.setVelocityEach(0, 0);
    snowflakeGroup.setVelocityEach(0, 0);
    climber.changeAnimation("climberStop", climberStop);
  }
  
  if(mousePressedOver(replay) && gameState === "end") {
    climber.scale = 0.6;
    checkpointSound.play();
    stoneGroup.destroyEach();
    snowflakeGroup.destroyEach();
    replay.visible = false;
    life1.visible = true;
    life2.visible = true;
    life3.visble = true;
    lives = 3;
    gameState = "play"; 
    score = 0;
  }
  
  if(snowflakeGroup.isTouching(mountain)) {
    snowflakeGroup.destroyEach();
  }
   
  if(keyDown("space")) {
    climber.setVelocity(0, -15);
    jumpSound.play();
  }
  
  climber.velocityY += 2;
  
  //console.log(climber.x);
  //console.log(climber.y);
    
  climber.collide(invisiGround);

  drawSprites();
}

function snowflakeCreator() {
  if(frameCount % 50 === 0) {
    var randXY = Math.round(random(0, 400));
    var randSwitch = Math.round(random(1, 10));
    snowflake = createSprite(randXY, 0);
    snowflake.setVelocity(-2, 2);
    
    switch (randSwitch) {
      case 1: snowflake.addImage("snowflake1", snowflake1);
        break;
        case 2: snowflake.addImage("snowflake2", snowflake2);
        break;
        case 3: snowflake.addImage("snowflake3", snowflake3);
        break;
        case 4: snowflake.addImage("snowflake4", snowflake4);
        break;
        case 5: snowflake.addImage("snowflake5", snowflake5);
        break;
        case 6: snowflake.addImage("snowflake6", snowflake6);
        break;
        case 7: snowflake.addImage("snowflake7", snowflake7);
        break;
        case 8: snowflake.addImage("snowflake8", snowflake8);
        break;
        case 9: snowflake.addImage("snowflake9", snowflake9);
        break;
        case 10: snowflake.addImage("snowflake10", snowflake10);
        break;
        default: 
        break;
    }
    snowflakeGroup.add(snowflake);
    snowflake.debug = false;
  }
}

function stoneCreator() {
  if(frameCount % 100 === 0) {
    var randSwitch2 = Math.round(random(1, 4));
    stone = createSprite(0, 0);
    stone.setVelocity(5, 5);
    stone.scale = 1.5;
    stone.lifetime = 80;
    
    switch (randSwitch2) {
      case 1: stone.addImage("stone1", stone1);
        break;
        case 2: stone.addImage("stone2", stone2);
        break;
        case 3: stone.addImage("stone3", stone3);
        break;
        case 4: stone.addImage("stone4", stone4);
        break;
        default:
        break;
    }
    stoneGroup.add(stone);
    stone.debug = false;
    stone.setCollider("circle", 0, 0, 10);
  }
}