let chunk1;
	fetch(`chunk_data/chunk1.json`).then(data => {
	data.json().then(t => {
		chunk1=t
	})
})