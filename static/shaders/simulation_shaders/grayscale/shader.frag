#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D u_image; // The image, which will be grayscaled
varying vec2 v_texCoord; // Texture coordinates from vertex shader

void main() {
    // Flip the y-coordinate of the texture coordinate
    vec2 flippedTexCoord = vec2(v_texCoord.x, 1.0 - v_texCoord.y);

    // Sample the color from the image
    vec4 color = texture2D(u_image, flippedTexCoord);

    // Calculate the luminance
    float luminance = 0.299 * color.r + 0.587 * color.g + 0.114 * color.b;

    // Set the color to the grayscale version
    color.rgb = vec3(luminance);

    // Output the grayscaled color
    gl_FragColor = color;
}