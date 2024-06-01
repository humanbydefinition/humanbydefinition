#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D u_image; // The image, whose colors get inverted
varying vec2 v_texCoord; // Texture coordinates from vertex shader

void main() {
    // Flip the y-coordinate of the texture coordinate
    vec2 flippedTexCoord = vec2(v_texCoord.x, 1.0 - v_texCoord.y);

    // Sample the color from the image
    vec4 color = texture2D(u_image, flippedTexCoord);

    // Invert the color
    color.rgb = 1.0 - color.rgb;

    // Output the inverted color
    gl_FragColor = color;
}