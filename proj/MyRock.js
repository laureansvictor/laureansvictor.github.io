import {CGFobject, CGFappearance} from '../lib/CGF.js';
const RockStates = {
    INACTIVE: 0,
    INMOUTH: 1,
    INNEST: 2
};
export class MyRock extends CGFobject {
    /**
     * @method constructor
     * @param  {CGFscene} scene - MyScene object
     * @param  {integer} slices - number of slices around Y axis
     * @param  {integer} stacks - number of stacks along Y axis, from the center to the poles (half of sphere)
     */
    constructor(scene, slices, stacks) {
        super(scene);
        this.latDivs = stacks * 2;
        this.longDivs = slices;
        this.x = 0;
        this.y= 0;
        this.z = 0;
        this.posX = 0;
        this.posY = 0;
        this.posZ = 1;
        this.xScale = 1;
        this.yScale = 1;
        this.zScale = 1;
        this.state = RockStates.INACTIVE;
        this.nestPoint = this.posY;
        this.timed = 0;

        this.initBuffers();
        this.initMaterials();
    }

    /**
     * @method initBuffers
     * Initializes the sphere buffers
     * TODO: DEFINE TEXTURE COORDINATES
     */
    initMaterials(){
        this.rockAppearance = new CGFappearance(this);
        this.rockAppearance.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.rockAppearance.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.rockAppearance.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.rockAppearance.setEmission(0,0,0,1);
        this.rockAppearance.setShininess(120);
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var phi = 0;
        var theta = 0;
        var phiInc = Math.PI / this.latDivs;
        var thetaInc = (2 * Math.PI) / this.longDivs;
        var latVertices = this.longDivs + 1;

        // build an all-around stack at a time, starting on "north pole" and proceeding "south"
        for (let latitude = 0; latitude <= this.latDivs; latitude++) {
            var sinPhi = Math.sin(phi);
            var cosPhi = Math.cos(phi);

            // in each stack, build all the slices around, starting on longitude 0
            theta = 0;
            for (let longitude = 0; longitude <= this.longDivs; longitude++) {
                //--- Vertices coordinates
                var walk = Math.random()*0.5 + 0.9;
                if (longitude == 0 || longitude == this.longDivs) walk = 1;
                this.x = Math.cos(theta) * sinPhi ;
                this.y = cosPhi;
                this.z = Math.sin(-theta) * sinPhi ;
                this.vertices.push(this.x*walk, this.y*walk+5, this.z*walk);

                //--- Indices
                if (latitude < this.latDivs && longitude < this.longDivs) {
                    var current = latitude * latVertices + longitude;
                    var next = current + latVertices;
                    // pushing two triangles using indices from this round (current, current+1)
                    // and the ones directly south (next, next+1)
                    // (i.e. one full round of slices ahead)

                    this.indices.push( current + 1, current, next);
                    this.indices.push( current + 1, next, next +1);
                }

                //--- Normals
                // at each vertex, the direction of the normal is equal to
                // the vector from the center of the sphere to the vertex.
                // in a sphere of radius equal to one, the vector length is one.
                // therefore, the value of the normal is equal to the position vectro
                this.normals.push(this.x, this.y, this.z);
                theta += thetaInc;

                //--- Texture Coordinates
                // To be done...
                // May need some additional code also in the beginning of the function.

            }
            phi += phiInc;
        }


        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    getPosition() {
        return [this.posX, this.posY, this.posZ];
    }

    setPosition(x,y,z){
        this.posX = x;
        this.posY = y;
        this.posZ = z;
        this.scene.translate(x,y,z);
    }

    setScale(x,y,z){
        this.xScale = x;
        this.yScale = y;
        this.zScale = z;
        this.scene.scale(x,y,z);
    }

    getScale(){
        return [this.xScale, this.yScale, this.zScale];
    }

    update(fps){
        if((this.state == RockStates.INMOUTH)){
            this.setPosition(this.scene.fish.x,this.scene.fish.y,this.scene.fish.z+10);
        }
        if(this.state == RockStates.INNEST){
            this.timed += fps;
            this.posY = this.nestPoint - (this.timed * 0.005);
            if(this.posY <= 0.3);
                this.land();
        }
    }
    drop(dropx, dropz){
        this.posX = dropx;
        this.posZ = dropz;
    }
    land(){
        this.posY = -1.20;
        this.state = RockStates.INNEST;
    }
}