import * as THREE from "../../lib/threejs/three.module.js";
import * as dat from "../../lib/threejs/lil-gui.module.min.js";

const scene = new THREE.Scene();
let timerEl = document.querySelector("#timer");

let time = 30;

let score = 0;
const camera = new THREE.PerspectiveCamera(
    75, window.innerWidth / window.innerHeight, 0.1, 1000
);
camera.position.set(0, 0, 15);

scene.add(camera);

scene.background = new THREE.TextureLoader().load("../lib/particle.png");


const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);
document.body.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true;
window.onload = () => {
    renderer.setAnimationLoop(animate);
}

const hemisphere = new THREE.HemisphereLight(0xFFFFFF, 0x0000ff);
scene.add(hemisphere);

const ambientLight = new THREE.AmbientLight(0xFFFFFF);
scene.add(ambientLight);

const dLight = new THREE.DirectionalLight(0xFFFFFF, 1);
scene.add(dLight);
dLight.position.set(-150, 100, 0);
dLight.shadow.camera.top = 20;
dLight.castShadow = true;


const shape = new THREE.SphereGeometry(2, 40, 40);
const cover = new THREE.MeshStandardMaterial({map: new THREE.TextureLoader().load("../lib/disturb.jpg"), color: 0xFfFFFF});
const sphere = new THREE.Mesh(shape, cover);
scene.add(sphere);
sphere.position.y = 3;
sphere.castShadow = true;

const planeGeometry = new THREE.PlaneGeometry(20, 20);
const planeMaterial = new THREE.MeshStandardMaterial({color: 0xff00ff, side: THREE.DoubleSide, map: new THREE.TextureLoader().load("../lib/red_panel.png")});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -45;
plane.position.y = 0;
scene.add(plane);
plane.receiveShadow = true;

const planeGeometry2 = new THREE.PlaneGeometry(20, 20);
const planeMaterial2 = new THREE.MeshStandardMaterial({color: 0xff00ff, side: THREE.DoubleSide, map: new THREE.TextureLoader().load("../lib/yellow.png")});
const plane2 = new THREE.Mesh(planeGeometry2, planeMaterial2);
plane2.rotation.y = 4.71;
plane2.position.x = 20 / 2;
scene.add(plane2);
plane2.receiveShadow = true;

const planeGeometry3 = new THREE.PlaneGeometry(20, 20);
const planeMaterial3 = new THREE.MeshStandardMaterial({color: 0xff00ff, side: THREE.DoubleSide, map: new THREE.TextureLoader().load("../lib/yellow.png")});
const plane3 = new THREE.Mesh(planeGeometry3, planeMaterial3);
plane3.rotation.y = -4.71;
plane3.position.x = -20 / 2;
scene.add(plane3);
plane3.receiveShadow = true;

let timer = 2;
let moveBall = false;
let dy = 0.1;
function animate(timeMo){
    renderer.render(scene, camera);
    sphere.rotation.y += 0.01;
    if(moveBall) {
        if(sphere.position.y >= 2) timer -= dy, sphere.position.y += timer;
        else {
            timer = 2, sphere.position.y = 2;
            if(Math.random() < 0.2){
                dLight.position.x = -dLight.position.x;
            }
        }
    } else {
        if(sphere.position > 2 ) sphere.position.y -= timer;
    }
    time -= 0.05;
    if(time > 30) time = 30;
    if(time < 0) gameOver();
    timerEl.style.width =  time + "%";
}

window.addEventListener(("resize"), () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.updateProjectionMatrix();
    camera.aspect = window.innerWidth / window.innerHeight;
    renderer.render(scene, camera);
})

window.addEventListener("click", anime);

function anime(){
    moveBall = !moveBall;
    if (sphere.position.y < 17.9 &&  sphere.position.y > 5.34 && !moveBall) {
        score++;
        time += Math.floor(Math.random()) + (3 - 1);
        document.getElementById("score").textContent = score;
    }
}

function gameOver(){
    if(score > 20) alert("You won!!!") 
    else alert("You loose!!!")
    renderer.clear(0x0000000);
    renderer.setAnimationLoop();
    renderer.setClearColor(0x000000);
    document.body.childNodes.forEach((el) => {
        console.log(el)
    })
    window.removeEventListener("click", anime)
}