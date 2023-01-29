import './style.css'
import * as THREE from "three";
import gsap from "gsap";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

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

//Light
const light = new THREE.PointLight(0xffff, 1, 100)
light.position.set(0, 15, 9)
light.intensity = 1.25
scene.add(light)

//Camera 
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.5, 100)
camera.position.z = 20
scene.add(camera)

//Render 
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(2)
renderer.render(scene, camera)

//Controls
const controls = new OrbitControls(camera,canvas)

//Resize
window.addEventListener('resize', () => {
  //Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  //Update Camera
  camera.updateProjectionMatrix()
  camera.aspect = sizes.width / sizes.height
  renderer.setSize(sizes.width, sizes.height)
})
