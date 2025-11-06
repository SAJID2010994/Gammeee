let movement=1
let isPlaying=true
let joyd={x:0.5,y:0.5,direction:'down'}
window.onresize=()=>{
HalfCanvas = {
  width: Math.floor(window.innerWidth / 2),
  height: Math.floor(window.innerHeight / 2)
}
}
let HalfCanvas={
  width:Math.floor(window.innerWidth/2),
  height:Math.floor(window.innerHeight/2)
}
function playerControl() {
	if (movement==1) {
		players.main.walk(joyd)
		}
		camera.x = players.main.x - HalfCanvas.width
		camera.y = players.main.y-HalfCanvas.height
		main_container.x = -camera.x
    main_container.y = -camera.y

}

const joystick = nipplejs.create({
  zone:document.getElementById('zone'),
  mode: 'static',
  position: {left:'100px',bottom:"100px"},
  color: 'white',
  size: 120,
  className:'abc',
  restOpacity:1,
});
joystick.on('move', (evt, data) => {
 try{
joyd.x = data.vector.x * playerSpeed
joyd.y = data.vector.y * playerSpeed
joyd.direction=data.direction.angle
movement = 1
 }catch(e){}
  })
joystick.on('end', (evt, data) => {

  joyd.x=0
  joyd.y=0
  movement=0
  players.main.idle()
})
function movePlayer(vector,Direction) {
  player.y += Math.floor(vector.y)
camera.y = player.y - HalfCanvas.height
player.x += Math.floor(vector.x)
camera.x = player.x - HalfCanvas.width
main_container.x = -camera.x
main_container.y = -camera.y
  if (Direction!= direction) {
    direction = Direction
    Current_direction=Direction
    player.sprite.scale.x = player_animation[Direction].scale.x
    player.sprite.scale.y = player_animation[Direction].scale.y
    player.sprite.textures = player_animation[Direction].animation
    player.sprite.play()
  
}}