// What is ThreeJS?
// ThreeJS is a JavaScipt library for creating 3d content on the web. ( it also supports 2d. )
// Canvas API - WebGL, 2d context for 2d.

import * as THREE from "./../lib/three.module.min.js";
import WebGL from "./../lib/WebGL.js";

if(WebGL.isWebGL2Available() || WebGL.isWebGLAvailable()){
    start();
} else {
    //Display error message if webgl is not supported.
    let warning;

    if(!WebGL.isWebGL2Available()){
        warning = WebGL.getWebGL2ErrorMessage();
    } else if(!WebGL.isWebGLAvailable()){
        warning = WebGL.getWebGLErrorMessage();
    } else {
        warning = WebGL.getErrorMessage();
    }

    document.getElementById("failedDom").appendChild(warning);
}

function start(){
    //A Scene, A Camera, and a Renderer

    // What is a scene?
    // A scene serves as a container for all our 3d objects and other components... This include lights, camera, 3d shapes, 2d shapes, 3d models e.t.c.
    const scene = new THREE.Scene();
    
    // What is a camera?
    // Serves as our eye to view anything that is in the scene... 
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight, 
        0.1, 
        1000 
    );

    camera.position.z = 10;

    // A Renderer 
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x232323);
   
    const boxGeometry = new THREE.BoxGeometry(4, 4, 4);
    const boxMaterial = new THREE.MeshNormalMaterial();
    const box = new THREE.Mesh(boxGeometry, boxMaterial);
    scene.add(box);

    renderer.render(scene, camera);

    document.body.appendChild(renderer.domElement);
}