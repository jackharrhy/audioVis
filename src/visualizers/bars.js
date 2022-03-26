export const name = "bars";

export function loopingFunction(ctx) {
	let { canvas, c, analyser, frequencyData } = ctx;
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	analyser.getByteFrequencyData(frequencyData);

	for (var i = 0; i < frequencyData.length; i++) {
		c.fillStyle =
			"rgba(" +
			String(frequencyData[i]) +
			"," +
			String(frequencyData[i]) +
			"," +
			String(frequencyData[i]) +
			",1)";

		c.fillRect(
			(canvas.width / frequencyData.length) * i,
			0,
			canvas.width / frequencyData.length,
			frequencyData[i] * (canvas.height / 255)
		);
	}

	requestAnimationFrame(loopingFunction.bind(this, ctx));
}
