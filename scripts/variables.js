let app;
let treeTexture;
let side_walking
let side_idle
let grassTexture;
let evidentSpriteSheet
let main_container;
let chunk_columns=100
let chunk_rows=100
let chunks={}
let chunksArray=[]
let size=1024
let offScreenCanvas=[]
let players={main:{x:0,y:0}}
const TILES=16
let playerSpeed = 5
let camera = { x: 0, y: 0 }
let dashImg;
let dashAnimation;
let playerName
let dashForward
let chatOpen=false