#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
varying vec2 distortionCoord;

uniform sampler2D pierDistortion;
uniform sampler2D pierBase;
uniform float timeFactor;

void main() {
    vec4 pierdistortion = texture2D(pierDistortion,distortionCoord);        //move the color
    vec2 textCoordColor = vec2(vTextureCoord.s - pierdistortion.r/3.5, vTextureCoord.t - pierdistortion.g/3.5);

    gl_FragColor = texture2D(pierBase, textCoordColor);
}