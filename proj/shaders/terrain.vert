
attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform sampler2D sandMap;
uniform sampler2D sandTex;
varying vec2 vTextureCoord;
varying vec4 coord;

void main() {
    vec3 offset = vec3(0.0,0.0,0.0);

    vTextureCoord = aTextureCoord;
    vec4 sandmap = texture2D(sandMap, vec2(0.0, 0.1) + vTextureCoord);
    vec4 sandtex = texture2D(sandTex, vTextureCoord);

    offset = aVertexNormal*sandmap.b;
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition-offset, 1.0);
}