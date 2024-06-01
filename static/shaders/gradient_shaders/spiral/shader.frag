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
uniform float gradientTextureLength; // Number of colors in the gradient (length of the texture)
uniform float gradientDirection; // Direction for the gradient shift (+1 for up, -1 for down)
uniform vec2 gradientCenter; // Center of the spiral in texture coordinates
uniform float spiralSpeed; // Controls how tightly the spiral winds
uniform float spiralDensity; // Controls the spacing between the spirals

void main() {
  vec2 flippedTexCoord = vec2(v_texCoord.x, 1.0 - v_texCoord.y);
  vec4 texColor = texture2D(textureID, flippedTexCoord);

  vec4 originalTexColor = texture2D(originalTextureID, flippedTexCoord);

  // Check if the pixel color in the original texture matches the target color within the tolerance
  if (originalTexColor.r >= targetColor.r && originalTexColor.r <= targetColor.r + tolerance &&
      originalTexColor.g >= targetColor.g && originalTexColor.g <= targetColor.g + tolerance &&
      originalTexColor.b >= targetColor.b && originalTexColor.b <= targetColor.b + tolerance) {
    vec2 relativePosition = flippedTexCoord - gradientCenter;
    float distance = length(relativePosition);
    float angle = atan(relativePosition.y, relativePosition.x);
    float adjustedAngle = angle + float(frameCount) * gradientDirection * spiralSpeed;
    // Adjust index calculation for a smoother transition
    float index = mod((distance + adjustedAngle * spiralDensity) * gradientTextureLength, gradientTextureLength);

    // Directly calculate the normalized index with half-texel offset for accurate color fetching
    float normalizedIndex = (floor(index) + 0.5) / gradientTextureLength;

    vec4 gradientColor = texture2D(gradientTexture, vec2(normalizedIndex, 0.5));
    gl_FragColor = vec4(gradientColor.rgb, texColor.a);
  } else {
    gl_FragColor = texColor;
  }
}