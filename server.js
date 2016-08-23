var express = require('express'),
	app = express(),
	logger = require('morgan'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	port = process.env.PORT || 3131,
	Routes = require('./routes');

mongoose.connect('mongodb://localhost/video-note-app');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(logger('dev'));

Routes(app);

app.listen(port, (err) => {
	if(err) {
		console.error(err)
	} else {
		console.log(`Listening on port ${port}`)
	}
})
