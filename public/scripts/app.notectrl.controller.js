angular.module('VideoNoteApp')
		.controller('noteController', noteController)
		.config(($stateProvider, $urlRouterProvider, $locationProvider) => {
			// For any unmatched url, redirect to /state1
			$urlRouterProvider.otherwise("/dashboard");
		  //
		  // Now set up the states
			$stateProvider
			.state('dashboard', {
			  url: "/dashboard",
			  controller: 'noteController',
			  templateUrl: "views/dashboard.html"
			});

			// $locationProvider.html5Mode(true);
		});   

noteController.$inject = ['noteFactory', '$scope'];

function noteController(noteFactory, $scope){
	var nCtrl = this;

	nCtrl.myVideo = document.getElementById('my_video_1');
	nCtrl.noteTitle = document.getElementById('note-title');
	nCtrl.noteContent = document.getElementById('note-content');
	nCtrl.newNote = {};
	nCtrl.notes = [];

	// Capture video frame image 
	nCtrl.saveImg = () => {
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
        
        // Unable to set url, taints canvas. 
        // Need to save to server
                var dataURL = thecanvas.toDataURL();
 
		// set the source of the img tag
		// img.setAttribute('src', dataURL); 	

		}
	};

	// Open form and capture snapshot
	nCtrl.addNote = () => {
		nCtrl.myVideo.pause();
		nCtrl.saveImg();
		nCtrl.showForm = true;
		nCtrl.hideAddBtn = true;
	}

	// Submit note imformation and store it in nCtrl.notes
	nCtrl.submitNote = () =>{
		var currentTime = nCtrl.myVideo.currentTime;
		var cueTitle = nCtrl.newNote.title
		var cueNote = nCtrl.newNote.note
		// Only submit if title and content not empty
			if(nCtrl.noteTitle.value === "" || nCtrl.noteContent.value === ""){
				return false
			} else {
				nCtrl.myVideo.play()
				nCtrl.newNote = {title: cueTitle, cueTime: currentTime, cueNote: cueNote};
				// Reset title input
				nCtrl.noteTitle.value = '';
			}

		// Hide and show form
		nCtrl.showForm = false;
		nCtrl.hideAddBtn = false;

		// push note to database
		noteFactory.postNote(nCtrl.newNote)
					.then(nCtrl.submitErrorSuccess, nCtrl.submitErrorFail);	

	}
	// Hide form with cancel button
	nCtrl.cancel = () =>{
		nCtrl.showForm = false;
		nCtrl.hideAddBtn = false;

	}
    // update newNote array with res data
	nCtrl.submitErrorSuccess = function(res) {
		nCtrl.notes.push(res.data)
		console.log(nCtrl.notes)
	}

	// Throw error if submit fails
	nCtrl.submitErrorFail = function(err) {
		console.log('Error submitting file', err)
	}

	// Get notes from noteFactory route api/notes
	nCtrl.getNotes = () =>{
		noteFactory.getNotes(nCtrl.newVideo).then((err, res)=>{
			if(err){
				console.log(err);
			} else {
				nCtrl.noteList = res.data;
			}
		});
	}
}