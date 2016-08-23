var noteCtrl = require('./note-api');
var videoCtrl = require('./video-api');

module.exports = (app) => {
	app.get('/', (req,res) => {
		res.sendFile('home.html', {root: './public/'})
	});

	// Insert and retrieve notes
	app.get('/api/note', noteCtrl.getNotes);
	app.post('/api/note', noteCtrl.upsert);
	// Insert and retrieve videos
	app.get('/api/video', videoCtrl.getVideos);
	app.post('/api/video', videoCtrl.upsert);
}