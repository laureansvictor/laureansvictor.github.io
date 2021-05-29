import {CGFobject} from '../../lib/CGF.js';

import {MyFin} from "./MyFin.js";
/**
 * MyFishFins
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyFishFins extends CGFobject {

    constructor(scene) {
        super(scene);
        this.initBuffers();
        this.alphaInit = -45;
        this.alphaRight = 0;
        this.alphaLeft = 0;
        this.alphaBack = 0;
    }

    initBuffers(){
        this.fin = new MyFin(this.scene);
    }

    update(angFin, rangeFin,goingLeft, goingRight){
        this.alphaLeft = -(this.alphaInit /3 - angFin / 3 / rangeFin * this.alphaInit)+0.15;
        this.alphaRight = this.alphaInit /3 - angFin / 3 / rangeFin * this.alphaInit;
        if(goingLeft)
            this.alphaLeft = -this.alphaInit;
        if(goingRight)
            this.alphaRight = this.alphaInit;

    }

    displayRightFin(){
        let a = this.alphaRight;
        let finLenght = 0.4;
        let finWidth = 0.2;

        this.scene.pushMatrix();
        this.scene.translate(-0.5,2.8,0);
        this.scene.rotate(Math.PI/2.0,0,1,0);
        this.scene.rotate(-Math.PI/2.0,0,0,1);
        this.scene.rotate(a*Math.PI/180,0,1,0);
        this.scene.scale(finWidth, finLenght,1);
        //this.red.apply();
        this.fin.display();
        this.scene.popMatrix();
    }

    displayLeftFin(){
        let a = this.alphaLeft;
        let finLenght = 0.4;
        let finWidth = 0.2;

        this.scene.pushMatrix();
        this.scene.translate(0.5,2.8,0);
        this.scene.rotate(-Math.PI/2,0,1,0);
        this.scene.rotate(Math.PI/2,0,0,1);
        this.scene.rotate(a*Math.PI/180,0,1,0);
        this.scene.scale(finWidth,finLenght,1);
        //this.red.apply();
        this.fin.display();
        this.scene.popMatrix();
    }

    displayBackFin(){
        let a = this.alphaBack;
        this.scene.pushMatrix();
        this.scene.translate(0,3,-1.1);
        this.scene.rotate(a*Math.PI/180.0,0,1,0);
        this.fin.display();
        this.scene.popMatrix();
    }


}