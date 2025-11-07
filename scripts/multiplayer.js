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
function multiplayer() {
if (srch.get('state') == 'multiplayer') {
	firebase.initializeApp(firebaseConfig)
	db = firebase.database()
	db.ref().once('value').then((snap)=>{
		Object.keys(snap.val()).forEach((e)=>{
			if (playerName != e) {
players[e]=new Player({ state: snap.val()[e].state, direction: snap.val()[e].direction, scale: 1.8, x: 10, y: 10, name:e, showName: true })
db.ref(e).on('value',snap=>{
	players[e].x=snap.val().x
	players[e].y=snap.val().y
	if (players[e].direction != snap.val().direction || players[e].state != snap.val().state) {
	players[e].play({
		name: snap.val().direction + `_${snap.val().state}`
	})
	players[e].state = snap.val().state
players[e].direction = snap.val().direction
}
})


			}
			
		}
		)})
	players.main.onChange = () => {
		db.ref(playerName).set({
			x: players.main.x,
			y: players.main.y,
			state: players.main.state,
			direction: players.main.direction
		})
	}
}
}
