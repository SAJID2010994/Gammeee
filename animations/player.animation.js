function ANIMATION_player(param) {
  side_walking=[
  new PIXI.Texture({source:evidentSpriteSheet,frame:new PIXI.Rectangle(0,0,64,64)}),new PIXI.Texture({source:evidentSpriteSheet,frame:new PIXI.Rectangle(64,0,64,64)}),new PIXI.Texture({source:evidentSpriteSheet,frame:new PIXI.Rectangle(128,0,64,64)}),new PIXI.Texture({source:evidentSpriteSheet,frame:new PIXI.Rectangle(192,0,64,64)}),new PIXI.Texture({source:evidentSpriteSheet,frame:new PIXI.Rectangle(256,0,64,64)}),new PIXI.Texture({source:evidentSpriteSheet,frame:new PIXI.Rectangle(320,0,64,64)}),new PIXI.Texture({source:evidentSpriteSheet,frame:new PIXI.Rectangle(384,0,64,64)}),new PIXI.Texture({source:evidentSpriteSheet,frame:new PIXI.Rectangle(448,0,64,64)})]
side_idle=[
		new PIXI.Texture({source:evidentSpriteSheet,frame:new PIXI.Rectangle(0,64,64,64)}),new PIXI.Texture({source:evidentSpriteSheet,frame:new PIXI.Rectangle(64,64,64,64)}),new PIXI.Texture({source:evidentSpriteSheet,frame:new PIXI.Rectangle(128,64,64,64)}),new PIXI.Texture({source:evidentSpriteSheet,frame:new PIXI.Rectangle(192,64,64,64)}),new PIXI.Texture({source:evidentSpriteSheet,frame:new PIXI.Rectangle(256,64,64,64)}),new PIXI.Texture({source:evidentSpriteSheet,frame:new PIXI.Rectangle(320,64,64,64)}),new PIXI.Texture({source:evidentSpriteSheet,frame:new PIXI.Rectangle(384,64,64,64)}),new PIXI.Texture({source:evidentSpriteSheet,frame:new PIXI.Rectangle(448,64,64,64)})]
players.animation={
	right_idle:{animation:side_idle,scale:{x:-2,y:2},loop:true,speed:0.15},
  right_walk:{animation:
  side_walking,scale:{x:-2,y:2},loop:true,speed:0.15},
  left_idle:{animation:side_idle,scale:{x:2,y:2},loop:true,speed:0.15},
	left_walk:{
	  animation:side_walking,scale:{x:2,y:2},loop:true,speed:0.15},
  down_walk:{animation:[
    new PIXI.Texture({source:evidentSpriteSheet,frame:new PIXI.Rectangle(0,192,64,64)}),new PIXI.Texture({source:evidentSpriteSheet,frame:new PIXI.Rectangle(64,192,64,64)}),new PIXI.Texture({source:evidentSpriteSheet,frame:new PIXI.Rectangle(128,192,64,64)}),new PIXI.Texture({source:evidentSpriteSheet,frame:new PIXI.Rectangle(192,192,64,64)}),new PIXI.Texture({source:evidentSpriteSheet,frame:new PIXI.Rectangle(256,192,64,64)}),new PIXI.Texture({source:evidentSpriteSheet,frame:new PIXI.Rectangle(320,192,64,64)}),new PIXI.Texture({source:evidentSpriteSheet,frame:new PIXI.Rectangle(384,192,64,64)}),new PIXI.Texture({source:evidentSpriteSheet,frame:new PIXI.Rectangle(448,192,64,64)})],scale:{x:1.8,y:1.8},loop:true,speed:0.15},
  up_walk:{
    animation:[new PIXI.Texture({source:evidentSpriteSheet,frame:new PIXI.Rectangle(0,128,64,64)}),new PIXI.Texture({source:evidentSpriteSheet,frame:new PIXI.Rectangle(64,128,64,64)}),new PIXI.Texture({source:evidentSpriteSheet,frame:new PIXI.Rectangle(128,128,64,64)}),new PIXI.Texture({source:evidentSpriteSheet,frame:new PIXI.Rectangle(192,128,64,64)}),new PIXI.Texture({source:evidentSpriteSheet,frame:new PIXI.Rectangle(256,128,64,64)}),new PIXI.Texture({source:evidentSpriteSheet,frame:new PIXI.Rectangle(320,128,64,64)}),new PIXI.Texture({source:evidentSpriteSheet,frame:new PIXI.Rectangle(384,128,64,64)}),new PIXI.Texture({source:evidentSpriteSheet,frame:new PIXI.Rectangle(448,128,64,64)})],scale:{x:1.8,y:1.8},loop:true,speed:0.15},
  down_idle:{animation:[
    new PIXI.Texture({source:evidentSpriteSheet,frame:new PIXI.Rectangle(0,256,64,64)}),new PIXI.Texture({source:evidentSpriteSheet,frame:new PIXI.Rectangle(64,256,64,64)}),new PIXI.Texture({source:evidentSpriteSheet,frame:new PIXI.Rectangle(128,256,64,64)}),new PIXI.Texture({source:evidentSpriteSheet,frame:new PIXI.Rectangle(192,256,64,64)}),new PIXI.Texture({source:evidentSpriteSheet,frame:new PIXI.Rectangle(256,256,64,64)}),new PIXI.Texture({source:evidentSpriteSheet,frame:new PIXI.Rectangle(320,256,64,64)}),new PIXI.Texture({source:evidentSpriteSheet,frame:new PIXI.Rectangle(384,256,64,64)}),new PIXI.Texture({source:evidentSpriteSheet,frame:new PIXI.Rectangle(448,256,64,64)})],scale:{x:1.8,y:1.8},loop:true,speed:0.15},
  up_idle:{
    animation:[new PIXI.Texture({source:evidentSpriteSheet,frame:new PIXI.Rectangle(0,128,64,64)})],scale:{x:1.8,y:1.8},loop:true,speed:0.15},
  left_dash:{animation:dashAnimation,scale:{x:-2,y:2},loop:false,speed:0.19},
  right_dash:{animation:dashAnimation,scale:{x:2,y:2},loop:false,speed:0.19},
  down_dash:{animation:[
  new PIXI.Texture({source:dashForward,frame:new PIXI.Rectangle(0,0,64,64)}),new PIXI.Texture({source:dashForward,frame:new PIXI.Rectangle(64,0,64,64)})],scale:{x:1.8,y:1.8},loop:false,speed:0.19}
  
}
}