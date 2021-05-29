import {CGFobject, CGFtexture,CGFappearance} from '../lib/CGF.js';
import {MyCubeMap} from "./MyCubeMap.js";
import {MyPlane} from "./MyPlane.js";

/**
 * MyOceanBox
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyOceanBox extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initMaterials();
        this.initBuffers();
    }
    initBuffers() {
        this.topOcean = new MyPlane(this.scene, 60);
        this.oceanbox = new MyCubeMap(this.scene);
    }


    initMaterials() {
        //oceanbox material
        this.material = new CGFappearance(this.scene);
        this.material.setEmission(1, 1, 1, 1);
        this.material.loadTexture('images/project-part-b-images/images/underwater_cubemap/neocubemap.jpg');
        this.material.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.pierBase = new CGFtexture(this.scene,'images/project-part-b-images/images/pier.jpg');
        this.pierDistortion = new CGFtexture(this.scene, 'images/project-part-b-images/images/distortionmap.png');
    }

    setUniforms(t){
        this.scene.pierShader.setUniformsValues({pierBase:1}, {pierDistortion: 0});
        this.scene.pierShader.setUniformsValues({timeFactor:  t / 1000 % 10000});
    }



    display() {
        this.scene.pushMatrix();
        this.material.apply();
        this.scene.translate(0,2,0);
        //this.scene.scale(2,2,2);
        this.scene.scale(Math.sqrt(2) * 25, Math.sqrt(2) * 25, Math.sqrt(2) * 25);
        this.oceanbox.display();
        this.scene.popMatrix();

        this.scene.setActiveShader(this.scene.pierShader);
        this.pierDistortion.bind(0);
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_WRAP_S, this.scene.gl.MIRRORED_REPEAT);
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_WRAP_T, this.scene.gl.MIRRORED_REPEAT);
        this.pierBase.bind(1);
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_WRAP_S, this.scene.gl.MIRRORED_REPEAT);
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_WRAP_T, this.scene.gl.MIRRORED_REPEAT);
        this.scene.pushMatrix();
        this.scene.translate(0,10,0);
        this.scene.rotate(Math.PI/2, 1,0,0);
        this.scene.rotate(3*Math.PI/4, 0,0,1);
        this.scene.scale(50, 50, 50);
        this.topOcean.display();
        this.scene.popMatrix();

        this.scene.setActiveShader(this.scene.defaultShader);

    }
}
