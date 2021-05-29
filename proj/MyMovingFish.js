import {CGFobject} from '../lib/CGF.js';

import { MyPyramid } from "./MyPyramid.js";
import {MyFish} from "./MyFish.js";
import {MyRockSet} from "./MyRockSet.js";
function getDistance(x1,x2,z1,z2){
    return Math.sqrt(Math.pow((x2-x1),2)+Math.pow((z2-z1),2));
}
export class MyMovingFish extends CGFobject {
    constructor(scene, rockSet) {
        super(scene);
        this.fish = new MyFish(this.scene);
        this.rocks = rockSet.getRocks();
        this.hasRock = false;
        this.idx = 0;
        this.initPosition();
    }

    initPosition(){
        this.vel = 0;
        this.x = 0; this.y = 0; this.z = 0;
        this.angle = 0;
        this.yang = 0;
    }

    update(fps){
        this.angle += this.yang * fps/80;
        this.yang = 0;
        console.log(this.vel);
        this.z += 0.1 * fps * this.vel * Math.cos(this.angle*Math.PI/180.0);
        this.x += 0.1 * fps * this.vel * Math.sin(this.angle*Math.PI/180.0);
        this.fish.update(fps);
        this.checkRockSet();
        this.rocks[this.idx].update(fps);
    }

    checkRockSet(){
        for(var i=0; i<=10;i++){
            let dist = getDistance(this.x,this.rocks[i].posX,this.z,this.rocks[i].posZ);
            if(this.y <= -1) {

                if (dist<= 0.75 && this.hasRock == false) {
                    console.log("Rock[", i, "] is in range to be picked; state of rock- ", this.rocks[i].state);
                    console.log(dist);
                    if (this.scene.gui.isKeyPressed("KeyC")) {
                        this.rocks[i].state = 1;
                        this.idx = i;
                        this.hasRock = true;
                        this.rocks[i].inMouth = true;
                    }
                }
            }
        }
        if((this.x >= 4.3 && this.x <=8) && (this.z >= -7.5 && this.z <= -4.3)){
            if(this.rocks[this.idx].state == 1) {
                console.log("Rock[", this.idx, "] is in range to be dropped state of rock- ", this.rocks[this.idx].state);
                if (this.scene.gui.isKeyPressed("KeyC")) {
                    this.rocks[this.idx].state = 2;
                    this.hasRock = false;
                    this.rocks[this.idx].inMouth = false;
                    this.rocks[this.idx].setPosition(this.x, this.y, this.z + 0.5);
                    this.rocks[this.idx].drop(this.rocks[this.idx].getPosition()[0], this.rocks[this.idx].getPosition()[2]);
                    console.log("New rock state: ", this.rocks[this.idx]);
                }
            }
        }




    }

    display(){
        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y, this.z);//update da posição
        this.scene.scale(0.5,0.5,0.5);
        this.scene.rotate(this.angle*Math.PI/180.0,0,1,0); // rodar sobre si mesmo
        this.fish.display();
        if(this.rocks[this.idx].state == 1 && this.hasRock == true && this.rocks[this.idx].inMouth) {
            this.scene.translate(0, 1.4, 0.80);
            this.scene.scale(0.40-this.rocks[this.idx].getScale()[0], 0.20-this.rocks[this.idx].getScale()[1], 0.40-this.rocks[this.idx].getScale()[2]);
            this.rocks[this.idx].display();
        }

        this.scene.popMatrix();
    }

    turn(val){
        this.yang += val;
    }
    upAndDown(val){
        if((this.y>= -1.2 && val >0) && (this.y <=4 && val > 0))
            this.y += val;
        if(this.y >= 4 && (val < 0))
            this.y +=val;
        if(this.y <= -1.2 && val > 0)
            this.y +=val;
        if(this.y >= -1.2 && val < 0)
            this.y +=val;

    }

    accelerate(val){
        this.vel+= val;
        this.fish.vel += val;
        if(this.vel < 0) this.vel = 0;
    }

    reset(){
        this.angle = 0;
        this.vel = 0;
        this.x = 0;
        this.y=0;
        this.z = 0;
        if(this.hasRock){
            this.hasRock=false;
            this.rocks[this.idx].state = 0;
        }
    }

    getPosition(){
        return [this.x, this.y, this.z];
    }
}