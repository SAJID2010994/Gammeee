let leftChunk={x:0,y:0}
let rightChunk={x:0,y:0} 
let topChunk={x:0,y:0}
let bottomChunk={x:0,y:0}
let topLeftChunk={x:0,y:0}
let topRightChunk={x:0,y:0}
let bottomLeftChunk={x:0,y:0}
let bottomRightChunk={x:0,y:0}
let playerVec2d={x:0,y:0}
let visibleChunks=[]
let needToLoad = []
let needToUnload=[]
let chunkToCanvas={}
let rcount;
let vis;
let currentUnloadingCanvas;
let c_chunk=''
let o_chunk=''
class chunk {
	constructor(pos) {
		this.x = pos.x
		this.y = pos.y
	}
}
for (var i = 0; i < chunk_columns; i++) {
	for (var e = 0; e < chunk_rows; e++) {
		chunks[`${e}-${i}`]=new chunk({x:e*size,y:i*size})
		
	}
}
class offCanvas {
	constructor(a,app) {
		this.container=new PIXI.Container()
		this.tilemap=new PIXI.tilemap.CompositeTilemap()
		this.container.addChild(this.tilemap)
		this.x=0
		this.y=0
		this.chunkNo=a
	
	}
}
function initializeCanvases(app,maincontainer) {
	for (var i = 0; i < 9; i++) {
	offScreenCanvas.push(new offCanvas(i,app))
	maincontainer.addChild(offScreenCanvas[i].container)
}
}
function findChunkNo(vec2d, nofrows) {
	return (vec2d.x + (vec2d.y * nofrows))
}
function VisibleChunks(vec2d,size) {
	visibleChunks=[]
	playerVec2d.x=Math.floor(vec2d.x / size)
	playerVec2d.y=Math.floor(vec2d.y / size)
	leftChunk.x=playerVec2d.x-1
	leftChunk.y=playerVec2d.y
		
	 rightChunk.x=playerVec2d.x+1
	 rightChunk.y=playerVec2d.y
	 
	 topChunk.x=playerVec2d.x
	 topChunk.y=playerVec2d.y-1
	
	 bottomChunk.x=playerVec2d.x
	 bottomChunk.y=playerVec2d.y+1
	 
	 topLeftChunk.x=playerVec2d.x-1
	 topLeftChunk.y=playerVec2d.y-1
	 
	 topRightChunk.x=playerVec2d.x+1
	 topRightChunk.y=playerVec2d.y-1
	 
	 bottomLeftChunk.x=playerVec2d.x-1
	 bottomLeftChunk.y=playerVec2d.y+1
	 
	 bottomRightChunk.x=playerVec2d.x+1
	 bottomRightChunk.y=playerVec2d.y+1
	 
visibleChunks.push(`${playerVec2d.x}-${playerVec2d.y}`)

visibleChunks.push(`${leftChunk.x}-${leftChunk.y}`)

visibleChunks.push(`${rightChunk.x}-${rightChunk.y}`)

visibleChunks.push(`${topChunk.x}-${topChunk.y}`)

visibleChunks.push(`${bottomChunk.x}-${bottomChunk.y}`)

visibleChunks.push(`${topLeftChunk.x}-${topLeftChunk.y}`)

visibleChunks.push(`${topRightChunk.x}-${topRightChunk.y}`)

visibleChunks.push(`${bottomLeftChunk.x}-${bottomLeftChunk.y}`)

visibleChunks.push(`${bottomRightChunk.x}-${bottomRightChunk.y}`)

return visibleChunks;
}
let tile;
function getTile(map,row,column) {
	return map[row+column*TILES]
}
function drawTiles(tilemap,tileset) {
	tilemap.clear()
for (var i = 0; i < TILES; i++) {
		for (var e = 0; e < TILES; e++) {
			try {
				tile = chunk1.data[i][e]
tilemap.tile(tileset, i * 64, e * 64, {
	tileWidth: 64,
	tileHeight: 64,
	u: tile[0] * 64,
	v: tile[1] * 64
})
			} catch (e){}
		}
	}
}
function loadChunks() {
	vis=VisibleChunks(players.main, size)
	chunkToCanvas={
		[offScreenCanvas[0].chunkNo]:0,
		[offScreenCanvas[1].chunkNo]:1,
		[offScreenCanvas[2].chunkNo]:2,
		[offScreenCanvas[3].chunkNo]:3,
		[offScreenCanvas[4].chunkNo]:4,
		[offScreenCanvas[5].chunkNo]:5,
		[offScreenCanvas[6].chunkNo]:6,
		[offScreenCanvas[7].chunkNo]:7,
		[offScreenCanvas[8].chunkNo]:8
	}
	loadedChunks = [
		offScreenCanvas[0].chunkNo,offScreenCanvas[1].chunkNo,offScreenCanvas[2].chunkNo,offScreenCanvas[3].chunkNo,offScreenCanvas[4].chunkNo,offScreenCanvas[5].chunkNo,offScreenCanvas[6].chunkNo,offScreenCanvas[7].chunkNo,offScreenCanvas[8].chunkNo]
	needToLoad=_.difference(vis, loadedChunks)
	needToUnload=_.difference(loadedChunks,vis)
	rcount=0
	for (var i = 0; i < needToLoad.length; i++) {
	currentUnloadingCanvas=offScreenCanvas[chunkToCanvas[needToUnload[rcount]]]
	currentUnloadingCanvas.chunk=needToLoad[rcount]
			try {
				
				currentUnloadingCanvas.container.x = chunks[needToLoad[i]].x
offScreenCanvas[i].container.y = chunks[needToLoad[i]].y
			} catch {}
			drawTiles(currentUnloadingCanvas.tilemap,grassTexture)
			rcount++
		
}

}
function currentChunk() {
   c_chunk=`${Math.floor(players.main.x / size)}-${Math.floor(players.main.y / size)}`
}
function onChunkChange(cb) {
	currentChunk()
		if (c_chunk != o_chunk) {
	o_chunk = c_chunk
	loadChunks()
}
requestAnimationFrame(onChunkChange)
}
function full() {

document.documentElement
.requestFullscreen()
.webkitRequestFullscreen()
	
}
window.ondblclick=()=>{
	try {
	 full()
	}catch(e){}
	
}