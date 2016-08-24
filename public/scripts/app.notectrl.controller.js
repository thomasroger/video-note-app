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




noteController.$inject = ['noteFactory'];

function noteController(noteFactory){
	var nCtrl = this;


	nCtrl.myVideo = document.getElementById('my_video_1');

	nCtrl.newNote = {};
	nCtrl.notes = [];

	nCtrl.addNote = () => {
		nCtrl.myVideo.pause();
		nCtrl.showForm = true;
		nCtrl.hideAddBtn = true;
	}

	nCtrl.submitNote = () =>{
		var currentTime = nCtrl.myVideo.currentTime;
		var cueTitle = nCtrl.newNote.title
		var cueNote = nCtrl.newNote.note
			if(cueNote === "" || cueTitle === ""){
				nCtrl.myVideo.play()
			} else {
				nCtrl.myVideo.play()
				nCtrl.newNote = {title: cueTitle, cueTime: currentTime, cueNote: cueNote};
			}
		
		nCtrl.showForm = false;
		nCtrl.hideAddBtn = false;
		noteFactory.postNote(nCtrl.newNote)
					.then(nCtrl.submitErrorSuccess, nCtrl.submitErrorFail);	

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