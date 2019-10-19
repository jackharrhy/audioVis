function loopingFunction(ctx) {
	let {canvas,c,frame,analyser,frequencyData} = ctx;

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	frame++;
	analyser.getByteFrequencyData(frequencyData);

	c.translate(canvas.width / 2, canvas.height / 2);

	for (var i = 0; i < frequencyData.length / 6; i++) {
		c.fillStyle = 'rgba(' +
			String(Math.floor(frequencyData[i] + Math.random() * 100 + Math.cos(frame / 9 + i) * 60)) + ',' +
			String(Math.floor(frequencyData[i] + Math.random() * 100 + Math.sin(frame / 10 + i) * 60)) + ',' +
			String(Math.floor(frequencyData[i] + Math.random() * 100 + Math.cos(frame / 11 + i) * 60)) + ',1)';

		c.rotate(i + (frame / 5000) + (frequencyData[i] / 5000));

		c.fillRect(
			Math.cos((frame + i) / 20) * 50 + frequencyData[i] / 4,
			Math.sin((frame + i) / 20) * 50 + frequencyData[i] / 4,
			20 - i / 300,
			(frequencyData[i] * (canvas.height / 600)) - i / 500);
	}

	requestAnimationFrame(loopingFunction.bind(this, ctx));
}

function initialFunction(ctx) {
	loopingFunction(ctx);
}

module.exports = {
	name: 'circleBars',
	loopingFunction,
	initialFunction,
};
