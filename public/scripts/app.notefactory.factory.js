angular.module('VideoNoteApp')
		.factory('noteFactory', noteFactory);

noteFactory.$inject = ['$http'];

function noteFactory($http){

	function getNotes(){
		return $http.get('/api/note');
	} 

	// function postVideo(newVideo){
	// 	return $http.post('/api/video', newVideo)
	// }
	return {
		getNotes: getNotes,
		postNote: (newNote) => {
			return $http.post('/api/note', newNote)
		}
	}
}