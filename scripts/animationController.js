function playAnimation(data) {
	
	data.sprite.scale.x = data.src[data.name].scale.x
	data.sprite.scale.y = data.src[data.name].scale.y
	data.sprite.textures = data.src[data.name].animation
	data.sprite.loop = data.src[data.name].loop
	data.sprite.animationSpeed=data.src[data.name].speed
	data.sprite.play()
}
