#ifdef GL_ES
precision highp float;
#endif

varying vec2 v_texCoord; // Texture coordinates from vertex shader
uniform sampler2D textureID; // Original texture
uniform sampler2D originalTextureID; // Unmodified version of the original texture
uniform sampler2D gradientTexture; // 1D texture for gradient colors
uniform vec3 targetColor; // RGB color to match
uniform float tolerance; // Tolerance for color matching
uniform int frameCount;
uniform float gradientTextureLength; // Number of colors in the gradient
uniform float amplitude; // Amplitude of the waves
uniform float speed; // Control the speed of the gradient movement
uniform vec2 resolution; // Resolution of the screen
uniform vec2 source1; // Source 1 position
uniform vec2 source2; // Source 2 position
uniform float frequency1; // Frequency of the waves from source 1
uniform float frequency2; // Frequency of the waves from source 2

void main() {
    vec2 flippedTexCoord = vec2(v_texCoord.x, 1.0 - v_texCoord.y);
    vec4 texColor = texture2D(textureID, flippedTexCoord);


    vec4 originalTexColor = texture2D(originalTextureID, flippedTexCoord);

  // Check if the pixel color in the original texture matches the target color within the tolerance
  if (originalTexColor.r >= targetColor.r && originalTexColor.r <= targetColor.r + tolerance &&
      originalTexColor.g >= targetColor.g && originalTexColor.g <= targetColor.g + tolerance &&
      originalTexColor.b >= targetColor.b && originalTexColor.b <= targetColor.b + tolerance) {

    // Normalize the fragment coordinates with the resolution
    vec2 coord = gl_FragCoord.xy / resolution;

    // Calculate wave contribution from source 1
    float distance1 = distance(coord, source1);
    float wave1 = sin(distance1 * 2.0 * 3.14159265 / frequency1 + float(frameCount) * speed) * amplitude;

    // Calculate wave contribution from source 2
    float distance2 = distance(coord, source2);
    float wave2 = sin(distance2 * 2.0 * 3.14159265 / frequency2 + float(frameCount) * speed) * amplitude;

    // Calculate the interference intensity (not normalized)
    float intensity = wave1 + wave2;
    
    // Normalize the intensity to the range 0 to 1
    intensity = (intensity + 2.0 * amplitude) / (4.0 * amplitude);
    
    // Calculate the color index in the gradient texture
    float colorIndex = intensity * (gradientTextureLength - 1.0);
    float texelPosition = (floor(colorIndex) + 0.5) / gradientTextureLength;

    vec4 gradientColor = texture2D(gradientTexture, vec2(texelPosition, 0.5));
    gl_FragColor = vec4(gradientColor.rgb, texColor.a);
    } else {
    gl_FragColor = texColor;
    }
}