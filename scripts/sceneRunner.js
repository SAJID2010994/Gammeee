class Scene{
  constructor(data){
    this.playerGoal=[{x:640,y:640},{x:0,y:0},{x:128,y:640},{x:640,y:64}]
    this.normalized=''
    this.currentGoalNo=0
    this.chunkNo='0-0'
  }
  play(){
    app.ticker.add(()=>{
      if (isColliding({x:player.x,y:player.y,width:64,height:64},{x:chunks[this.chunkNo].x+this.playerGoal[this.currentGoalNo].x,y:chunks[this.chunkNo].y+this.playerGoal[this.currentGoalNo].y,width:64,height:64})) {
  this.currentGoalNo++
}else{
    this.normalized = VECTOR.normalize({ x: this.playerGoal[this.currentGoalNo].x + chunks[this.chunkNo].x - player.x,y: this.playerGoal[this.currentGoalNo].y + chunks[this.chunkNo].y - player.y })
movePlayer({ x: this.normalized.x * playerSpeed, y: this.normalized.y * playerSpeed }, VECTOR.direction({ x: this.normalized.x, y: this.normalized.y * -1 }))
}
    })
     
  }
}