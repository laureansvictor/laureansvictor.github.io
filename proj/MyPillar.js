import {CGFobject, CGFappearance} from '../lib/CGF.js';
import { MyCylinder } from './MyCylinder.js';

/**
 * MyCylinder
 * @constructor
 */
export class MyPillar extends CGFobject {
    constructor(scene){
        super(scene);
        this.scene = scene;
        this.initBuffers();
        this.initMaterial();
    }

    initBuffers(){
        this.pillar = new MyCylinder(this.scene, 50);
    }

    initMaterial(){
        //rust
        this.rustMaterial = new CGFappearance(this.scene);
        this.rustMaterial.setAmbient(0.8, 0.8, 0.8, 1.0);
        this.rustMaterial.setDiffuse(0.8, 0.8, 0.8, 1.0);
        this.rustMaterial.setSpecular(0.1, 0.1, 0.1, 1.0);
        this.rustMaterial.setShininess(5.0);
        this.rustMaterial.loadTexture('images/rust.jpg');
        this.rustMaterial.setTextureWrap('REPEAT', 'REPEAT');
    }

    display(){
        this.scene.pushMatrix();
        this.rustMaterial.apply();
        this.scene.translate(-11,-1,24);
        this.scene.scale(0.5,12,0.5);
        this.pillar.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.rustMaterial.apply();
        this.scene.translate(-7,-1,20);
        this.scene.scale(0.5,12,0.5);
        this.scene.rotate(Math.PI*90/180,0,1,0);
        this.pillar.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.rustMaterial.apply();
        this.scene.translate(-3.5,-1,17);
        this.scene.scale(0.5,12,0.5);
        this.scene.rotate(Math.PI*180/180,0,1,0);
        this.pillar.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.rustMaterial.apply();
        this.scene.translate(-0.5,-1,14);
        this.scene.scale(0.5,12,0.5);
        this.pillar.display();
        this.scene.popMatrix()

    }







}