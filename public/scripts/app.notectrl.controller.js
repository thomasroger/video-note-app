angular.module('VideoNoteApp')
		.controller('noteController', noteController)

noteController.$inject = ['noteFactory', '$scope'];

function noteController(noteFactory, $scope){
	var nCtrl = this;

	nCtrl.myVideo = document.getElementById('my_video_1');
	nCtrl.noteTitle = document.getElementById('note-title');
	nCtrl.noteContent = document.getElementById('note-content');
	nCtrl.vidThumnail = '';
	nCtrl.newNote = {};

	// import video list from videoController
	nCtrl.currentUserVideo = noteFactory.currentUserVideo;

	console.log(nCtrl.currentUserVideo)

	// Get notes from noteFactory route api/notes
	nCtrl.getNotes = () => {
		noteFactory.getNotes().then((res)=>{
			nCtrl.noteList = res.data;
		});
	}

	nCtrl.getNotes();

	// Post note to note factory
	nCtrl.postNote = () =>{
		noteFactory.postNote(nCtrl.newNote).then(nCtrl.submitSuccess, nCtrl.submitError);
	}

	    // update newNote array with res data
	// Throw error if submit fails
	nCtrl.submitSuccess = function(res) {
		console.log(res)
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
		nCtrl.showForm = true;
		nCtrl.hideAddBtn = true;

	}

	nCtrl.jumpToCueTime = ($index) =>{
		nCtrl.myVideo.currentTime = nCtrl.noteList[$index].cueTime;
	}

	// Submit note imformation and store it in nCtrl.notes
	nCtrl.submitNote = () =>{
		var currentTime = nCtrl.myVideo.currentTime;
		var cueTitle = nCtrl.newNote.title
		var cueNote = nCtrl.newNote.note
		var vidThumb = nCtrl.vidThumbnail
		// Only submit if title and content not empty
			if(nCtrl.noteTitle.value === "" || nCtrl.noteContent.value === ""){
				return false
			} else {
				nCtrl.myVideo.play()
				nCtrl.newNote = {title: cueTitle, vidThumb: vidThumb, cueTime: currentTime, cueNote: cueNote};
				// Reset title input
				nCtrl.noteTitle.value = '';
			}

		// Hide and show form
		nCtrl.showForm = false;
		nCtrl.hideAddBtn = false;

		// push note to database
		nCtrl.postNote()

		// Grab notes as they are added
		nCtrl.getNotes()

	}
	// Hide form with cancel button
	nCtrl.cancel = () =>{
		nCtrl.showForm = false;
		nCtrl.hideAddBtn = false;

	}

}