angular.module('VideoNoteApp')
		.controller('videoController', videoController);

videoController.$inject = ['noteFactory', '$http'];

	// Video upload
function videoController(noteFactory, $http){
	var vCtrl = this;

	vCtrl.newVideo = {};

	vCtrl.getVideos = () =>{
		noteFactory.getVideos().then((res)=>{
			vCtrl.videoList = res.data;
		});
	}

	vCtrl.getVideos();

	vCtrl.postVideo= () =>{
		noteFactory.postVideo(vCtrl.newVideo).then(vCtrl.postSuccess, vCtrl.postError);
	}

	// update newNote array with res data
	// Throw error if submit fails
	vCtrl.postSuccess = function(res) {
		vCtrl.newVideo = {};
	}

	vCtrl.postError = function(err) {
		console.log('Error submitting', err)
	}

// Adding video and make available to home controller

	vCtrl.addVideoNotes = ($index) =>{
		return noteFactory.currentUserVideo = vCtrl.videoList[$index];
		console.log(noteFactory.currentUserVideo)
	}


	vCtrl.submitVideo = () =>{
		if(vCtrl.newVideo.title === "" || vCtrl.newVideo.description === "" || vCtrl.newVideo.videoUrl === ""){
			return false
		} else {
			// Reset title input
			vCtrl.postVideo()
			vCtrl.getVideos()
		}
	}

}