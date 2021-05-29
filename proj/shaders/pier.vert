
attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform sampler2D pierDistortion;
uniform sampler2D pierBase;
varying vec2 vTextureCoord;
varying vec2 distortionCoord;
varying vec4 coord;

uniform float timeFactor;

#define     MULT_FACTOR     0.03
void main() {
    vec2 offset = vec2(1.0,1.0)*timeFactor*0.03;
    distortionCoord = aTextureCoord + offset;
    vTextureCoord = aTextureCoord;
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
}