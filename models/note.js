var mongoose = require('mongoose');

var noteSchema = mongoose.Schema({
	title: {type: String},
	description: {type: String},
	videoUrl: {type: String},
	vidThumb: {type: String},
	videoId: {
		type : mongoose.Schema.ObjectId,
		ref: 'Video' 
	},
	userId: {
		type : mongoose.Schema.ObjectId, 
		ref: 'User'
	},
	cueNote: {type: String},
	cueTime: {type: Number},
	timeAdded: {
        type: Number,
        default: () => {
            return Date.now(); 
        }
    }
});

module.exports = mongoose.model('Note', noteSchema);