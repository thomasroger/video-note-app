var Note = require('../models/note');

module.exports = {
	getVideoNotes: (req, res)=>{
		// Find notes whose videoId match request parameter
		Note.find({'videoId': req.params.id})
			.populate('videoId')
				.exec((err, notes)=>{
					if(err){
						console.error(err)
					} else {
						res.json(notes)
					}
				})	
	},

	upsert: (req,res) =>{
		if(req.params.id){
            // Update existing document
        } else {
            // No id in the url, create a new document
            var newNote = new Note(req.body);

            // Save Note to DB
            newNote.save((err, note) =>{
                if(err){
                    throw err;
                }
                res.json(note);
            });
        };
	},

	removeVideoNotes: (req, res) =>{
		Note.find({'videoId': req.params.id}).remove((err, Note) =>{
			if(err) {
				console.error(err)
			} else {
				res.json("Successfully deleted note")
			}
			
		})
	},
	removeSingleNote: (req, res)=>{
		Note.findByIdAndRemove({'_id': req.params.id}, (err, Note) =>{
			if(err) {
				console.error(err)
			} else {
				res.json("Successfully deleted note")
			}
			
		})
	}
};