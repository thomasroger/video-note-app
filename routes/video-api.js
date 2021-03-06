var Video = require('../models/video');

module.exports = {
	getVideos: (req,res) =>{
		Video.find({}, (err, videos)=>{
			if(err) {
				throw err;
			} else {
				res.json(videos);
			}
		});
	},
	getCurrentVideo: (req, res) =>{
		Video.findOne({'_id':req.params.id}, (err, video) =>{
			if(err){
				console.error(err)
			} else {
				res.json(video)
			}
		});	
	},
	upsert: (req,res) =>{
		if(req.params.id){
           // Update existing document
		} else {
			// Create Documents
			var newVideo = new Video(req.body);

			// Save to mongo database
			newVideo.save((err, video)=>{
				if(err){
					throw err;
				} 
				res.json(video);
			});
		}
	},
	remove: (req, res) =>{
		Video.findByIdAndRemove(req.params.id, (err, video) =>{
			if(err) {
				console.error(err)
			} else {
				res.json("Successfully deleted video")
			}
			
		})
	}
};