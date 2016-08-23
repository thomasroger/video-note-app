var myVideo = document.getElementById('my_video_1');
var getTime = document.getElementById('getTime');
var setNote = document.getElementById('setTime');
var done = document.getElementById('noteFinish');
var notes = document.getElementById('note');
var cues = []
// getTime.addEventListener('click', () => {
// 	var currentTime = myVideo.currentTime;
// 	cues.push({time: currentTime, note: "This is a note"})
// 	console.log(cues)
// });

setNote.addEventListener('click', ()=>{
	myVideo.pause();
});

done.addEventListener('click', ()=>{
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