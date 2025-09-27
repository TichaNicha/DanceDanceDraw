import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

let scene, camera, renderer, controls;

export function initScene() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.set(0, 1, 5);

    renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById("three-canvas"),
        antialias: true // anti aliasing smooths pixels so shape doesnt look 8-bit
    });

    renderer.setSize(window.innerWidth, window.innerHeight);

    // camera controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;   // smoother motion
    controls.dampingFactor = 0.05; // lower = smoother  
    controls.enablePan = false; // lock panning
    controls.minDistance = 2; // zoom limits
    controls.maxDistance = 10;

    // cube placeholder TODO: replace with character later
    const geometry = new THREE.BoxGeometry();
    // one material per face (6 total)
    const materials = [
        new THREE.MeshBasicMaterial({ color: 0x44aa88 }), // right
        new THREE.MeshBasicMaterial({ color: 0x44aa88 }), // left
        new THREE.MeshBasicMaterial({ color: 0x44aa88 }), // top (we’ll override this one)
        new THREE.MeshBasicMaterial({ color: 0x44aa88 }), // bottom
        new THREE.MeshBasicMaterial({ color: 0x44aa88 }), // front
        new THREE.MeshBasicMaterial({ color: 0x44aa88 })  // back
    ];
    materials[2] = new THREE.MeshBasicMaterial({ color: 0xff4444 });
    const cube = new THREE.Mesh(geometry, materials);
    scene.add(cube);

    window.addEventListener("resize", onWindowResize);

    return { scene, camera, renderer };
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

export function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
