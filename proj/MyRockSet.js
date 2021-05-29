import {CGFobject} from '../lib/CGF.js';
import { MyRock } from "./MyRock.js";

export class MyRockSet extends CGFobject {
    constructor(scene) {
        super(scene);
        this.rocks = []
        this.rock1 = new MyRock(this.scene, 20, 8);
        this.rock2 = new MyRock(this.scene, 30, 15);
        this.initBuffers();
        this.inMouth = false;
        this.idx = 0;
    }
    initBuffers(){
        for(var i = 0; i<= 10; ++i){
            var x = Math.ceil(Math.random() * 15) * (Math.round(Math.random()) ? 1 : -1);
            var z = Math.ceil(Math.random() * 6) * (Math.round(Math.random()) ? 1 : -1);
            var scaleX = (Math.round(Math.random()) ? 0.10 : 0.15);
            var scaleY = (Math.round(Math.random()) ? 0.05 : 0.08);
            var scaleZ = (Math.round(Math.random()) ? 0.10 : 0.15);
            this.rocks.push(new MyRock(this.scene, 20,10));
            this.rocks[i].setPosition(x,-0.7,z);
            this.rocks[i].setScale(scaleX,scaleY,scaleZ);
        }
    }

    display(){
        for(var i = 0; i < 11; i++){
            this.scene.pushMatrix();
            if((this.rocks[i].state == 0 || this.rocks[i].state == 2) && this.inMouth == false ){
                this.scene.translate(this.rocks[i].getPosition()[0],-0.7,this.rocks[i].getPosition()[2]);
                this.scene.scale(this.rocks[i].getScale()[0],this.rocks[i].getScale()[1],this.rocks[i].getScale()[2]);
                this.rocks[i].display();
            }
            this.scene.popMatrix();
        }
    }

    getRocks(){
        return this.rocks;
    }
}