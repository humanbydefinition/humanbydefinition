#ifdef GL_ES
precision highp float;
#endif

varying vec2 v_texCoord; // Texture coordinates from vertex shader
uniform sampler2D textureID; // Original texture
uniform sampler2D gradientTexture; // 1D texture for gradient colors
uniform sampler2D originalTextureID; // Unmodified version of the original texture
uniform vec3 targetColor; // RGB color to match
uniform float tolerance; // Tolerance for color matching
uniform int frameCount;
uniform float gradientTextureLength; // Number of colors in the gradient
uniform float gradientDirection; // Direction for the gradient shift (+1 for up, -1 for down)
uniform float speed; // Control the speed of the gradient movement
uniform int angle; // Angle in degrees for the gradient

void main() {
  vec2 flippedTexCoord = vec2(v_texCoord.x, 1.0 - v_texCoord.y);
  vec4 texColor = texture2D(textureID, flippedTexCoord);

 vec4 originalTexColor = texture2D(originalTextureID, flippedTexCoord);

  // Check if the pixel color in the original texture matches the target color within the tolerance
  if (originalTexColor.r >= targetColor.r && originalTexColor.r <= targetColor.r + tolerance &&
      originalTexColor.g >= targetColor.g && originalTexColor.g <= targetColor.g + tolerance &&
      originalTexColor.b >= targetColor.b && originalTexColor.b <= targetColor.b + tolerance) {

    float radianAngle = radians(float(angle));
    float positionX = gl_FragCoord.x * cos(radianAngle) - gl_FragCoord.y * sin(radianAngle);
    float positionY = gl_FragCoord.x * sin(radianAngle) + gl_FragCoord.y * cos(radianAngle);
    float position = floor(positionX);

    // Determine direction based on zigzag pattern
    float direction = mod(position + floor(positionY), 2.0) == 0.0 ? gradientDirection : -gradientDirection;
    
    // Adjust index calculation to incorporate speed
    float index = mod(position + float(frameCount) * direction * speed, gradientTextureLength);
    index = floor(index);
    float texelPosition = (index + 0.5) / gradientTextureLength;

    vec4 gradientColor = texture2D(gradientTexture, vec2(texelPosition, 0.5));
    gl_FragColor = vec4(gradientColor.rgb, texColor.a);
  } else {
    gl_FragColor = texColor;
  }
}
