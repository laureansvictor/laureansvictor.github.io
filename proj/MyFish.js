import {CGFobject, CGFappearance, CGFtexture, CGFshader} from '../lib/CGF.js';
import { MySphere } from "./components/MySphere.js";
import { MyFin} from "./components/MyFin.js";
import { MyFishFins} from "./components/MyFishFins.js";

export class MyFish extends CGFobject {
    constructor(scene, fps){
        super(scene);
        this.lastUpdate = 0;
        this.initMaterial(this.scene);
        this.topfin = new MyFin(scene);
        this.backfin = new MyFin(scene);
        this.body = new MySphere(scene, 25, 15);
        this.lefteye = new MySphere(scene, 16, 8);
        this.righteye = new MySphere(scene, 16, 8);
        this.angle = 0;
        this.rightAngle = 45;
        this.leftAngle = 45;
        this.amplitude = 2.0;
        //NewApproach
        this.vel = 0;
        this.timed = 0;
        this.time = 0;
        this.finTime = 0;
        this.initBuffers();
    }

    initBuffers(){
        this.fins = new MyFishFins(this.scene);
    }

    update(fps){
        //Better moving Fin
        let timeDelta = fps - this.timed;
        this.timed = fps;
        this.time += timeDelta * this.scene.speedFactor;

        let finRange = 80*Math.PI/180;
        this.finTime += timeDelta * (1+this.vel/2)*this.scene.speedFactor;
        this.finAlpha = Math.sin(4*this.finTime * Math.PI /100) * -finRange;
        let left = false;
        let right = false;
        if(this.scene.gui.isKeyPressed("KeyA"))
            left = true;
        if(this.scene.gui.isKeyPressed("KeyD"))
            right = true;
        this.fins.update(this.finAlpha,finRange,left,right);
        //this.wing.update(wingRange, this.wingAlfa);


        if(fps%1==0){
            if(this.angle == 0){
                this.turn(20)
            }
            else if(this.angle >0){
                this.turn(-40);
            }else if(this.angle < 0)
                this.turn(20);
        }
    }
    turn(val){
        this.angle +=val;
    }
    initMaterial(scene){
        //redCollor
        this.red = new CGFappearance(scene);
        this.red.setAmbient(0.5,0.1,0.1,1.0);
        this.red.setDiffuse(1.0,0.0,0.0,1.0);
        this.red.setEmission(1, 0, 0, 1);
        this.red.setShininess(10);

        //whiteCollor
        this.white = new CGFappearance(scene);
        this.white.setAmbient(1, 1, 1, 1.0);
        this.white.setDiffuse(1, 1, 1, 1.0);
        this.white.setSpecular(1, 1, 1, 1.0);
        this.white.setEmission(0,0,0,1);
        this.white.setShininess(120);

        //blackCollor
        this.black = new CGFappearance(scene);
        this.black.setAmbient(0, 0, 0, 1.0);
        this.black.setDiffuse(1*0.7,0,0,1.0);
        this.black.setSpecular(1.0,1.0,1.0,0);
        this.black.setEmission(0,0,0,1);
        this.black.setShininess(120);

        //fishScale
        this.scale = new CGFappearance(scene);
        this.scale.setAmbient(0.1,0.1,0.1,1.0);
        this.scale.setDiffuse(1.0,0,0,1.0);
        this.scale.setSpecular(0,0,0,1);
        this.scale.loadTexture('images/project-part-b-images/fish/fish2.jpg');
        this.scale.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
        this.scale.setShininess(10);

    }
    display(){
        this.scene.pushMatrix();
        this.scale.apply();
        this.scene.setActiveShader(this.scene.fishShader);
        this.scene.translate(0,3,0);
        this.scene.scale(0.65,0.75,1.2);
        this.body.display();
        this.scene.defaultAppearance.apply();
        this.scene.setActiveShaderSimple(this.scene.defaultShader);
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.scene.translate(0,3.4,0.8);
        this.red.apply();
        this.topfin.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,3,-1.1);
        this.scene.rotate(this.angle*Math.PI/180.0,0,1,0);
        //this.red.apply();
        this.backfin.display();
        /*this.fins.displayBackFin();*/
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.fins.displayRightFin();
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.fins.displayLeftFin();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(0.15,0.15,0.15);
        this.scene.translate(3,21,5);
        this.white.apply();
        this.lefteye.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(0.08,0.08,0.08);
        this.scene.translate(6.5,39.5,10);
        this.black.apply();
        this.lefteye.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(0.15,0.15,0.15);
        this.scene.translate(-3,21,5);
        this.white.apply();
        this.righteye.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(0.08,0.08,0.08);
        this.scene.translate(-6.5,39.5, 10);
        this.black.apply();
        this.righteye.display();
        this.scene.popMatrix();

        this.scene.sphereAppearance.apply();
    }

    /**
     * Enables visualization of Object's normals
     */
    enableNormalViz() {
        this.body.enableNormalViz();
    }
    /**
     * Disables visualization of Object's normals
     */
    disableNormalViz() {
        this.body.disableNormalViz();
    }
}