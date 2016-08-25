angular.module('VideoNoteApp')
		.controller('videoController', videoController);

videoController.$inject = ['noteFactory'];

function videoController(noteFactory){
	var vCtrl = this;
	vCtrl.welcome = 'Hello world';
	
}