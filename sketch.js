var gameState="play"
var ghost
function preload(){
 ghostImg=loadImage("ghost-standing.png") 
  towerImg=loadImage("tower.png")
  doorImg=loadImage("door.png")
   climberImg=loadImage("climber.png")
  sound=loadSound("spooky.wav")
}
function setup() {
createCanvas(600, 600);
 
  tower=createSprite(300,300,10,10)
  tower.addImage(towerImg)
   ghost=createSprite(100,300,10,10)
  ghost.addImage(ghostImg)
  ghost.scale=0.3
  tower.velocityY=2
  climberGroup=new Group()
  doorGroup=new Group()
   blockGroup=new Group()
}

function draw() {
 background("black")
  if (gameState==="play"){
   sound.play()
SpawnDoors()
  if(keyDown("left_arrow")){
   ghost.x=ghost.x-2 
     }
  if(keyDown("right_arrow")){
     ghost.x=ghost.x+2
     }
  if(keyDown("space")){
    ghost.velocityY=-5;
   }
  ghost.velocityY=ghost.velocityY+0.8
  if(tower.y>400){
     tower.y=300
     }
    if (climberGroup.isTouching(ghost)){
      ghost.velocityY=0
    }
    if(blockGroup.isTouching(ghost)||ghost.y>600){
       ghost.destroy()
      gameState="END"
       }
  
    
  drawSprites()
  }
    if(gameState==="END"){
      textSize(40)
      stroke("blue")
      strokeWeight(10)
      fill("red")
      text("Game Over",200,300)
    }
}

function SpawnDoors(){
  if(frameCount%240===0){
   door=createSprite(200,-50)
    climber=createSprite(200,10)
    block=createSprite(200,15)
    block.width=climber.width
    block.height=2
    door.x=Math.round(random(120,400))
      climber.x=door.x
    block.x=door.x
    block.debug=true
    door.addImage(doorImg)
    climber.addImage(climberImg)
    door.velocityY=1
    climber.velocityY=1
    block.velocityY=1
    block.lifetime=600
     door.lifetime=600
     climber.lifetime=600
     ghost.depth=door.depth
    ghost.depth=ghost.depth+1
     climberGroup.add(climber)
  doorGroup.add(door)
   blockGroup.add(block)
  
  }
}
