var Note = require('../models/note');

module.exports = {
	getNotes: (req, res)=>{
		Note.find({}, (err, notes)=>{
			if(err) {
				throw err;
			} else {
				res.json(notes);
				console.log(notes)
			};
		});
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
	}
};