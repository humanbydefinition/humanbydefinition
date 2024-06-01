#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D u_image; // The image to be brightness adjusted
uniform float u_brightness; // Brightness adjustment factor
varying vec2 v_texCoord; // Texture coordinates from vertex shader

void main() {
    // Flip the y-coordinate of the texture coordinate
    vec2 flippedTexCoord = vec2(v_texCoord.x, 1.0 - v_texCoord.y);

    // Sample the color from the image
    vec4 color = texture2D(u_image, flippedTexCoord);

    // Adjust the color's brightness
    color.rgb += u_brightness;

    // Clamp the results to the valid range [0, 1] to avoid invalid colors
    color.rgb = clamp(color.rgb, 0.0, 1.0);

    // Output the brightness-adjusted color
    gl_FragColor = color;
}