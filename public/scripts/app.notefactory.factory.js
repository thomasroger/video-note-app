angular.module("VideoNoteApp")
		.factory("noteFactory", noteFactory);

noteFactory.$inject = ["$http"];

function noteFactory($http){

	function getNotes(videoId){
		var param = videoId ? `/${videoId}` : '';
		return $http.get(`/api/notes${param}`);
	}

	function getVideos(videoId){
		return $http.get('/api/video');
	}

	function getCurrentVideo(videoId){
		var param = videoId ? `/${videoId}`: '';
		return $http.get(`/api/video${param}`);
	}

	function postNote(newNote){
		return $http.post("/api/note", newNote);
	}

	function postVideo(newVideo){
		return $http.post("/api/video", newVideo);
	}

	function deleteVideo(videoId){
		console.log(videoId)
		return $http.delete('/api/video/' + videoId);
	}

	function deleteNote(noteId){
		console.log(noteId)
		return $http.delete('/api/delete-note/' + noteId);
	}
		
	return {
		getNotes: getNotes,
		getVideos: getVideos,
		getCurrentVideo: getCurrentVideo,
		// getCurrentVideoNotes: getCurrentVideoNotes,
		postNote: postNote,
		postVideo: postVideo,
		deleteVideo: deleteVideo,
		deleteNote: deleteNote
	};
}