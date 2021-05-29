import {CGFobject} from '../lib/CGF.js';

import { MyPyramid } from "./MyPyramid.js";
import {MyFish} from "./MyFish.js";

export class MyMovingObject extends CGFobject {
    constructor(scene) {
        super(scene);
        this.vel = 0;
        this.x = 0; this.y = 0; this.z = 0;
        this.angle = 0;
        this.yang = 0;
        this.fish = new MyFish(this.scene);
    }

    update(fps){
        this.angle += this.yang * fps/80;
        this.yang = 0;
        this.z += 0.1 * fps * this.vel * Math.cos(this.angle*Math.PI/180.0);
        this.x += 0.1 * fps * this.vel * Math.sin(this.angle*Math.PI/180.0);
        this.fish.update(fps);
    }
    display(){
        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y, this.z);//update da posição
        //this.scene.rotate(180.0*Math.PI/180.0,0,1,0);
        this.scene.rotate(this.angle*Math.PI/180.0,0,1,0); // rodar sobre si mesmo
        //this.scene.translate(this.x,this.y,this.z);
        this.fish.display();
        this.scene.popMatrix();
    }

    turn(val){
        this.yang += val;
    }


    accelerate(val){
        this.vel+= val;
        if(this.vel < 0) this.vel = 0;
    }

    reset(){
        this.angle = 0;
        this.vel = 0;
        this.x = 0;
        this.y=0;
        this.z = 0;
    }
}