(async () =>{
  app = new PIXI.Application()
await app.init({resizeTo:window,autoDensity:true,resolution:window.devicePixelRatio||1})
document.body.appendChild(app.view)
main_container = new PIXI.Container()
app.stage.addChild(main_container)
initializeCanvases(app,main_container)
PIXI.TextureStyle.defaultOptions.scaleMode = 'nearest'
PIXI.AbstractRenderer.defaultOptions.roundPixels=true
grassTexture=await PIXI.Assets.load('textures/tilesets/grassTexture.png')
dashForward=await PIXI.Assets.load('textures/dash_down.png')
let fire=await PIXI.Assets.load('textures/fire_ball.png')
 dashImg=await PIXI.Assets.load('textures/dash.png')
 dashAnimation=[
  new PIXI.Texture({source:dashImg,frame:new PIXI.Rectangle(0,0,64,64)}),new PIXI.Texture({source:dashImg,frame:new PIXI.Rectangle(64,0,64,64)})]
evidentSpriteSheet=await PIXI.Assets.load('textures/evident_full_sheet.png')
const font = new FontFace('mcpe', 'url(a.ttf)');
await font.load();
document.fonts.add(font)
onChunkChange()

function shoot(){
  fireSprite.x=player.x
  fireSprite.y=player.y
  switch (Current_direction) {
    case 'right':
      fireSprite.alpha=1
      fireSprite.rotation=0
      fireSprite.currentFrame = 0
fireSprite.play()
      break;
    case 'left':
      fireSprite.alpha=1
      fireSprite.rotation = Math.PI
fireSprite.currentFrame = 0
fireSprite.play()
      break;
    case 'up':
fireSprite.alpha = 1
fireSprite.rotation = Math.PI *2
fireSprite.currentFrame = 0
fireSprite.play()
      break;
    case 'down':
fireSprite.alpha = 1
fireSprite.rotation = Math.PI/2
fireSprite.currentFrame = 0
fireSprite.play()
      break;
  }
  
}

ANIMATION_player()
playerInitialize()
multiplayer()
/*
let fire_animation=[
  new PIXI.Texture({source:fire,frame:new PIXI.Rectangle(0,0,64,64)}),new PIXI.Texture({source:fire,frame:new PIXI.Rectangle(64,0,64,64)}),new PIXI.Texture({source:fire,frame:new PIXI.Rectangle(128,0,64,64)}),new PIXI.Texture({source:fire,frame:new PIXI.Rectangle(192,0,64,64)}),new PIXI.Texture({source:fire,frame:new PIXI.Rectangle(256,0,64,64)}),new PIXI.Texture({source:fire,frame:new PIXI.Rectangle(320,0,64,64)}),new PIXI.Texture({source:fire,frame:new PIXI.Rectangle(384,0,64,64)}),new PIXI.Texture({source:fire,frame:new PIXI.Rectangle(448,0,64,64)}),new PIXI.Texture({source:fire,frame:new PIXI.Rectangle(512,0,64,64)}),new PIXI.Texture({source:fire,frame:new PIXI.Rectangle(576,0,64,64)}),new PIXI.Texture({source:fire,frame:new PIXI.Rectangle(640,0,64,64)}),new PIXI.Texture({source:fire,frame:new PIXI.Rectangle(704,0,64,64)}),new PIXI.Texture({source:fire,frame:new PIXI.Rectangle(768,0,64,64)})]


let fireSprite=new PIXI.AnimatedSprite(fire_animation)
fireSprite.rotation=Math.PI/2
fireSprite.anchor.set(0.5)
fireSprite.x=100
fireSprite.y=100
fireSprite.scale=6
fireSprite.animationSpeed=0.15
fireSprite.loop=false
fireSprite.play()
fireSprite.alpha=1
fireSprite.onComplete=()=>{
  fireSprite.alpha=1
}
fireSprite.zIndex=10
main_container.addChild(fireSprite)
*/

document.getElementsByTagName('canvas')[0].onclick=()=>{
  players.main.dash()
 // player.sprite.animationSpeed=0.18
  
}
let passedTime=0
app.ticker.add((dt)=>{
  passedTime+=dt.deltaMS
  if (passedTime>16) {
    players.main.dashCode()
    playerControl()
    
    
    
    passedTime=0
  }
})
})()