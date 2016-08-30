var noteCtrl = require('./note-api');
var videoCtrl = require('./video-api');
var auth = require('./auth');

module.exports = (app) => {
	app.get('/', (req,res) => {
		res.sendFile('landing.html', {root: './public/views'})
	});


	// May not need

	// Insert and retrieve notes
	// app.get('/api/note', noteCtrl.getNotes);
	app.post('/api/note', noteCtrl.upsert);
	// Insert and retrieve videos
	app.get('/api/video', videoCtrl.getVideos);
	app.post('/api/video', videoCtrl.upsert);
	// Get notes for current video
	app.get('/api/video/:id', videoCtrl.getCurrentVideo);
	app.get('/api/notes/:id', noteCtrl.getVideoNotes);
	// Remove Videos and notes
	app.delete('/api/video/:id', videoCtrl.remove)
	app.delete('/api/note/:id', noteCtrl.removeVideoNotes)
	app.delete('/api/delete-note/:id', noteCtrl.removeSingleNote)




	// Login and Auth

	app.get('/login', auth.render);         // login page
    app.get('/logout', auth.logout);        // logout route + redirect

    app.post('/login', auth.login);         // login form submission
    app.post('/register', auth.register);   // register form submission

    app.all('/dashboard', auth.middlewares.session);
    app.get('/dashboard', (req, res) => { // if needed, break this out into a controller!
        res.sendFile('home.html', {root: './public/views'});
    });
}