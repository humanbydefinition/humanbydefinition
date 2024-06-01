#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D tex; // Original image
uniform sampler2D colorPalette; // Color palette image
uniform vec2 texSize; // Size of the original image

void main() {
    vec2 uv = vec2(gl_FragCoord.x, texSize.y - gl_FragCoord.y) / texSize;

    vec4 texColor = texture2D(tex, uv); // Color of the current fragment in the original image

    // Convert the original image color to grayscale
    float gray = (texColor.r + texColor.g + texColor.b) / 3.0;

    // Use the grayscale value as the horizontal coordinate in the color palette texture
    vec4 paletteColor = texture2D(colorPalette, vec2(gray, 0.5));

    // Set the fragment color to the color from the palette
    gl_FragColor = paletteColor;
}