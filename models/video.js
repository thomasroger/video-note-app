var mongoose = require('mongoose');

var videoSchema = mongoose.Schema({
	title: {type: String},
	description: {type: String},
	videoUrl: {type: String},
	timeAdded: {
        type: Number,
        default: () => {
            return Date.now(); 
        }
    }
});

module.exports = mongoose.model('Video', videoSchema);