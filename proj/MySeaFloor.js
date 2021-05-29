import { CGFappearance, CGFtexture, CGFshader, CGFobject } from "../lib/CGF.js";
import {MyPlane} from "./MyPlane.js";
/**
 * MySeaFloor
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MySeaFloor extends CGFobject {

    constructor(scene){
        super(scene);
        this.plane = new MyPlane(this.scene, 50);
        this.initMaterials();
    }

    initMaterials(){
        this.baseSand = new CGFtexture(this.scene, 'images/project-part-b-images/images/sandWithShell.png');
        this.sandMap = new CGFtexture(this.scene, 'images/project-part-b-images/images/sandMap.png');
    }

    setUniforms(t){
        this.scene.floorShader.setUniformsValues({sandMap: 1}, {sandTex: 0});
    }

    display(){
        this.baseSand.bind(0);
        this.sandMap.bind(1);
        this.scene.setActiveShader(this.scene.floorShader);
        this.scene.pushMatrix();
        this.scene.translate(0,1,0);
        this.scene.rotate(-0.5 * Math.PI, 1, 0, 0);
        this.scene.scale(50, 50, 3);
        this.plane.display();
        this.scene.popMatrix();

        this.scene.setActiveShader(this.scene.defaultShader);
    }


}