import "normalize.css";
import "./main.css";

let visualizers = [
	import("./visualizers/circle-bars"),
	import("./visualizers/bars"),
	import("./visualizers/blocks"),
	import("./visualizers/field"),
];

// dom on ready
document.addEventListener("DOMContentLoaded", async () => {
	visualizers = await Promise.all(visualizers);

	const ctx = {
		audioContext: new (window.AudioContext || window.webkitAudioContext)(),
		audio: document.getElementById("audio"),
		canvas: document.getElementById("canvas"),
		frame: -1,
	};

	ctx.audioSrc = ctx.audioContext.createMediaElementSource(ctx.audio);
	ctx.analyser = ctx.audioContext.createAnalyser();
	ctx.frequencyData = new Uint8Array(ctx.analyser.frequencyBinCount);
	ctx.audioSrc.connect(ctx.analyser);
	ctx.analyser.connect(ctx.audioContext.destination);

	ctx.c = canvas.getContext("2d");

	document.getElementById("ready").innerHTML = "Ready!";
	document.getElementById("ui").style.backgroundColor = "green";
	document.getElementById("player").style.display = "block";
	document.getElementById("player").addEventListener("click", () => {
		document.getElementById("ui").style.display = "none";
		const randomVisualizer =
			visualizers[Math.floor(Math.random() * visualizers.length)];

		const startingFunction =
			randomVisualizer.initialFunction ||
			randomVisualizer.loopingFunction;

		startingFunction(ctx);

		audio.play();
	});
});
