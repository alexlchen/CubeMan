/// <reference path="_reference.ts"/>


// MAIN GAME FILE

// THREEJS Aliases
import Scene = THREE.Scene;
import Renderer = THREE.WebGLRenderer;
import PerspectiveCamera = THREE.PerspectiveCamera;
import BoxGeometry = THREE.BoxGeometry;
import CubeGeometry = THREE.CubeGeometry;
import PlaneGeometry = THREE.PlaneGeometry;
import SphereGeometry = THREE.SphereGeometry;
import Geometry = THREE.Geometry;
import AxisHelper = THREE.AxisHelper;
import LambertMaterial = THREE.MeshLambertMaterial;
import MeshBasicMaterial = THREE.MeshBasicMaterial;
import Material = THREE.Material;
import Mesh = THREE.Mesh;
import Object3D = THREE.Object3D;
import SpotLight = THREE.SpotLight;
import PointLight = THREE.PointLight;
import AmbientLight = THREE.AmbientLight;
import Control = objects.Control;
import GUI = dat.GUI;
import Color = THREE.Color;
import Vector3 = THREE.Vector3;
import Face3 = THREE.Face3;
import Point = objects.Point;
import CScreen = config.Screen;
//import GeometryUtils = THREE.GeometryUtils;

//Custom Game Objects
import gameObject = objects.gameObject;

var scene: Scene;
var renderer: Renderer;
var camera: PerspectiveCamera;
var axes: AxisHelper;

var cube_arm:Mesh;
var cube_head: Mesh;
var cube_body: Mesh;
var cube_lArm: Mesh;
var cube_rArm: Mesh;
var cube_lHand: Mesh;
var cube_rHand: Mesh;
var cube_lLeg: Mesh;
var cube_rLeg: Mesh;
var cube_lFoot: Mesh;
var cube_rFoot: Mesh;
var robot: Mesh;

var cubeGeometry_arm: CubeGeometry;
var cubeGeometry_head: CubeGeometry;
var cubeGeometry_body: CubeGeometry;
var cubeGeometry_lArm: CubeGeometry;
var cubeGeometry_rArm: CubeGeometry;
var cubeGeometry_lHand: CubeGeometry;
var cubeGeometry_rHand: CubeGeometry;
var cubeGeometry_lLeg: CubeGeometry;
var cubeGeometry_rLeg: CubeGeometry;
var cubeGeometry_lFoot: CubeGeometry;
var cubeGeometry_rFoot: CubeGeometry;


var plane: Mesh;
var sphere: Mesh;
var ambientLight: AmbientLight;
var spotLight: SpotLight;
var control: Control;
var gui: GUI;
var stats: Stats;
var step: number = 0;

var cubeMaterial:LambertMaterial;


function init() {
    // Instantiate a new Scene object
    scene = new Scene();
    scene.overrideMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff }); //force all the objects in the scene to use the same materila

    setupRenderer(); // setup the default renderer
	
    setupCamera(); // setup the camera
	
    // add an axis helper to the scene
    axes = new AxisHelper(10);
    scene.add(axes);
    console.log("Added Axis Helper to scene...");
    
    //Add a Plane to the Scene
    plane = new gameObject(
        new PlaneGeometry(16, 16, 1, 1),                //width, height, widthsegments, heighsegments
        new LambertMaterial({ color: 0xe0e0e0 }),
        0, 0, 0);
    plane.rotation.x = -0.5 * Math.PI; //rotate 45 degree
    scene.add(plane);
    console.log("Added Plane Primitive to scene...");
    
    cubeMaterial = new LambertMaterial({ color: 0x00ff00 });
/*    var materials = [
        new THREE.MeshLambertMaterial({
            opacity: 0.6,
            color: 0x44ff44,
            transparent: true
        }),
        new THREE.MeshBasicMaterial({
            color: 0x000000,
            wireframe: true
        })
    ];
*/
    //cubeMaterial = materials[0];

    //Add a Head to the Scene
    cubeGeometry_head = new CubeGeometry(1.5, 1.2, 1.5);       //width, height, depth
    cube_head = new Mesh(cubeGeometry_head, cubeMaterial);
    cube_head.castShadow = true;
    cube_head.receiveShadow = true;
    cube_head.position.y = 2;
    scene.add(cube_head);

    //body
    cubeGeometry_body = new CubeGeometry(2, 3, 2);       //width, height, depth
    cube_body = new Mesh(cubeGeometry_body, cubeMaterial);
    cube_body.castShadow = true;
    cube_body.receiveShadow = true;
    cube_body.position.y = 7.0;
    scene.add(cube_body);

    cubeGeometry_arm = new CubeGeometry(6, 0.7, 0.7);       //width, height, depth
    cube_arm = new Mesh(cubeGeometry_arm, cubeMaterial);
    cube_arm.castShadow = true;
    cube_arm.receiveShadow = true;
    cube_arm.position.x = 0;
    cube_arm.position.y = 1;
    scene.add(cube_arm);
 /*  
    //left arm
    cubeGeometry_lArm = new CubeGeometry(2, 1, 1);       //width, height, depth
    cube_lArm = new Mesh(cubeGeometry_lArm, cubeMaterial);
    //cube_head.castShadow = true;
    //cube_head.receiveShadow = true;
    cube_lArm.position.x = -2;
    cube_lArm.position.y = 7.5;
    scene.add(cube_lArm);

    //right arm
    cubeGeometry_rArm = new CubeGeometry(2, 1, 1);       //width, height, depth
    cube_rArm = new Mesh(cubeGeometry_rArm, cubeMaterial);
    //cube_head.castShadow = true;
    //cube_head.receiveShadow = true;
    cube_rArm.position.x = 2;
    cube_rArm.position.y = 7.5;
    scene.add(cube_rArm);

    //left hand
    cubeGeometry_lHand = new CubeGeometry(1.8, 0.7, 0.7);       //width, height, depth
    cube_lHand = new Mesh(cubeGeometry_lHand, cubeMaterial);
    //cube_head.castShadow = true;
    //cube_head.receiveShadow = true;
    cube_lHand.position.x = -4;
    cube_lHand.position.y = 7.5;
    scene.add(cube_lHand);

    //right hand
    cubeGeometry_rHand = new CubeGeometry(1.8, 0.7, 0.7);       //width, height, depth
    cube_rHand = new Mesh(cubeGeometry_rHand, cubeMaterial);
    //cube_head.castShadow = true;
    //cube_head.receiveShadow = true;
    cube_rHand.position.x = 4;
    cube_rHand.position.y = 7.5;
    scene.add(cube_rHand);
*/

    //left leg
    cubeGeometry_lLeg = new CubeGeometry(0.9, 5.5, 0.9);       //width, height, depth
    cube_lLeg = new Mesh(cubeGeometry_lLeg, cubeMaterial);
    //cube_head.castShadow = true;
    //cube_head.receiveShadow = true;
    cube_lLeg.position.x = -0.5;
    cube_lLeg.position.y = -3.0;
    scene.add(cube_lLeg);
   

    //right leg
    cubeGeometry_rLeg = new CubeGeometry(0.9, 5.5, 0.9);       //width, height, depth
    cube_rLeg = new Mesh(cubeGeometry_rLeg, cubeMaterial);
    //cube_head.castShadow = true;
    //cube_head.receiveShadow = true;
    cube_rLeg.position.x = 0.5;
    cube_rLeg.position.y = -3.0;
    scene.add(cube_rLeg);
/*
    //left foot
    cubeGeometry_lFoot = new CubeGeometry(0.9, 2.5, 2);       //width, height, depth
    cube_lFoot = new Mesh(cubeGeometry_lFoot, cubeMaterial);
    //cube_head.castShadow = true;
    //cube_head.receiveShadow = true;
    cube_lFoot.position.x = -0.5;
    cube_lFoot.position.y = 1.3;
    scene.add(cube_lFoot);

    //right foot
    cubeGeometry_rFoot = new CubeGeometry(0.9, 2.5, 2);       //width, height, depth
    cube_rFoot = new Mesh(cubeGeometry_rFoot, cubeMaterial);
    //cube_head.castShadow = true;
    //cube_head.receiveShadow = true;
    cube_rFoot.position.x = 0.5;
    cube_rFoot.position.y = 1.3;
    scene.add(cube_rFoot);
*/

    cube_body.add(cube_head);
    cube_body.add(cube_arm);
    cube_body.add(cube_lLeg);
    cube_body.add(cube_rLeg);

    console.log("Added Robot Primitive to scene...");
    
    
    // Add an AmbientLight to the scene
    ambientLight = new AmbientLight(0x090909);
    scene.add(ambientLight);
    console.log("Added an Ambient Light to Scene");
	
    // Add a SpotLight to the scene
    spotLight = new SpotLight(0xffffff);
    spotLight.position.set(5.6, 23.1, 5.4);
    spotLight.rotation.set(-0.8, 42.7, 19.5);
    spotLight.castShadow = true;
    scene.add(spotLight);
    console.log("Added a SpotLight Light to Scene");
    
    // add controls:rotationSpeedX, rotationSpeedY,rotationSpeedZ, cubeColor
    gui = new GUI();
    control = new Control(0.0, 0.0, 0.0, 0xffffff);
    addControl(control);

    //var controls = new function () {
    //    this.changeColor = function() {
    //        this.cubeColor = Math.random() * 0xffffff;
    //    };
    //}
    //gui.add(controls, 'changeColor');
    //console.log(controls.cubeColor);

    // Add framerate stats
    addStatsObject();
    console.log("Added Stats to scene...");

    document.body.appendChild(renderer.domElement);
    gameLoop(); // render the scene	
    
    window.addEventListener('resize', onResize, false);
}

function onResize(): void {
    camera.aspect = CScreen.RATIO;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    //renderer.setSize(CScreen.WIDTH, CScreen.HEIGHT);
}

function addControl(controlObject: Control): void {
    gui.add(controlObject, 'rotationSpeedX', -0.5, 0.5);
    gui.add(controlObject, 'rotationSpeedY', -0.5, 0.5);
    gui.add(controlObject, 'rotationSpeedZ', -0.5, 0.5);
    gui.add(controlObject, 'cubeColor', 0x0, 0xffffff);
}

function addStatsObject() {

    stats = new Stats();

    stats.setMode(0); //mode: 0-fps, 1-ms
    //top-left corner
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);
}

// Setup main game loop
function gameLoop(): void {
    stats.update();

    cube_body.rotation.x += control.rotationSpeedX;
    cube_body.rotation.y += control.rotationSpeedY;
    cube_body.rotation.z += control.rotationSpeedZ;

    //cube_head.rotation.y += control.rotationSpeed;
    //cube_arm.rotation.y += control.rotationSpeed;
    //cube_lArm.rotation.y += control.rotationSpeed;
    //cube_rArm.rotation.y += control.rotationSpeed;
    //cube_lHand.rotation.y += control.rotationSpeed;
    //cube_rHand.rotation.y += control.rotationSpeed;
    //cube_lLeg.rotation.y += control.rotationSpeed;
    //cube_rLeg.rotation.y += control.rotationSpeed;
    //cube_lFoot.rotation.y += control.rotationSpeed;
    //cube_rFoot.rotation.y += control.rotationSpeed;

    // render using requestAnimationFrame
    requestAnimationFrame(gameLoop);

    scene.overrideMaterial = new THREE.MeshLambertMaterial({ color: control.cubeColor });
    // render the scene
    renderer.render(scene, camera);
}

// Setup default renderer
function setupRenderer(): void {

    renderer = new Renderer();
    renderer.setClearColor(0xEEEEEE, 1.0);   //color, alpha
    //renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setSize(CScreen.WIDTH, CScreen.HEIGHT);
    renderer.shadowMap.enabled = true;
    console.log("Finished setting up Renderer...");
}

// Setup main camera for the scene
function setupCamera(): void {
    
    //camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera = new PerspectiveCamera(45, config.Screen.RATIO, 0.1, 1000);
    camera.position.x = 0.6;
    camera.position.y = 16;
    camera.position.z = -20.5;
    camera.lookAt(new Vector3(0, 0, 0));
    console.log("Finished setting up Camera...");
}
