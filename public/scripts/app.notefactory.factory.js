angular.module("VideoNoteApp")
		.factory("noteFactory", noteFactory);

noteFactory.$inject = ["$http"];

function noteFactory($http){

	function getNotes(){
		return $http.get("/api/note");
	}

	function getVideos(){
		return $http.get("/api/video");
	}

	function postNote(newNote){
		return $http.post("/api/note", newNote);
	}

	function postVideo(newVideo){
		return $http.post("/api/video", newVideo);
	}
	return {
		getNotes: getNotes,
		getVideos: getVideos,
		postNote: postNote,
		postVideo: postVideo
	};
}