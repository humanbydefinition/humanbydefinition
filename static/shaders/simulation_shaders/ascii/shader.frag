#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D u_characterTexture; // The texture containing the character set
uniform sampler2D u_simulationTexture; // The texture containing the simulation
uniform sampler2D u_gridTexture; // Texture which contains the image for ASCII conversion

uniform float u_charsetCols; // The number of columns in the charset texture
uniform float u_charsetRows; // The number of rows in the charset texture

uniform int u_totalChars; // The total number of characters in the character set texture

uniform vec2 u_gridOffsetDimensions; // The dimensions of the grid offset in pixels
uniform vec2 u_gridPixelDimensions; // The dimensions of the grid cell in pixels

uniform vec2 u_gridDimensions; // The dimensions of the grid in number of cells

uniform vec3 u_color; // The color of the ASCII characters
uniform int u_colorMode; // The color mode (0 = image color, 1 = single color)

uniform vec3 u_backgroundColor; // The background color of the ASCII art
uniform int u_backgroundColorMode; // The background color mode (0 = image color, 1 = single color)

uniform int u_invert; // The inversion mode (0 = no inversion, 1 = invert character color)

void main() {
    vec2 adjustedCoord = (gl_FragCoord.xy - u_gridOffsetDimensions) / u_gridPixelDimensions;
    if (adjustedCoord.x < 0.0 || adjustedCoord.x > 1.0 || adjustedCoord.y < 0.0 || adjustedCoord.y > 1.0) {
        gl_FragColor = vec4(u_backgroundColor, 1.0);
        return;
    }
    // Flip y axis
    adjustedCoord.y = 1.0 - adjustedCoord.y;

    vec2 gridCoord = adjustedCoord * u_gridDimensions;
    vec2 cellCoord = floor(gridCoord);
    vec2 centerCoord = cellCoord + vec2(0.5);
    vec2 baseCoord = centerCoord / u_gridDimensions;

    vec4 imgColor = texture2D(u_gridTexture, baseCoord);
    vec4 simColor = texture2D(u_simulationTexture, baseCoord);
    int charIndex = int(imgColor.r * 255.0) + int(imgColor.g * 255.0) * 256;

    // Check if the RGB color exceeds totalChars and return early if it does
    if (charIndex > u_totalChars) {
        gl_FragColor = vec4(u_backgroundColor, 1.0);
        return;
    }

    int charCol = charIndex - int(u_charsetCols) * (charIndex / int(u_charsetCols));
    int charRow = charIndex / int(u_charsetCols);
    vec2 charCoord = vec2(float(charCol) / u_charsetCols, float(charRow) / u_charsetRows);
    vec2 fractionalPart = fract(gridCoord) * vec2(1.0 / u_charsetCols, 1.0 / u_charsetRows);
    vec2 texCoord = charCoord + fractionalPart;

    vec4 charColor = texture2D(u_characterTexture, texCoord);
    if (u_invert == 1) {
        charColor.a = 1.0 - charColor.a;
        charColor.rgb = vec3(1.0);
    }
    vec4 finalColor = (u_colorMode == 0) ? vec4(simColor.rgb * charColor.rgb, charColor.a) : vec4(u_color * charColor.rgb, charColor.a);
    if (u_backgroundColorMode == 0) {
        gl_FragColor = mix(vec4(simColor.rgb, 1.0), finalColor, charColor.a);
    } else {
        gl_FragColor = mix(vec4(u_backgroundColor, 1.0), finalColor, charColor.a);
    }
}