var canvas = document.getElementById('canvas'),
		c = canvas.getContext('2d'),

		frame = -1,

		maxItterations        = 300,
		addsPerFrameSpeedup   = 120,
		addEveryFrame         = false,
		loopFunctionToRequest = null,
		mod = {
			width: 1.0025,
			color: {
				r: -1,
				g: 10,
				b: 5
			}
		},
		boxes = [[
			[0,0],
			25,
			[100,100,100]
		]];

function addItteration() {
	var prevBox = boxes[boxes.length - 1];

	boxes.push([
		[
			prevBox[0][0] + prevBox[1],
			prevBox[0][1] + prevBox[1]
		],
		prevBox[1]/mod.width,
		[
			prevBox[2][0] + mod.color.r,
			prevBox[2][1] + mod.color.g,
			prevBox[2][2] + mod.color.b
		]
	]);
}

var audioContext = new (window.AudioContext || window.webkitAudioContext)();
		audio = document.getElementById('audio'),
		audioSrc = audioContext.createMediaElementSource(audio),
		analyser = audioContext.createAnalyser(),
		frequencyData = new Uint8Array(analyser.frequencyBinCount);

audioSrc.connect(analyser);
analyser.connect(audioContext.destination);

window.onload = function() {
	document.getElementById('ready').innerHTML = 'Ready!';
	document.getElementById('ui').style.backgroundColor = 'green';
	document.getElementById('player').style.display = 'block';
}

function start() {
	audio.play();
	loopFunctionToRequest = blocks;
	loopFunctionToRequest();
	document.getElementById('ui').style.display = 'none';
}

function commonLoopThings() {
	frame++;
	canvas.width  = window.innerWidth;
	canvas.height = window.innerHeight;
	
	analyser.getByteFrequencyData(frequencyData);
}

var blocksDoneCustomThing = false;
function blocks() {
	if(!blocksDoneCustomThing) {
		var css = document.createElement('style');
		css.type = 'text/css';
		css.innerHTML = 'canvas { transform: rotateX(60deg) rotateZ(45deg); left: calc(50% - 256px); }';
		css.innerHTML += 'body { background-color: black; }';
		document.body.appendChild(css);

		canvas.width = 512;
		canvas.height = 512;
		blocksDoneCustomThing = true;
	}

	frame++;

	analyser.getByteFrequencyData(frequencyData);

	var dimension = Math.sqrt(frequencyData.length);

	c.fillStyle = '#222';
	c.fillRect(0,0,512,512);
	c.fillStyle = '#111';
	c.beginPath();
	c.moveTo(0, 0);
	c.lineTo(512,512);
	c.lineTo(0, 512);
	c.closePath();
	c.fill();

	for(var col=0; col < dimension; col++) {
		for(var row=0; row < dimension; row++) {
			var data = frequencyData[col * dimension + row]

			c.fillStyle = 'rgba('
				+String(Math.floor(data/2 + Math.sin(frame/2 + row) * 75))+','
				+String(Math.floor(data/2 + Math.cos(frame/15 + col) * 100))+','
				+String(Math.floor(data/2 + Math.sin(frame/12.5 + row) * 125))+
				',1)';

			var w = 512/dimension;
			var h = 512/dimension;
			c.fillRect(col * w - data/2 + 127.5, row * h - data/2 + 127.5, w, h);
		}
	}

	requestAnimationFrame(loopFunctionToRequest);
}

function circleBars() {
	commonLoopThings();

	c.translate(canvas.width/2, canvas.height/2);

	for(var i=0; i<frequencyData.length/4; i++) {
		c.fillStyle = 'rgba('
			+String(Math.floor(frequencyData[i] + Math.cos(frame/2 + i)*60))+','
			+String(Math.floor(frequencyData[i] + Math.sin(frame/5 + i)*60))+','
			+String(Math.floor(frequencyData[i] + Math.cos(frame/10 + i)*60))+
			',1)';

		c.rotate(i + (frame/5000) + (frequencyData[i]/5000));

		c.fillRect(
			0,
			0,
			20 - i/300,
			(frequencyData[i] * (canvas.height/600)) - i/500
		);
	}

	requestAnimationFrame(loopFunctionToRequest);
}

function bars() {
	commonLoopThings();

	for(var i=0; i<frequencyData.length; i++) {
		c.fillStyle = 'rgba('
			+String(frequencyData[i])+','
			+String(frequencyData[i])+','
			+String(frequencyData[i])+
		',1)';

		c.fillRect(
			canvas.width/frequencyData.length * i,
			0,
			canvas.width/frequencyData.length,
			frequencyData[i] * (canvas.height/255)
		);
	}

	requestAnimationFrame(loopFunctionToRequest);
}

function spun() {
	commonLoopThings();

	c.translate(canvas.width/2, canvas.height/2);

	if(addEveryFrame) {
		if(boxes.length < maxItterations) {
			addItteration();
		}
	} else if(frame % addsPerFrameSpeedup === 0 && frame !== 0) {
		if(addsPerFrameSpeedup <= 4) {
			addEveryFrame = true;
		}
		addsPerFrameSpeedup -= 4;
		addItteration();
	}

	for(var i=boxes.length-1; i>=0; i--) {
		c.rotate(frequencyData[i]/2000 + frame/500);

		boxes[i][2][0] = Math.floor(
				Math.sin(frame/25 + i) * 50) + frequencyData[i];
		boxes[i][2][1] = Math.floor(
				Math.cos(frame/20 + i) * 100) + frequencyData[i];
		boxes[i][2][2] = Math.floor(
				Math.cos(frame/15 + i) * 100) + frequencyData[i];

		c.fillStyle = 'rgba('
			+String(boxes[i][2][0])+','
			+String(boxes[i][2][1])+','
			+String(boxes[i][2][2])+
		',1)';

		c.fillRect(
			(boxes[i][0][0]/35)   + Math.cos(frame/100),
			(boxes[i][0][1]/35)   + Math.sin(frame/100),
			frequencyData[i],
			5 + frequencyData[i]/8
		);
	}

	requestAnimationFrame(loopFunctionToRequest);
}
