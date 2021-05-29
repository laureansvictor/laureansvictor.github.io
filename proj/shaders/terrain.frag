#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D sandMap;
uniform sampler2D sandTex;

void main() {


    vec4 color = texture2D(sandTex, vTextureCoord);        //get the color
    vec4 map = texture2D(sandMap, vec2(0.0,0.5)+vTextureCoord);

    color = color*map;
    gl_FragColor = color;
}
