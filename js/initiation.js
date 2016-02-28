var audioContext  = new (window.AudioContext || window.webkitAudioContext)();
var audio         = document.getElementById('audio');
var audioSrc      = audioContext.createMediaElementSource(audio);
var analyser      = audioContext.createAnalyser();
var frequencyData = new Uint8Array(analyser.frequencyBinCount);

audioSrc.connect(analyser);
analyser.connect(audioContext.destination);

window.onload = function() {
	document.getElementById('ready').innerHTML = 'Ready!';
	document.getElementById('ui').style.backgroundColor = 'green';
	document.getElementById('player').style.display = 'block';
}
function start() {
	document.getElementById('ui').style.display = 'none';
	visualizers[0].initialFunction();
	audio.play();
}
