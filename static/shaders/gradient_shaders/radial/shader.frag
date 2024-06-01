#ifdef GL_ES
precision highp float;
#endif

varying vec2 v_texCoord; // Texture coordinates from vertex shader
uniform sampler2D textureID; // Original texture
uniform sampler2D originalTextureID; // Unmodified version of the original texture
uniform sampler2D gradientTexture; // 1D texture for gradient colors
uniform vec3 targetColor; // RGB color to match
uniform float tolerance; // Tolerance for color matching
uniform vec2 gradientCenter; // Center of the radial gradient in texture coordinates
uniform float gradientTextureLength; // Number of colors in the gradient (length of the texture)
uniform float maxRadius; // Maximum radius of the radial gradient in texture coordinates
uniform int frameCount; // Uniform to animate the gradient based on frame count
uniform int gradientDirection; // Direction of the gradient movement (+1 for outward, -1 for inward)

void main() {
  vec2 flippedTexCoord = vec2(v_texCoord.x, 1.0 - v_texCoord.y);
  vec4 texColor = texture2D(textureID, flippedTexCoord);

  vec4 originalTexColor = texture2D(originalTextureID, flippedTexCoord);

  // Check if the pixel color in the original texture matches the target color within the tolerance
  if (originalTexColor.r >= targetColor.r && originalTexColor.r <= targetColor.r + tolerance &&
      originalTexColor.g >= targetColor.g && originalTexColor.g <= targetColor.g + tolerance &&
      originalTexColor.b >= targetColor.b && originalTexColor.b <= targetColor.b + tolerance) {
    // Calculate the relative position and distance from the gradient center
    vec2 relativePosition = flippedTexCoord - gradientCenter;
    float distance = length(relativePosition);

    // Normalize the distance and map it to the gradient texture
    float normalizedDistance = clamp(distance / maxRadius, 0.0, 1.0);
    float index = normalizedDistance * (gradientTextureLength - 1.0);

    // Adjust animation speed and direction
    // If gradientDirection is +1, index increases over time; if -1, it decreases
    float animatedIndex = mod(index + float(frameCount) * 0.1 * float(-gradientDirection), gradientTextureLength);

    // Directly calculate the normalized index with half-texel offset for accurate color fetching
    float normalizedIndex = (floor(animatedIndex) + 0.5) / gradientTextureLength;

    // Fetch the gradient color based on the calculated index
    vec4 gradientColor = texture2D(gradientTexture, vec2(normalizedIndex, 0.5));

    // Combine gradient color with the original alpha
    gl_FragColor = vec4(gradientColor.rgb, texColor.a);
  } else {
    gl_FragColor = texColor;
  }
}