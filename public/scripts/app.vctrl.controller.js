angular.module('VideoNoteApp')
		.controller('videoController', videoController)
		.config(($stateProvider, $urlRouterProvider) => {
			// For any unmatched url, redirect to /state1
		  $urlRouterProvider.otherwise("/dashboard");
		  //
		  // Now set up the states
		  $stateProvider
		    .state('dashboard', {
		      url: "/dashboard",
		      controller: 'videoController',
		      templateUrl: "views/dashboard.html"
		    });
		});

videoController.$inject = ['videoFactory'];

function videoController(videoFactory){
	var vCtrl = this;

	// vCtrl.newVideo = {
	// 	title : "Hello world"
	// };

	vCtrl.newNote = {};

	vCtrl.addNote = () =>{
		videoFactory.postVideo('vCtrl.newNote');
		console.log(vCtrl.newNote)
	}

	vCtrl.getVideos = () =>{
		videoFactory.getVideos(vCtrl.newVideo).then((err, response)=>{
			if(err){
				console.log(err);
			} else {
				vCtrl.videoList = response.data;
			}
		});
	}
}