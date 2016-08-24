var myVideo = document.getElementById('my_video_1');
var getTime = document.getElementById('getTime');
var addNote = document.getElementById('addNote');
var submitNote = document.getElementById('submitNote');
var notes = document.getElementById('note-content');
var cues = []
// getTime.addEventListener('click', () => {
// 	var currentTime = myVideo.currentTime;
// 	cues.push({time: currentTime, note: "This is a note"})
// 	console.log(cues)
// });

addNote.addEventListener('click', ()=>{
	myVideo.pause();
});

// Complete note and save
submitNote.addEventListener('click', ()=>{
	var currentTime = myVideo.currentTime;
	var cueNote = notes.value
	if(notes.value === ""){
		myVideo.play()
	} else {
		myVideo.play()
		cues.push({time: currentTime, note: cueNote})
	}
		console.log(cues)
});