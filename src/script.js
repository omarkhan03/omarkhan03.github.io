import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { LoadingManager } from 'three';

// Canvas
const canvas = document.getElementById('webgl')

// Scene
const scene = new THREE.Scene()

const loadingGif = document.getElementById('ld')

const loadingManager = new THREE.LoadingManager()

loadingManager.onLoad = function ( ) {
    loadingGif.style.display = 'none';
}

// Instantiate a loader
const loader = new GLTFLoader(loadingManager);

// Optional: Provide a DRACOLoader instance to decode compressed mesh data
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath( '/examples/jsm/libs/draco/' );
loader.setDRACOLoader( dracoLoader );

// Load a glTF resource
loader.load(
	// resource URL
	'models/me4.glb',
	// called when the resource is loaded
	function ( gltf ) {


        // var material = new THREE.LineBasicMaterial( { color: 0x000000 } );

        // var geometry = new THREE.EdgesGeometry( gltf.scene.children[0].children[0].geometry );
        // var wireframe1 = new THREE.LineSegments( geometry, material );

        // gltf.scene.add( wireframe1 );
        
        gltf.scene.rotateX(Math.PI/2)
        gltf.scene.rotateY(Math.PI/2)
		scene.add( gltf.scene );
        console.log(scene)


	},
	// called while loading is progressing
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	},
);




/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 1.8)
scene.add(ambientLight)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth/4,
    height: window.innerWidth/4
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth/4
    sizes.height = window.innerWidth/4

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(window.devicePixelRatio * 2)
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000000)
camera.position.set(0,2.4,0)

camera.rotation.set(0,0,0)

camera.up.set( 0, 0, -1 );

scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableRotate = false
controls.enablePan = false
controls.enableZoom = false

controls.autoRotate = true
controls.autoRotateSpeed = 7
controls.target.set(0,0,0)
controls.enableDamping = true
controls.saveState()

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    alpha: true,
    canvas: canvas,
    // antialias: true 
})
renderer.setClearColor(0xffffff, 0);


renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(window.devicePixelRatio * 2)

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0





const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    // console.log(camera.position, camera.rotation)

    // scene.children[3].children.rotateY(0.01)

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()