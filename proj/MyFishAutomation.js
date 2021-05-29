import {CGFobject} from '../lib/CGF.js';
import {MyFish} from "./MyFish.js";

export class MyFishAutomation extends CGFobject {
    constructor(scene,center) {
        super(scene);
        this.orientation = 0;
        this.angX = 0;
        this.angY= 0;
        this.angZ = 0;
        this.turnleft = true;
        this.center = center;
        this.lastTime = 0;
        this.oldSpeed = 0;
        this.speed = 0;
        this.PosX = 0;
        this.PosY = 0;
        this.PosZ = 0;
        this.initBuffers();
    }

    initBuffers(){
        this.fish1 = new MyFish(this.scene);
        this.fish2 = new MyFish(this.scene);
    }

    update(fps){
        if(this.lastTime == 0)
            this.lastTime = fps;
        this.timeDelta= fps - this.lastTime;
        let tAuto= this.timeDelta / 1000;
        this.lastTime = fps;
        this.orientation+=(360/5) * tAuto;

        let ang = Math.PI*this.orientation/180;

        this.angX = Math.sin(ang);
        this.angZ = Math.cos(ang);

        this.PosX += this.angX * this.speed * tAuto;
        this.PosZ += this.angZ * this.speed * tAuto;

        this.autoAng = (this.autoAng + 10 * (this.speed *100))%360;
        this.fish1.update(fps);

    }

    display(scale){
        let ang = Math.PI*this.orientation/180;
        this.scene.pushMatrix();
        //Setting base angle orientation and scale
        this.scene.translate(this.PosX, this.PosY, this.PosZ);
        this.scene.rotate(ang, 0,10, 0);
        this.scene.scale(scale, scale, scale);
        this.scene.rotate(Math.PI*80 / 180, 0, 1, 0);
        this.fish1.display();
        this.scene.popMatrix();
    }

    autoFish(){
        this.oldSpeed = this.speed;
        this.speed = 50;
    }


}
