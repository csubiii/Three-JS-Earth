import './style.css'
import * as THREE from "three";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

//Scene
const scene = new THREE.Scene();


//Sphere

/*const loader = new THREE.TextureLoader();
const material = new THREE.MeshPhongMaterial()({
  map: loader.load('/7MXox.jpg'),
  bumpMap: loader.load('/dG4sE.jpg'),
  bumpScale: 0.015,
});*/

const geometry = new THREE.SphereGeometry(3, 64, 64)

const material = new THREE.MeshPhongMaterial()

const texture = new THREE.TextureLoader().load('/earthtexture.jpg')
material.map = texture

const bumpTexture = new THREE.TextureLoader().load('/bump.jpg')
material.bumpMap = bumpTexture
material.bumpScale = 0.1

const specularTexture = new THREE.TextureLoader().load('/specular.jpg')
material.specularMap = specularTexture
material.specular = new THREE.Color('#eaf1f8')

//Cloud
const cloudGeometry = new THREE.SphereGeometry(3.01, 60, 60)
const cloudMaterial = new THREE.MeshBasicMaterial()
const cloudTexture = new THREE.TextureLoader().load('/cloud.jpg')
cloudMaterial.map = cloudTexture
cloudMaterial.side = THREE.DoubleSide
cloudMaterial.opacity = 0.04
cloudMaterial.transparent = true
cloudMaterial.depthWrite = false

const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial)

//Mesh
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh, cloudMesh)


//Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

//Light
const light = new THREE.PointLight( 0xffffff, 1, 0 );
light.position.set( 0, 500, 0 );
scene.add(light)

//Camera 
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.5, 100)
camera.position.z = 19
scene.add(camera)

//Render 
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(2)
renderer.render(scene, camera)

//Controls
const controls = new OrbitControls(camera,canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = true
controls.autoRotate = true
controls.autoRotateSpeed = 1

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

//Loop
const loop = () => {
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
  cloudMesh.rotation.y += 0.01 / 9;
}
loop()