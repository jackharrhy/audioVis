const name = "blocks";

export function loopingFunction(ctx) {
	let { canvas, c, frame, analyser, frequencyData } = ctx;

	frame++;
	analyser.getByteFrequencyData(frequencyData);

	const dimension = Math.sqrt(frequencyData.length);
	c.fillStyle = "#f5f5ed";
	c.fillRect(0, 0, canvas.width, canvas.height);

	c.fillStyle = "#e1dcd3";
	c.beginPath();
	c.moveTo(0, 0);
	c.lineTo(canvas.width, canvas.height);
	c.lineTo(0, canvas.height);
	c.closePath();
	c.fill();

	for (let col = 0; col < dimension; col++) {
		for (let row = 0; row < dimension; row++) {
			const data = frequencyData[col * dimension + row];

			c.fillStyle =
				"rgba(" +
				String(
					Math.floor(
						data / 1.25 + Math.sin(frame / 8.5 + row / 20) * 75
					)
				) +
				"," +
				String(
					Math.floor(
						data / 1.25 + Math.cos(frame / 10 + col / 10) * 100
					)
				) +
				"," +
				String(
					Math.floor(
						data / 1.25 + Math.sin(frame / 12.5 + row / 15) * 125
					)
				) +
				",1)";

			const w = canvas.width / dimension;
			const h = canvas.height / dimension;
			c.fillRect(col * w - data + 255, row * h - data + 255, w, h);
		}
	}

	requestAnimationFrame(loopingFunction.bind(this, ctx));
}

export function initialFunction(ctx) {
	ctx.canvas.width = 400;
	ctx.canvas.height = 400;

	document.body.classList.add("blocks");

	const css = document.createElement("style");
	css.attributes.type = "text/css";
	css.innerHTML = `.canvas { left: calc(50% - ${canvas.width / 2}px); }`;
	document.body.appendChild(css);

	loopingFunction(ctx);
}
