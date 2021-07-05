var tower,towerImg;
var ghost,ghostImg;
var door,doorImg,climber,climberImg;
var gameState ="play";
var doorsGroup,climbersGroup,invisibleBlocksGroup;

function preload(){
  towerImg = loadImage("tower.png"); 
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
   
}

function setup(){
 createCanvas(600,600);

 tower = createSprite(300, 300);
 tower.addImage(towerImg);
 tower.velocityY=3;
 
 ghost = createSprite(200, 100, 10, 10);
 ghost.addImage(ghostImg);
 ghost.scale= 0.3;
 
 
 doorsGroup = new Group();
 climbersGroup = new Group();
 invisibleBlocksGroup = new Group();


 
}

function draw(){
    background(0);
    if(gameState === "play"){
        if(tower.y>400){
            tower.y = 300;
        }
    
        if(keyDown("left_arrow")){
            ghost.x = ghost.x -2;
        }
        if(keyDown("right_arrow")){
            ghost.x = ghost.x +2;
        }
        if(keyDown("space")){
            ghost.velocityY = -10; 
        }
        ghost.velocityY += 0.8;   
        spawnDoors();
        if(climbersGroup.isTouching(ghost)){
            ghost.velocityY = 0;
        }
        if(ghost.y>600 || invisibleBlocksGroup.isTouching(ghost)){
            gameState = "end";
        }
    } 
    if(gameState === "end"){
        ghost.destroy();
        tower.destroy();
        climbersGroup.destroyEach();
        doorsGroup.destroyEach();
        invisibleBlocksGroup.destroyEach();
        stroke("yellow");
        fill("yellow");
        textSize(30);
        text("Game Over", 230,250)
        
    }

    drawSprites();
}

function spawnDoors(){
    if(frameCount% 200 === 0){
        var door = createSprite(200,-50);
        door.addImage(doorImg);
        door.velocityY = 3;
        door.x = Math.round(random(120,400));
        door.lifetime = 300;
        doorsGroup.add(door);

        var climber = createSprite(200,10);
        climber.addImage(climberImg);
        climber.x = door.x;
        climber.velocityY = 3;
        climber.lifetime= 300;
        climbersGroup.add(climber);

        var invisibleBlock = createSprite(200,15);
        invisibleBlock.width = climber.width;
        invisibleBlock.height = 2;
        invisibleBlock.velocityY = 3;
        invisibleBlock.lifetime= 300;
        invisibleBlocksGroup.add(invisibleBlock);
        invisibleBlock.x = door.x;
        invisibleBlock.debug= true;

        ghost.depth = door.depth;
        ghost.depth +=1;
    }
}