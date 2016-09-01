angular.module('VideoNoteApp')
		.controller('noteController', noteController)

noteController.$inject = ['noteFactory', '$scope', '$stateParams'];

function noteController(noteFactory, $scope, $stateParams){
	var nCtrl = this;

	nCtrl.myVideo = document.getElementById('my_video_2');

	nCtrl.noteTitle = document.getElementById('note-title');
	nCtrl.noteContent = document.getElementById('note-content');
	nCtrl.vidThumnail = '';
	nCtrl.newNote = {};

	// Grab video parameter to use for database query
	nCtrl.currentVideoId = $stateParams.id

	// Get notes from noteFactory route api/notes
	nCtrl.getNotes = (videoId) => {
		noteFactory.getNotes(videoId).then((res)=>{
			nCtrl.noteList = res.data;
			console.log(nCtrl.noteList)
		});
	}

	nCtrl.getNotes(nCtrl.currentVideoId);

	// Post note to note factory
	nCtrl.postNote = (cb) =>{
		noteFactory.postNote(nCtrl.newNote).then(function(res){

			nCtrl.submitSuccess(res)
			cb()

		}, nCtrl.submitError);
	}

	    // update newNote array with res data
	// Throw error if submit fails
	nCtrl.submitSuccess = function(res) {
		console.log(res)
		nCtrl.newNote = {}
	}

	nCtrl.submitError = function(err) {
		console.log('Error submitting file', err)
	}


	// Capture video frame image 
	nCtrl.saveThumbnail = () => {
        var thecanvas = document.getElementById('thecanvas');
		var img = document.getElementById('thumbnail_img');
 		
			nCtrl.myVideo.addEventListener('pause', function(){
                        draw( nCtrl.myVideo, thecanvas, img);
                    }, false)
 
            function draw( video, thecanvas, img ){

		// get the canvas context for drawing
		var context = thecanvas.getContext('2d'); 		

		// draw the video contents into the canvas x, y, width, height
            context.drawImage( video, 0, 0, thecanvas.width, thecanvas.height);

		// get the image data from the canvas object
		// Remember to send to database

            nCtrl.vidThumbnail = thecanvas.toDataURL();
		// set the source of the img tag
		}
	};

	// Open form and capture snapshot
	nCtrl.capture = () => {
		nCtrl.myVideo.pause();
		nCtrl.saveThumbnail();
	}

	nCtrl.jumpToCueTime = ($index) =>{
		nCtrl.myVideo.currentTime = nCtrl.noteList[$index].cueTime;
		nCtrl.myVideo.pause()
	
	}

	// Submit note imformation and store it in nCtrl.notes
	nCtrl.formatNote = () =>{
		var currentTime = Math.round(nCtrl.myVideo.currentTime);
		var cueTitle = nCtrl.newNote.title
		var cueNote = nCtrl.newNote.note
		var vidThumb = nCtrl.vidThumbnail
		// Only submit if title and content not empty
			if(nCtrl.noteTitle.value === "" || nCtrl.noteContent.value === ""){
				return false
			} else {
				nCtrl.myVideo.play()
				nCtrl.newNote = {title: cueTitle, vidThumb: vidThumb, cueTime: currentTime, cueNote: cueNote, videoId: nCtrl.currentVideoId};
				// Reset title input
				nCtrl.noteTitle.value = '';
			}
	}

	nCtrl.submitNote = ()=>{
		nCtrl.formatNote()
		// push note to database
		nCtrl.postNote(function(){
			// Grab notes as they are added
			nCtrl.getNotes(nCtrl.currentVideoId)
		})
		
	}

	// Hide form with cancel button
	nCtrl.cancel = () =>{
		nCtrl.myVideo.play()
	}

	// Delete a single note from video
	nCtrl.deleteNote = (note) =>{
		console.log(note)
		noteFactory.deleteNote(note).then((nCtrl.deleteNoteError, nCtrl.deleteNoteSuccess ));
		nCtrl.getNotes(nCtrl.currentVideoId)
	}

	nCtrl.deleteNoteSuccess = () =>{
		console.log("Successfully deleted note")

	}

	nCtrl.deleteNoteError = (err) =>{
		console.error("Error deleting notes", err)
	}
}