#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D u_image; // The image
uniform vec2 u_direction; // The direction of movement
uniform float u_time; // Current time
uniform float u_speed; // Speed of movement
varying vec2 v_texCoord; // Texture coordinates from vertex shader

void main() {
    // Calculate the offset based on time and speed
    vec2 offset = u_direction * u_time * u_speed;

    // Apply the offset to texture coordinates
    vec2 movedTexCoord = v_texCoord + offset;

    // Unflip the y-coordinate
    movedTexCoord.y = 1.0 - movedTexCoord.y;

    // Optional: Wrap the texture coordinates to create a continuous scrolling effect
    // Ensure movedTexCoord wraps around [0, 1] by using mod with 1.0
    movedTexCoord = mod(movedTexCoord, 1.0);

    // Sample the color from the image with the moved texture coordinates
    vec4 color = texture2D(u_image, movedTexCoord);

    // Output the color
    gl_FragColor = color;
}