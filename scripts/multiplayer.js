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
document.getElementById('inpBox').onkeydown=(e)=>{
  if (e.keyCode==13) {
    sendMesaage(document.getElementById('inpBox').value)
    document.getElementById('inpBox').value=null
  }
}
function sendMesaage(msg) {
  var label=document.createElement('label')
  label.innerText="<"+playerName+'>'+msg
  document.querySelector('.messages').appendChild(label)
  if (srch.get('state') == 'multiplayer') {
    db.ref(`players/chat/${playerName}`).set(msg)
  }
}
function addPlayer(pName,data) {
		players[pName] = new Player({scale: 1.8, x:10, y: 10, name: pName, showName: true })
	
	//Setting a listener
	db.ref(`players/container/${pName}`).on('value',snap=>{

	players[pName].x = snap.val().x
	players[pName].y = snap.val().y
	if (players[pName].direction != snap.val().direction || players[pName].state != snap.val().state) {
		players[pName].play({
			name: snap.val().direction + `_${snap.val().state}`
		})
		players[pName].state = snap.val().state
		players[pName].direction = snap.val().direction
	}
	

	})
}
function multiplayer() {
if (srch.get('state') == 'multiplayer') {
firebase.initializeApp(firebaseConfig)
db = firebase.database()

db.ref('players/chat').on('child_changed',snap=>{
	if (snap.key!=playerName) {
		var label = document.createElement('label')
label.innerText = "<" + snap.key + '>' + snap.val()
document.querySelector('.messages').appendChild(label)
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
	if (snap.val() != null) {
		players.main.x = snap.val().x
		players.main.y = snap.val().y
		players.main.onChange()
		db.ref(`players/justJoined`).set(playerName)
	} else {
		db.ref(`players/justJoined`).set(playerName)
		players.main.onChange()
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

}
}