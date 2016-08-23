var mongoose = require('mongoose');

var noteSchema = mongoose.Schema({
	title: {type: String},
	description: {type: String},
	video: {
		type : mongoose.Schema.ObjectId, 
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