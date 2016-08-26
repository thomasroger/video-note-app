var UserNotes = require('../models/user-notes');

module.exports = {
	getUserNotes: (req,res) =>{
		UserNotes.find({})
				.populate('notesId')
				.exec((err, notes) =>{
					res.json(notes)
				});
	}
}