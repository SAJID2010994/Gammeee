let srch = new window.URLSearchParams(window.location.search)
let pending;
let connections=[]
playerName=srch.get('name')
let peer;
let con;
let MyId=null
let hostId=srch.get('id')
if (srch.get('state')=='join') {
	peer = new Peer()
	peer.on('open', (myid) => {
		MyId=myid
	con = peer.connect(hostId)
	con.on('open', () => {
	  con.send({
	    type:'create',
	    name:playerName,
	    id:MyId
	  })
		players.main.onChange = () => {
			con.send({
			  type:'state',
				x: players.main.x,
				y: players.main.y,
				direction: players.main.direction,
				state: players.main.state,
				id:MyId
			})
		}
		con.on('data', (data) => {
		  if(data.type=='state'){
		    players[data.id].x = data.x
			players[data.id].y = data.y
			if (players[data.id].direction != data.direction || players[data.id].state != data.state) {
				players[data.id].play({
					name: data.direction + `_${data.state}`,
					loop: true,
					speed: 0.15
				})
				players[data.id].state = data.state
				players[data.id].direction = data.direction
			}
		  }
		  else if(data.type=='create') {
  players[data.id]=new Player({state:'idle',direction:'down',scale:1.8,x:10,y:10,name:data.name})
}
			})
		
	})
})
}
else if(srch.get('state')=='host'){
	peer = new Peer()
	peer.on('open',(id)=>{
		MyId=id
		copy(id)
	})
	peer.on('connection',(c)=>{
		alert('Connected')
		connections.push(c)
		c.on('open',()=>{
			alert('opened')
			c.send({
	type: 'create',
	name: playerName,
	id:MyId
})
		})
		c.on('data',(data)=>{
			connections.forEach((e) => {
	if (data.id != e.peer) {
		e.send(data)
	}
})
		  if (data.type=='state') {
				players[data.id].x = data.x
				players[data.id].y = data.y
				if (players[data.id].direction != data.direction || players[data.id].state != data.state) {
				  players[data.id].play({
				    name: data.direction + `_${data.state}`
				  })
				  players[data.id].state = data.state
				  players[data.id].direction = data.direction
				}
		  }
		  else if(data.type=='create'){
		    players[data.id]=new Player({state:'idle',direction:'down',scale:1.8,x:10,y:10,name:data.name})
		  }
		})
		players.main.onChange = () => {
			connections.forEach((e)=>{
				e.send({
	type: 'state',
	x: players.main.x,
	y: players.main.y,
	direction: players.main.direction,
	state: players.main.state,
	id: MyId
})
			})
}
	})
}
function copy(text) {
	navigator.clipboard.writeText(text)
		.then(() => {
			alert("Your id has been copied to the coied to the clipboard!");
		})
		.catch(err => {
			console.error("Failed to copy: ", err);
		});
}