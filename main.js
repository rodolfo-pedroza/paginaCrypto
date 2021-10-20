import './style.css';
import * as THREE from 'three';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0x25f7db });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xfafa57 });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

// Avatar

const rodoTexture = new THREE.TextureLoader().load('rodo.png');

const rodo = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: rodoTexture }));

scene.add(rodo);

// Earth
const EarthTexture = new THREE.TextureLoader().load('2_no_clouds_4k.jpg');
const bumpMap = new THREE.TextureLoader().load('elev_bump_4k.jpg');
const specularMap = new THREE.TextureLoader().load('water_4k.png');

const earth = new THREE.Mesh(
    new THREE.SphereGeometry(3,32,32),
    new THREE.MeshPhongMaterial({
        map: EarthTexture,
        bumpMap: bumpMap,
        bumpScale: 0.005,
        specularMap: specularMap,
        specular: new THREE.Color('grey')
    })
);

scene.add(earth);

// Moon

const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon);

moon.position.z = 25;
moon.position.setX(-5);

earth.position.z = 30;
earth.position.setX(-10)


rodo.position.z = -5;
rodo.position.x = 2;

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

//   earth.rotation.x += 0.05;
  earth.rotation.y += 0.075;
//   earth.rotation.z += 0.05;

  rodo.rotation.y += 0.01;
  rodo.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.009;
  torus.rotation.z += 0.1;

  moon.rotation.x += 0.005;
//   earth.rotation.y += 0.005;
  earth.rotation.y += 0.005;

  rodo.rotation.y += 0.002;


//   controls.update();

  renderer.render(scene, camera);
}

animate();
