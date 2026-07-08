import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#webgl-viewport'),
    antialias: true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

const textureLoader = new THREE.TextureLoader();
const brickTexture = textureLoader.load('https://threejs.org/examples/textures/brick_diffuse.jpg');
const grassTexture = textureLoader.load('https://threejs.org/examples/textures/terrain/grasslight-big.jpg');

const mainCube = new THREE.Mesh(
    new THREE.BoxGeometry(4, 4, 4),
    new THREE.MeshBasicMaterial({ map: brickTexture })
);
mainCube.position.set(-5, 2, 0);
scene.add(mainCube);

const mainSphere = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshBasicMaterial({ map: grassTexture })
);
mainSphere.position.set(5, -2, -10);
scene.add(mainSphere);

const mainTorus = new THREE.Mesh(
    new THREE.TorusGeometry(4, 1.5, 16, 100),
    new THREE.MeshBasicMaterial({ color: 0x00ffcc })
);
mainTorus.position.set(-8, -5, -20);
scene.add(mainTorus);

const mainCone = new THREE.Mesh(
    new THREE.ConeGeometry(3, 6, 32),
    new THREE.MeshBasicMaterial({ color: 0xff0055 })
);
mainCone.position.set(8, 5, -30);
scene.add(mainCone);

const mainCylinder = new THREE.Mesh(
    new THREE.CylinderGeometry(2, 2, 6, 32),
    new THREE.MeshBasicMaterial({ color: 0xffff00 })
);
mainCylinder.position.set(0, 0, -40);
scene.add(mainCylinder);

function addEnvironment() {
    const starGeo = new THREE.SphereGeometry(0.1, 24, 24);
    const starMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    
    for (let i = 0; i < 200; i++) {
        const star = new THREE.Mesh(starGeo, starMat);
        const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(150));
        star.position.set(x, y, z);
        scene.add(star);
    }
}
addEnvironment();

function handleScroll() {
    const scrollY = window.scrollY;
    camera.position.z = 30 - scrollY * 0.05;
    camera.position.x = Math.sin(scrollY * 0.002) * 2;
    
    const zDisplay = document.getElementById('z-val');
    if(zDisplay) zDisplay.innerText = camera.position.z.toFixed(2);
}

document.addEventListener('scroll', handleScroll);

function animate() {
    requestAnimationFrame(animate);

    mainCube.rotation.x += 0.01;
    mainCube.rotation.y += 0.01;

    mainSphere.rotation.y += 0.005;

    mainTorus.rotation.z += 0.01;
    mainTorus.rotation.x += 0.01;

    mainCone.rotation.y += 0.02;

    mainCylinder.rotation.x += 0.01;

    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
