// TODO migrate

var field = new visualizer({
	name: 'field',
	initialFunction: function () {
		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.renderer.setClearColor(0xffffff, 1);
		document.body.appendChild(this.renderer.domElement);

		this.parent = new THREE.Object3D();
		this.scene.add(this.parent);

		this.cubes = [];

		this.cubeSize = 1;
		this.realCubeSizeModifier = 0.5;
		this.realCubeSize = this.cubeSize * this.realCubeSizeModifier;

		this.cubeGeo = new THREE.BoxGeometry(
			this.realCubeSize, this.realCubeSize, this.realCubeSize
		);

		for (var i = 0; i < frequencyData.length; i++) {
			var material = new THREE.MeshPhongMaterial({ color: 0x111111 });
			var cube = new THREE.Mesh(this.cubeGeo, material);

			this.cubes[i] = cube;
			this.parent.add(this.cubes[i]);
		}

		this.camera.position.z = 40;

		this.light = new THREE.AmbientLight(0xffffff);
		this.light.position.z = 2;
		this.scene.add(this.light);

		this.initialThin = 10;
		this.outerThin = 50;
		this.dataMulti = 0;

		this.zMulti = 1000;

		this.gui = new dat.GUI();
		this.gui.add(this, 'initialThin', 0, 100);
		this.gui.add(this, 'outerThin', 0, 100);
		this.gui.add(this, 'dataMulti', -1.5, 1.5);

		this.gui.add(this, 'zMulti', -2000, 2000);

		this.loopingFunction();
	},
	loopingFunction: function () {
		frame++;
		analyser.getByteFrequencyData(frequencyData);

		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		var dimension = Math.sqrt(frequencyData.length);

		this.parent.rotation.x += 0.001;
		this.parent.rotation.y += 0.002;
		this.parent.rotation.z -= 0.003;

		for (var i = 0; i < frequencyData.length; i++) {
			var cube = this.cubes[i];

			var level = (Math.floor(i / dimension));
			var xTarget = i * this.cubeSize;
			var xOffset = level * (this.cubeSize * dimension);
			var halfOffset = (this.cubeSize * 32) / 2;
			cube.position.x = (xTarget - xOffset) - halfOffset;

			cube.position.y = (level - halfOffset);

			var data = frequencyData[i] / 255;
			var sinOffset = Math.sin((frame + i) / (this.initialThin + (data * this.dataMulti))) / this.outerThin;

			cube.position.z = sinOffset * (data * this.zMulti);
		}

		requestAnimationFrame(this.loopingFunction.bind(this));

		this.renderer.render(this.scene, this.camera);
	}
});
