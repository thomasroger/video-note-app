var noteCtrl = require('./note-api');
var videoCtrl = require('./video-api');

module.exports = (app) => {
	app.get('/', (req,res) => {
		res.sendFile('dashboard.html', {root: './public/views'})
	});

	app.get('/dashboard', (req,res)=>{
		res.sendFile('user-note-list.html', {root: './public/views'})
	});

	// Insert and retrieve notes
	app.get('/api/note', noteCtrl.getNotes);
	app.post('/api/note', noteCtrl.upsert);
	// Insert and retrieve videos
	app.get('/api/video', videoCtrl.getVideos);
	app.post('/api/video', videoCtrl.upsert);
}