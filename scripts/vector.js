class Vector{
	constructor(vec2d){
		this.x=vec2d.x
		this.y=vec2d.y
		this.magnitude=0
	}
	normalize(){
		this.magnitude=Math.hypot(this.x,this.y)
		return {x:this.x/this.magnitude,y:this.y/this.magnitude}
	}
	add(secondVector){
		return {x:this.x+secondVector.x,y:this.y+secondVector.y}
	}
	scale(scaler){
		this.x=this.x*scaler
		this.y=this.y*scaler
	}
}
let vecAngle;
let vecMag;
let VECTOR={
	angle:(vector)=>{
		return (Math.atan2(vector.y,vector.x)) * (180 / Math.PI);
	},
	direction:(vector)=>{
		vecAngle=Math.atan2(vector.y,vector.x) * (180 / Math.PI)
		if (vecAngle >= -45 && vecAngle < 45)
	return 'right';
else if (vecAngle >= 45 && vecAngle < 135)
	return 'up';
else if (vecAngle >= -135 && vecAngle < -45)
	return 'down';
else
	return 'left';
	},
	normalize:(vector)=>{
		vecMag=Math.hypot(vector.x,vector.y)
		return {x:vector.x/vecMag,y:vector.y/vecMag}}
}


function isColliding(obj1, obj2) {
	if (obj1.x + obj1.width > obj2.x && obj2.x + obj2.width > obj1.x && obj1.y + obj1.height > obj2.y && obj2.y + obj2.height > obj1.y) {
		return true
	}
	else {
		return false
	}
}

