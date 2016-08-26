var mongoose = require('mongoose');

var noteSchema = mongoose.Schema({
	title: {type: String},
	description: {type: String},
	vidThumb: {type: String},
	cueNote: {type: String},
	cueTime: {type: Number},
	timeAdded: {
        type: Number,
        default: () => {
            return Date.now(); 
    	}
    },
	userId: {
		type : mongoose.Schema.ObjectId, 
		ref: 'User'
	},
	videoId: {
		type: mongoose.Schema.ObjectId,
		ref: 'Video'
	}
});

module.exports = mongoose.model('Note', noteSchema);