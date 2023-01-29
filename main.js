import './style.css'
import * as THREE from "three";

//Scene
const scene = new THREE.Scene();

//Sphere
const geometry = new THREE.SphereGeometry(3, 64, 64)
const material = new THREE.MeshStandardMaterial({
  color: "#0080ff",
  roughness: 0.1
})

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh)

//Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

//Camera 
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.5, 100)
camera.position.z = 20
scene.add(camera)
