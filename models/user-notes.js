var mongoose = require('mongoose');

var userNotes = mongoose.Schema({
	notesId: [{type: mongoose.Schema.ObjectId, ref: 'Note'}]
	videosId: [{type: mongoose.Schema.ObjectId, ref: 'Video'}]
});

module.exports = mongoose.model('UserNote', userNotes);