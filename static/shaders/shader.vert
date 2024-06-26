precision highp float;

attribute vec3 aPosition;
attribute vec2 aTexCoord; // Add attribute for texture coordinates

varying vec2 v_texCoord; // Varying to pass the texture coordinate to the fragment shader

void main() {
    vec4 positionVec4 = vec4(aPosition, 1.0);
    positionVec4.xy = positionVec4.xy * 2.0 - 1.0;

    gl_Position = positionVec4;

    v_texCoord = aTexCoord; // Pass the texture coordinate to the fragment shader
}
