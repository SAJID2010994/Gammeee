let srch = new window.URLSearchParams(window.location.search)
playerName=srch.get('name')
let firebaseConfig = {
  apiKey: "AIzaSyAgh6tgMLRw3lorvn8jB_OYeHUEfxsaYg4",
  authDomain: "web-app-3b97c.firebaseapp.com",
  databaseURL: "https://web-app-3b97c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "web-app-3b97c",
  storageBucket: "web-app-3b97c.firebasestorage.app",
  messagingSenderId: "387841859965",
  appId: "1:387841859965:web:ef75d55497dddc882a6c14"
};
let firebaseApp
let db

function lerp(a, b, t) {
	return a + (b - a) * t;
}
document.getElementById('inpBox').onkeydown=(e)=>{
  if (e.keyCode==13) {
    sendMesaage(document.getElementById('inpBox').value)
    document.getElementById('inpBox').value=null
  }
}
function sendMesaage(msg) {
  var label1=document.createElement('label')
  label1.innerText="<"+playerName+'>'+msg
	var label2 = document.createElement('label')
	label2.innerText = "<" + playerName + '>' + msg
  document.querySelector('.messages').appendChild(label1)
  document.querySelector('.msgs').appendChild(label2)
  setTimeout(()=>{document.querySelector('.msgs').removeChild(label2)},10000)
  
  
  
  if (srch.get('state') == 'multiplayer') {
    db.ref(`players/chat/${playerName}`).set(msg)
  }
}
const ORIGINAL_TINT = players.main.tint;
function flashRedInstant(player, duration) {
	player.tint = 0xFF0000;
	clearTimeout(player._flashTimeout);
	player._flashTimeout = setTimeout(() => {
		player.tint = ORIGINAL_TINT;
		delete player._flashTimeout;
	}, duration);
}


function attackPlayer() {
	Object.keys(players).forEach(e => {
		if (e!='main') {
			if (circleRectCollision(players.main.x, players.main.y, 256, players[e].x, players[e].y, 64, 64)) {
	if (players.main.direction == VECTOR.direction({ x: players[e].x - players.main.x, y: players.main.y - players[e].y })) {
		db.ref(`players/gettingDamaged/${e}`).update({ value: 5, updatedAt: Date.now(), x: joyd.x, y: joyd.y })
	}
}
		}
	})
}
function addPlayer(pName,data) {
		players[pName] = new Player({scale: 1.8, x:10, y: 10, name: pName, showName: true })





	//Setting a listener
	db.ref(`players/container/${pName}`).on('value',snap=>{
	players[pName].serverX=snap.val().x
	players[pName].serverY=snap.val().y
	players[pName].playerConatiner.zIndex = snap.val().y
	
	if (players[pName].direction != snap.val().direction || players[pName].state != snap.val().state) {
		players[pName].play({
			name: snap.val().direction + `_${snap.val().state}`
		})
		players[pName].state = snap.val().state
		players[pName].direction = snap.val().direction
	}
	

	})
}
function movePlayers() {
	Object.keys(players).forEach(e=>{
		if (e!='main') {
			players[e].x = lerp(players[e].x, players[e].serverX, 0.16)
			players[e].y = lerp(players[e].y, players[e].serverY, 0.16)
			
		}
	})
}
function multiplayer() {
if (srch.get('state') == 'multiplayer') {
firebase.initializeApp(firebaseConfig)
db = firebase.database()







db.ref('players/chat').on('child_changed',snap=>{
	if (snap.key!=playerName) {
		var label1 = document.createElement('label')
		label1.innerText = "<" + snap.key + '>' + snap.val()
		var label2=document.createElement('label')
		label2.innerText = "<" + snap.key + '>' + snap.val()
		document.querySelector('.messages').appendChild(label1)
		document.querySelector('.msgs').appendChild(label2)
		setTimeout(()=>{document.querySelector('.msgs').removeChild(label2)},10000)
	}
})



db.ref('players/justJoined').on('value',snap=>{
	if (snap.val()!=playerName) {
addPlayer(snap.val())
	}
	})
db.ref('players/justLeft').on('value',snap=>{
	if (playerName!=snap.val()) {
		try {
			players[snap.val()].container.destroy()
			db.ref(`players/container/${snap.val()}`).off()
delete players[snap.val()]
		} catch (e) {}
	}
		
	})
db.ref('players/justLeft').onDisconnect().set(playerName)
db.ref(`players/online/${playerName}`).onDisconnect().remove()
players.main.onChange = () => {
	db.ref(`players/container/${playerName}`).update({
		x: players.main.x,
		y: players.main.y,
		state: players.main.state,
		direction: players.main.direction
	})
}
db.ref(`players/container/${playerName}`).once('value').then((snap) => {
	
	
	
	
	if (snap.val() != null || snap.val() != undefined) {
		players.main.x = snap.val().x
		players.main.y = snap.val().y
		db.ref(`players/container/${playerName}`).update({
	x: players.main.x,
	y: players.main.y,
	state: players.main.state,
	direction: players.main.direction,
	knockback:{x:0,y:0},
	damage:0
})
		db.ref(`players/justJoined`).set(playerName)
	} else {
		db.ref(`players/justJoined`).set(playerName)
		db.ref(`players/container/${playerName}`).update({
	x: players.main.x,
	y: players.main.y,
	state: players.main.state,
	direction: players.main.direction,
	knockback: { x: 0, y: 0 },
	damage: 0
})
	}
	
	
	
	
	




})
db.ref('players').once('value').then(snap=>{
	Object.keys(snap.val().online).forEach(e=>{
		if (e!=playerName) {
			addPlayer(e)
		}
	})
})
db.ref('players/justJoined').set(playerName)
db.ref(`players/online`).update({[playerName]:1})

db.ref(`players/gettingDamaged`).on('child_changed',e=>{
	if (e.key==playerName) {
	flashRedInstant(players.main.sprite, 120)
	players.main.x += e.val().x * 10
	players.main.y -= e.val().y * 10
	players.main.onChange()
	players.main.health -= e.val().value

	}else{
		flashRedInstant(players[e.key].sprite, 120)
	}
})






}
}