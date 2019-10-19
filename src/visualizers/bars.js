// TODO migrate

var bars = new visualizer({
	name: 'bars',
	initialFunction: function () {
		this.loopingFunction();
	},
	loopingFunction: function () {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		frame++;
		analyser.getByteFrequencyData(frequencyData);

		for (var i = 0; i < frequencyData.length; i++) {
			c.fillStyle = 'rgba(' +
				String(frequencyData[i]) + ',' +
				String(frequencyData[i]) + ',' +
				String(frequencyData[i]) + ',1)';

			c.fillRect(
				canvas.width / frequencyData.length * i,
				0,
				canvas.width / frequencyData.length,
				frequencyData[i] * (canvas.height / 255));
		}

		requestAnimationFrame(this.loopingFunction.bind(this));
	}
});
