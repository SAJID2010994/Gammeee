class Player{
	constructor(data){
		this.sprite=new PIXI.AnimatedSprite(players.animation.down_idle.animation)
		this.sprite.anchor.set(0.5)
		this.playerConatiner=new PIXI.Container()
		this.playerConatiner.addChild(this.sprite)
		this.name = data.name
		if (data.showName!=false) {
this.text = new PIXI.Text({
	text: this.name,
	x: 0,
	y: -45,
	style: {
		fontSize: 13,
		fill: 0xffffff,
		fontFamily: 'mcpe'
	}
})
this.text.anchor.set(0.5)
this.playerConatiner.addChild(this.text)
		}

		main_container.addChild(this.playerConatiner)
		this.sprite.x=0
		this.sprite.y=0
		this.sprite.scale=data.scale
		this.playerConatiner.x=data.x
		this.playerConatiner.y=data.y
		this.state=data.state
		this.direction=data.direction
	}
	play(data){
		playAnimation({
			sprite:this.sprite,
			src:players.animation,
			name:data.name
		})
	}
	dash(){
		try {
			if (this.state != 'dash')
{
	playAnimation({
		sprite: this.sprite,
		src: players.animation,
		name: `${this.direction}_dash`,
	})
	this.state = 'dash'
	this.onChange()
}
		} catch (e) {

		}
}
	walk(vector){
		if(vector.direction!=this.direction || this.state!='walk'){
      this.state='walk'
      this.direction=vector.direction
this.play({
  name:vector.direction+'_walk',
  loop:true,
  speed:0.15
})
    }
		this.y -= Math.floor(vector.y)
		this.x += Math.floor(vector.x)
		this.onChange()
	}
	idle(){
		this.play({
	name: this.direction + '_idle',
	loop: true,
	speed: 0.15
})
this.state = 'idle'
this.onChange()
	}
  onChange(){}
  set x(value){
  	this.playerConatiner.x=value
  	
  }
  get x(){
  	return this.playerConatiner.x
  }
  set y(value) {
	this.playerConatiner.y = value
	
}
	get y() {
	return this.playerConatiner.y
}

}
function playerInitialize() {
players.main=new Player({state:'idle',direction:'down',scale:1.8,x:10,y:10,name:playerName,showName:false})
players.main.play({name:'down_idle',speed:.15,loop:true})
players.main.sprite.onComplete = () => {
	if (players.main.state == 'dash') {
		players.main.state = 'idle'
		playAnimation({
			sprite: players.main.sprite,
			src: players.animation,
			name: `${players.main.direction}_idle`,
		})
		players.main.onChange()
	}
}
app.ticker.add(()=>{
	if (players.main.state=='dash') {
    if (players.main.direction=='left') {
      players.main.x-=playerSpeed*8
    }
    else if(players.main.direction=='right'){
players.main.x += playerSpeed*8
    }
    else if (players.main.direction == 'down') {
	players.main.y += playerSpeed * 8
}
    players.main.onChange()
  }
  
})
}