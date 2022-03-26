const localCtx = {};

export const name = "field";

export function loopingFunction(ctx) {
	let { canvas, frame, analyser, frequencyData } = ctx;
	frame++;
	analyser.getByteFrequencyData(frequencyData);

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	const dimension = Math.sqrt(frequencyData.length);

	localCtx.parent.rotation.x += 0.001;
	localCtx.parent.rotation.y += 0.002;
	localCtx.parent.rotation.z -= 0.003;

	for (let i = 0; i < frequencyData.length; i++) {
		const cube = localCtx.cubes[i];

		const level = Math.floor(i / dimension);
		const xTarget = i * localCtx.cubeSize;
		const xOffset = level * (localCtx.cubeSize * dimension);
		const halfOffset = (localCtx.cubeSize * 32) / 2;
		cube.position.x = xTarget - xOffset - halfOffset;
		cube.position.y = level - halfOffset;

		const data = frequencyData[i] / 255;
		const sinOffset =
			Math.sin(
				(frame + i) / (localCtx.initialThin + data * localCtx.dataMulti)
			) / localCtx.outerThin;
		cube.position.z = sinOffset * (data * localCtx.zMulti);
	}

	requestAnimationFrame(loopingFunction.bind(this, ctx));
	localCtx.renderer.render(localCtx.scene, localCtx.camera);
}

export function initialFunction(ctx) {
	let { frequencyData } = ctx;

	localCtx.scene = new THREE.Scene();
	localCtx.camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	);

	localCtx.renderer = new THREE.WebGLRenderer();
	localCtx.renderer.setPixelRatio(window.devicePixelRatio);
	localCtx.renderer.setSize(window.innerWidth, window.innerHeight);
	localCtx.renderer.setClearColor(0xffffff, 1);
	document.body.appendChild(localCtx.renderer.domElement);

	localCtx.parent = new THREE.Object3D();
	localCtx.scene.add(localCtx.parent);

	localCtx.cubes = [];

	localCtx.cubeSize = 1;
	localCtx.realCubeSizeModifier = 0.5;
	localCtx.realCubeSize = localCtx.cubeSize * localCtx.realCubeSizeModifier;

	localCtx.cubeGeo = new THREE.BoxGeometry(
		localCtx.realCubeSize,
		localCtx.realCubeSize,
		localCtx.realCubeSize
	);

	for (let i = 0; i < frequencyData.length; i++) {
		const material = new THREE.MeshPhongMaterial({ color: 0x111111 });
		const cube = new THREE.Mesh(localCtx.cubeGeo, material);

		localCtx.cubes[i] = cube;
		localCtx.parent.add(localCtx.cubes[i]);
	}

	localCtx.camera.position.z = 40;

	localCtx.light = new THREE.AmbientLight(0xffffff);
	localCtx.light.position.z = 2;
	localCtx.scene.add(localCtx.light);

	localCtx.initialThin = 10;
	localCtx.outerThin = 50;
	localCtx.dataMulti = 0;

	localCtx.zMulti = 1000;

	localCtx.gui = new dat.GUI();
	localCtx.gui.add(localCtx, "initialThin", 0, 100);
	localCtx.gui.add(localCtx, "outerThin", 0, 100);
	localCtx.gui.add(localCtx, "dataMulti", -1.5, 1.5);
	localCtx.gui.add(localCtx, "zMulti", -2000, 2000);

	loopingFunction(ctx);
}
