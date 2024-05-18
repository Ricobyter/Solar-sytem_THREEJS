import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import starsTexture from '../img/stars.jpg'
import sunTexture from '../img/sun.jpg'
import earthTexture from '../img/earth.jpg'
import jupiterTexture from '../img/jupiter.jpg'
import marsTexture from '../img/mars.jpg'
import mercuryTexture from '../img/mercury.jpg'
import neptuneTexture from '../img/neptune.jpg'
import saturnRingTexture from '../img/saturn_ring.png'
import saturnTexture from '../img/saturn.jpg'
import uranusTexture from '../img/uranus.jpg'
import uranusRingTexture from '../img/uranus ring.png'
import venusTexture from '../img/venus.jpg'


const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);


// Sets orbit control to move the camera around
const orbit = new OrbitControls(camera, renderer.domElement);

// Camera positioning
camera.position.set(-90, 150, 150);
orbit.update();

const ambientLight = new THREE.AmbientLight(0x333333)
scene.add(ambientLight);

const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture
])
const loadingManager = new THREE.LoadingManager()
// loadingManager.onStart = function(url, item, total){
//     console.log(`Started Loading : ${url}`)
// }

const progressBar = document.getElementById('progress-bar')

loadingManager.onProgress = function(url, loaded, total){
    progressBar.value = (loaded/total)*100;
}

const progressContainer = document.querySelector('.progress-bar-container');
loadingManager.onLoad = function(){
    progressContainer.style.display = `none`
}

// loadingManager.onError = function(url){
//     console.error(`Error loadig ${url}`)
// }

const textureLoader = new THREE.TextureLoader(loadingManager);

const sunMap = textureLoader.load(sunTexture);
sunMap.colorSpace = THREE.SRGBColorSpace;
const sunGeo = new THREE.SphereGeometry(19, 30, 30);
const sunMat = new THREE.MeshBasicMaterial({
    map: sunMap
});
const sun = new THREE.Mesh(sunGeo, sunMat)
scene.add(sun);


//! Since there are nine planets so to avoid the code, We are going to make a function

function createPlanets(size, texture, position, ring){
    const map = textureLoader.load(texture);
    map.colorSpace = THREE.SRGBColorSpace;
    const geo = new THREE.SphereGeometry(size, 30, 30);
    const mat = new THREE.MeshStandardMaterial({
        map: map
    });
    const mesh = new THREE.Mesh(geo, mat);
    const obj = new THREE.Object3D();
    obj.add(mesh);
    if(ring) {
       //Doing the exact same thing to set the color the colorSpace of the ring's texture
        const ringMap = textureLoader.load(ring.texture);
        ringMap.colorSpace = THREE.SRGBColorSpace;
        const ringGeo = new THREE.RingGeometry(
            ring.innerRadius,
            ring.outerRadius,
            32);
        const ringMat = new THREE.MeshBasicMaterial({
            map: ringMap,
            side: THREE.DoubleSide
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        obj.add(ringMesh);
        ringMesh.position.x = position;
        ringMesh.rotation.x = -0.5 * Math.PI;
    }
    scene.add(obj);
    mesh.position.x = position;
    return {mesh, obj}
}


const mercury= createPlanets(3, mercuryTexture, 28)
const venus = createPlanets(5.5, venusTexture, 40)
const earth = createPlanets(6, earthTexture,65)
const mars = createPlanets(5.9, marsTexture,78)
const jupiter = createPlanets(12, jupiterTexture,100)
const saturn = createPlanets(10, saturnTexture, 138, {
    innerRadius: 10,
    outerRadius: 20,
    texture: saturnRingTexture
})
const uranus = createPlanets(8.5,uranusTexture, 178, {
    innerRadius: 7,
    outerRadius: 12,
    texture: uranusRingTexture
})
const neptune = createPlanets(7.2, neptuneTexture, 210)






// const saturnMap = textureLoader.load(saturnTexture);
// saturnMap.colorSpace = THREE.SRGBColorSpace;
// const saturnGeo = new THREE.SphereGeometry(10, 30, 30);
// const saturnMat = new THREE.MeshStandardMaterial({
//     map: saturnMap
// })
// const saturn = new THREE.Mesh(saturnGeo, saturnMat)

// const saturnObj = new THREE.Object3D();
// saturnObj.add(saturn);
// scene.add(saturnObj)
// saturn.position.x = 138 

// const saturnRingMap = textureLoader.load(saturnRingTexture);
// saturnRingMap.colorSpace = THREE.SRGBColorSpace;
// const saturnRingGeo = new THREE.RingGeometry(10, 20, 32);
// const saturnRingMat = new THREE.MeshBasicMaterial({
//     map: saturnRingMap,
//     side: THREE.DoubleSide
// })
// const saturnRing = new THREE.Mesh(saturnRingGeo, saturnRingMat)

// saturnObj.add(saturnRing);
// saturnRing.position.x = 138 
// saturnRing.rotation.x = -0.5 * Math.PI


const pointLight = new THREE.PointLight(0xFFFFFF, 30000, 3000)//?Color, Intensity, Maximum distance a light can reach
scene.add(pointLight)

function animate() {
    sun.rotateY(0.004); //?To make sun rotate horizontally
    // mercury.rotateY(0.008);
    // mercuryObj.rotateY(0.05);

    //* Rotation
    mercury.mesh.rotateY(0.008);
    venus.mesh.rotateY(0.009);
    earth.mesh.rotateY(0.007);
    mars.mesh.rotateY(0.009);
    jupiter.mesh.rotateY(0.007);
    saturn.mesh.rotateY(0.005);
    uranus.mesh.rotateY(0.005);
    neptune.mesh.rotateY(0.005);



    //* Revolution

    mercury.obj.rotateY(0.03);
    venus.obj.rotateY(0.009);
    earth.obj.rotateY(0.006);
    mars.obj.rotateY(0.003);
    jupiter.obj.rotateY(0.0009);
    saturn.obj.rotateY(0.0005);
    uranus.obj.rotateY(0.0002);
    neptune.obj.rotateY(0.00009);

     //?To make sun rotate horizontally
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});


//* Since each planet revolves around the sun at different speed, but we canm only control the speed of the parent element, which in case of mercury is sun. So what we have done is that we create a parent element for each planet and then control the speed of that parent element. But before that we put each parent at the same position of sun. Because the children will rotate around it  