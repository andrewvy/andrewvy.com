(function() {
	var scene, camera, renderer;

	var container, HEIGHT,
		WIDTH, fieldOfView, aspectRatio,
		nearPlane, farPlane, stats,
		geometry, particleCount,
		i, h, color, size,
		materials = [],
		mouseX = 0,
		mouseY = 0,
		windowHalfX, windowHalfY;

	init();
	animate();

	// Heavily forked from http://codepen.io/seanseansean/pen/EaBZEY

	function init() {

		HEIGHT = window.innerHeight;
		WIDTH = window.innerWidth;
		windowHalfX = WIDTH / 2;
		windowHalfY = HEIGHT / 2;

		fieldOfView = 75;
		aspectRatio = WIDTH / HEIGHT;
		nearPlane = 1;
		farPlane = 2000;

	cameraZ = farPlane / 2;
	fogHex = 0x000000;
	fogDensity = 0.0009;

	camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
	camera.position.z = cameraZ;

	scene = new THREE.Scene();
	scene.fog = new THREE.FogExp2(fogHex, fogDensity);

	container = document.createElement('div');
	document.body.appendChild(container);
		document.body.style.overflow = 'hidden';

	geometry = new THREE.Geometry();

	particleCount = 2000;

	for (i = 0; i < particleCount; i++) {

		var vertex = new THREE.Vector3();
		vertex.x = Math.random() * 2000 - 1000;
		vertex.y = Math.random() * 2000 - 1000;
		vertex.z = Math.random() * 2000 - 1000;

		geometry.vertices.push(vertex);
	}

	parameters = [[[1, 1, 0.5], 5], [[0.95, 1, 0.5], 4], [[0.90, 1, 0.5], 3], [[0.85, 1, 0.5], 2], [[0.80, 1, 0.5], 1]];
	parameterCount = parameters.length;

	for (i = 0; i < parameterCount; i++) {

		color = parameters[i][0];
		size  = parameters[i][1];

		materials[i] = new THREE.PointCloudMaterial({size:size});

		particles = new THREE.PointCloud(geometry, materials[i]);

		particles.rotation.x = Math.random() * 6;
		particles.rotation.y = Math.random() * 6;
		particles.rotation.z = Math.random() * 6;

		scene.add(particles);
	}

	renderer = new THREE.WebGLRenderer( { alpha: true } );
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(WIDTH, HEIGHT);

	container.appendChild(renderer.domElement);

	window.addEventListener('resize', onWindowResize, false);
	document.addEventListener('mousemove', onDocumentMouseMove, false);
	document.addEventListener('touchstart', onDocumentTouchStart, false);
	document.addEventListener('touchmove', onDocumentTouchMove, false);

	}

	function animate() {
		requestAnimationFrame(animate);
		render();
	}

	function render() {
		var time = Date.now() * 0.00005;

		camera.position.x += (mouseX - camera.position.x) * 0.05;
		camera.position.y += (- mouseY - camera.position.y) * 0.05;

		camera.lookAt(scene.position);

		for (i = 0; i < scene.children.length; i ++) {

			var object = scene.children[i];

			if (object instanceof THREE.PointCloud) {

				object.rotation.y = time * (i < 4 ? i + 1 : - (i + 1));
			}
		}

		renderer.render(scene, camera);
	}

	function onDocumentMouseMove(e) {
		mouseX = e.clientX - windowHalfX;
		mouseY = e.clientY - windowHalfY;
	}

	function onDocumentTouchStart(e) {

		if (e.touches.length === 1) {

			e.preventDefault();
			mouseX = e.touches[0].pageX - windowHalfX;
			mouseY = e.touches[0].pageY - windowHalfY;
		}
	}

	function onDocumentTouchMove(e) {

		if (e.touches.length === 1) {

			e.preventDefault();
			mouseX = e.touches[ 0 ].pageX - windowHalfX;
			mouseY = e.touches[ 0 ].pageY - windowHalfY;
		}
	}

	function onWindowResize() {

		windowHalfX = window.innerWidth / 2;
		windowHalfY = window.innerHeight / 2;

		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
	}
})();
