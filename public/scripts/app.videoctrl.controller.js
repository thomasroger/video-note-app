angular.module('VideoNoteApp')
		.controller('videoController', videoController)
		.config(($stateProvider, $urlRouterProvider)=>{
			$urlRouterProvider.otherwise("/");
			
			$stateProvider
				.state("userVideoList", {
					url: '/',
					views: {
						"": {
							templateUrl: "../views/partials/video-upload.html"
						},
						"nav": {
							templateUrl: "../views/partials/nav.html"
						}
					},
					controller: 'videoController',
					controllerAs: 'vCtrl'
				})
				.state('userNoteList', {
					url: '/video/:id',
					views: {
						"": {
							templateUrl: '../views/user-note-list.html',
						},
						"nav": {
								templateUrl: "../views/partials/nav.html"
						}

					},
					controller: 'videoController',
					controllerAs: 'vCtrl'
				});
		});

videoController.$inject = ['noteFactory', '$http', '$sce', '$stateParams'];

	// Video upload
function videoController(noteFactory, $http, $sce, $stateParams){
	var vCtrl = this;

	// Grab id from stateParams
	vCtrl.currentVideoId = $stateParams.id

	vCtrl.getVideos = () =>{
		noteFactory.getVideos().then((res)=>{
			vCtrl.videoList = res.data;
			// console.log(vCtrl.videoList)
		});
	}

	vCtrl.getVideos();

	// Pass id to database and retrieve video
	vCtrl.getCurrentVideo = (videoId) =>{
		noteFactory.getCurrentVideo(videoId).then((res)=>{
			vCtrl.currentVideo = res.data;
			vCtrl.currentVideoUrl = vCtrl.currentVideo.videoUrl
		});
	}

	vCtrl.getCurrentVideo(vCtrl.currentVideoId)

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


	vCtrl.submitVideo = () =>{
		if(vCtrl.newVideo.title === "" || vCtrl.newVideo.description === "" || vCtrl.newVideo.videoUrl === ""){
			return false
		} else {
			// Post video
			vCtrl.postVideo()
			// Retrieve videos from database
			vCtrl.getVideos()
		}
	}

	vCtrl.trustSrc = (src) =>{
		return $sce.trustAsResourceUrl(src);
	}

	vCtrl.deleteVideo = (videoId) =>{
		noteFactory.deleteNote(videoId).then((vCtrl.deleteVideoError, vCtrl.deleteVideoSuccess ));
		noteFactory.deleteVideo(videoId).then((vCtrl.deleteNotesError, vCtrl.deleteNotesSuccess))
			vCtrl.getVideos()
	}

	vCtrl.deleteVideoSuccess = (res) =>{
		console.log("Successfully deleted video")
	}


	vCtrl.deleteVideoError = (err) =>{
		console.log("Error deleting video", err)
	}

	vCtrl.deleteNotesSuccess = () =>{
		console.log("Successfully deleted notes")

	}

	vCtrl.deleteNotesError = (err) =>{
		console.error("Error deleting notes", err)
	}

}
