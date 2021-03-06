var PLAY = 1;
var GAMEOVER = 0;
var gameState = 1;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0;
var ground;
var forestbk;
var groundnon;
var gameOver;
var camera;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  forestbkImage = loadImage("forestback.png");
  groundnonImage = loadImage("assest-1.png");
  gameOverImage = loadImage("game Over.png");
}



function setup() {
  createCanvas(displayWidth + 100,displayHeight + 50);
  monkey = createSprite(width/8,height - 400,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1 * width/600;
  
  ground = createSprite(width/8,height - 300,width,10);
  ground.x = ground.width/2;
  ground.visible = false;
  
  forestbk = createSprite(100,240,displayWidth,displayHeight);
  forestbk.x = forestbk.width/2;
  forestbk.addImage(forestbkImage);
  forestbk.depth = monkey.depth - 1;
  forestbk.scale = 1.6 * width/600;
  groundnon = createSprite(width/2,height - 200,600,10);
  groundnon.x = groundnon.width/2;
  groundnon.addImage(groundnonImage);
  groundnon.depth = monkey.depth - 1;
  groundnon.scale = 2.8 * width/600;
  
  gameOver = createSprite(290,130);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 0.3;
  gameOver.visible = false;
  
  
  obstacleGroup = new Group();
  FoodGroup = new Group();
}


function draw() {
  background("black");
  
  if(gameState === 1)
    {
       monkey.collide(ground);
      if(ground.x < 0)
        {
          ground.x = ground.width/2;
        }
      if(forestbk.x < 0)
        {
          forestbk.x = forestbk.width/2;
        }
      if(groundnon.x < 0)
        {
          groundnon.x = groundnon.width/2;
        }
      if(keyDown("space"))
        {
          monkey.velocityY = -12 * width/600;
        }
      if(monkey.isTouching(FoodGroup))
        {
          FoodGroup.destroyEach();
          score = score + 2;
          monkey.scale = monkey.scale + 0.004;
        }
      if(monkey.isTouching(obstacleGroup))
        {
          if(frameCount%40 === 0)
            {
              monkey.scale = monkey.scale - 0.008 * width/600;
            }
        }
  
      monkey.velocityY = monkey.velocityY + 1;
      spawnbanana();
      spawnobstacle();
      if(monkey.scale < 0.076 * width/600)
        {
          gameState = 0;
        }
        camera.x = monkey.x;
    }
  else if(gameState === 0)
    {
      monkey.velocityY = 0;
      FoodGroup.destroyEach();
      obstacleGroup.setLifetimeEach(-1);
      obstacleGroup.setVelocityXEach(0);
      forestbk.velocityX = 0;
      groundnon.velocityX = 0; 
      gameOver.visible = true;
      if(keyDown("space"))
        {
          reset();
        }
      
    }
  
  
  drawSprites();
  textSize(14 * width/600);
  stroke("brown");
  fill("brown");
  text("Score : " + score,width/8,height/15);
}

function spawnbanana()
{
  if(frameCount%150   === 0)
    {
      banana = createSprite(width+10,Math.round(random(height/2 - height/10,height/2 + height/7)),20,20);
      banana.addImage(bananaImage);
      banana.scale = 0.1 * width/800;
      banana.velocityX = -4;
      banana.lifetime = 150 * width/4;
      
      FoodGroup.add(banana); 
    }
  
}

function spawnobstacle()
{
  if(frameCount%200 === 0)
    {
      obstacle = createSprite(width,height - height/4,20,20);
      obstacle.addImage("obstacle",obstacleImage);
      obstacle.scale = 0.13 * width/600;
      obstacle.velocityX = -4;
      obstacle.lifetime = 150 * width/4;
      
      obstacleGroup.add(obstacle);
    }
  
}

function reset()
{
  obstacleGroup.destroyEach();
  gameState = PLAY;
  obstacleGroup.setVelocityXEach(-4);
  FoodGroup.setVelocityXEach(-4);
  monkey.scale = 0.1 * width/600;
  forestbk.velocityX = -4;
  groundnon.velocityX = -4;
  score = 0;
  gameOver.visible = false;
}


