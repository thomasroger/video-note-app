angular.module('VideoNoteApp')
		.controller('videoController', videoController)

noteController.$inject = ['noteFactory'];

function videoController(noteFactory, $scope){
	var vCtrl = this;


	vCtrl.newVideo = ''; 
	console.log(vCtrl.newVideo)


	vCtrl.postVideo= () =>{
		noteFactory.postVideo(vCtrl.newVideo).then(vCtrl.submitSuccess, vCtrl.submitError);
	}

	// update newNote array with res data
	// Throw error if submit fails
	vCtrl.submitSuccess = function(res) {
		console.log(res)
	}

	vCtrl.submitError = function(err) {
		console.log('Error submitting', err)
	}

	vCtrl.submitVideo = () =>{
		// if(vCtrl.newVideo.title === "" || vCtrl.newVideo.description === "" || vCtrl.newVideoUrl.value === ""){
		// 	return false
		// } else {
			// Reset title input
			vCtrl.postVideo()
		// }
		console.log(noteFactory)
	}
}