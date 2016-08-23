angular.module('VideoNoteApp')
		.factory('videoFactory', videoFact);

videoFact.$inject = ['$http'];

function videoFact($http){

	function getVideos(){
		return $http.get('/api/video');
	} 

	function postVideo(newVideo){
		return $http.post('/api/video', newVideo)
	}
	return {
		getVideos: getVideos,
		postVideo: postVideo
	}
}