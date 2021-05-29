import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFtexture, CGFshader } from "../lib/CGF.js";
import { MySphere } from "./MySphere.js";
import { MyMovingObject } from "./MyMovingObject.js";
import { MyMovingFish } from "./MyMovingFish.js";
import { MyCubeMap } from "./MyCubeMap.js";
import { MyCylinder } from "./MyCylinder.js";
import { MyRockSet } from "./MyRockSet.js";
import { CGFcamera2} from "./CGFCamera2.js";
import {MySeaFloor} from "./MySeaFloor.js";
import {MyOceanBox} from "./MyOceanBox.js";
import {MyFishAutomation} from "./MyFishAutomation.js";
import { MyQuad } from "./MyQuad.js";
import { MyPillar } from "./MyPillar.js";

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
    constructor() {
        super();
        this.amplitude = 2.0;
        this.left = false;
        this.right = false;
        this.collect = -1;
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.setUpdatePeriod(50);

        this.enableTextures(true);

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.incompleteSphere = new MySphere(this, 16, 8);
        this.rocks = new MyRockSet(this);
        this.fish = new MyMovingFish(this,this.rocks);
        this.fishAuto = new MyFishAutomation(this,2);
        this.fishAuto.autoFish();
        this.cylinder = new MyCylinder(this, 6);
        this.oceanBox = new MyOceanBox(this);
        this.seaFloor = new MySeaFloor(this);
        //this.nest = new MyNest(this,0,0,0,1);

        this.pillar = new MyPillar(this);

        this.defaultAppearance = new CGFappearance(this);
        this.defaultAppearance.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setEmission(0,0,0,1);
        this.defaultAppearance.setShininess(120);

        this.sphereAppearance = new CGFappearance(this);
        this.sphereAppearance.setAmbient(0.3, 0.3, 0.3, 1);
        this.sphereAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
        this.sphereAppearance.setSpecular(0.0, 0.0, 0.0, 1);
        this.sphereAppearance.loadTexture('images/earth.jpg');
        this.sphereAppearance.setTextureWrap('REPEAT', 'REPEAT');
        this.sphereAppearance.setShininess(120);
        //Shader
        this.fishShader =new CGFshader(this.gl, "shaders/fish.vert", "shaders/fish.frag");
        this.fishShader.setUniformsValues({ uSampler2: 1 });
        this.floorShader = new CGFshader(this.gl, "shaders/terrain.vert", "shaders/terrain.frag");
        this.floorShader.setUniformsValues({sandMap:1}, {sandTex:0});
        this.pierShader = new CGFshader(this.gl, "shaders/pier.vert","shaders/pier.frag");
        this.pierShader.setUniformsValues({pierBase:2}, {pierDistortion: 3}, {timeFactor:0});
        //Objects connected to MyInterface
        this.displayAxis = true;
        this.displayFish = true;
        this.displayCube = true;
        this.displayCylinder = false;
        this.displaySphere = false;

        this.displayPillar = false;

        this.selectedTexture = -1;
        //variables
        this.lastUpdate = 0;
        this.speedFactor = 1;
        this.scaleFactor = 0.8;


    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera2(1.5, 2.0, 500, vec3.fromValues(2, 2, 2), vec3.fromValues(0, 2, 0));
    }

    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setEmission(0,0,0,1);
        this.setShininess(10.0);
    }

    checkKeys(){
        var text="Keys pressed: ";

        var keysPressed=false;

        // Check for key codes e.g. in https://keycode.info/
        if (this.gui.isKeyPressed("KeyW")){
            text+=" W ";
            keysPressed=true;
            this.fish.accelerate(0.005*this.speedFactor);
        }
        if (this.gui.isKeyPressed("KeyS")){
            text+=" S ";
            keysPressed=true;
            this.fish.accelerate(-0.05*this.speedFactor);
        }
        if (this.gui.isKeyPressed("KeyP") ){
            text+=" P ";
            keysPressed=true;
            this.fish.upAndDown(0.05*this.speedFactor);
        }
        if (this.gui.isKeyPressed("KeyL")){
            text+=" L ";
            keysPressed=true;
            this.fish.upAndDown(-0.05*this.speedFactor);
        }
        if (this.gui.isKeyPressed("KeyA")){
            text+=" A ";
            keysPressed=true;
            this.fish.turn(5,true);
        }
        if (this.gui.isKeyPressed("KeyD")){
            text+=" D ";
            keysPressed=true;
            this.fish.turn(-5);
        }
        if (this.gui.isKeyPressed("KeyC")){
            text+=" C ";
            keysPressed=true;
            if(this.fish.y <=0){

            }
            this.collect *= -1;
        }
        if (this.gui.isKeyPressed("KeyR")){
            text+=" R ";
            keysPressed=true;
            this.fish.reset();
        }
        if (keysPressed)
            console.log(text);
    }

    // called periodically (as per setUpdatePeriod() in init())
    update(t){
        if(this.lastUpdate == 0)
            this.lastUpdate = t;
        let fps = t- this.lastUpdate;
        this.lastUpdate = t;
        this.checkKeys();
        this.fish.update(fps);
        this.fishAuto.update(fps);
        this.seaFloor.setUniforms(t);
        this.oceanBox.setUniforms(t);
    }

    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();

        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        this.seaFloor.display();

        //Textures
        //this.setDefaultAppearance();
        //this.defaultAppearance.apply();



        // ---- BEGIN Primitive drawing section




        /*this.pushMatrix();
        this.translate(6,0,-6);
        //this.nest.display();
        this.popMatrix();*/
        this.pushMatrix();
        if(this.displayFish){
            //this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
            this.translate(this.fish.x,this.fish.y,this.fish.z);
            this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
            this.translate(-this.fish.x, -this.fish.y, -this.fish.z);
            this.fish.display();
        }
        this.popMatrix();
        this.pushMatrix();
        this.fishAuto.display(0.3);
        this.popMatrix();

        this.pushMatrix();
        if(this.displayCube){
            this.oceanBox.display();
        }
        this.popMatrix();
        //This sphere does not have defined texture coordinates
        this.pushMatrix();
        this.sphereAppearance.apply();
        if(this.displaySphere){
            this.incompleteSphere.display();
        }
        this.popMatrix();
        this.rocks.display();
        
        this.pushMatrix();
        if(this.displayCylinder){
            this.cylinder.display();
        }
        this.popMatrix();

        this.pushMatrix();
        this.pillar.display();
        this.popMatrix();

        // ---- END Primitive drawing section
    }
}