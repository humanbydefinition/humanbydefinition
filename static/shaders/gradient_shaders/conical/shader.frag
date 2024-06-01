#ifdef GL_ES
precision highp float;
#endif

varying vec2 v_texCoord; // Texture coordinates from vertex shader
uniform sampler2D textureID; // Original texture
uniform sampler2D originalTextureID; // Unmodified version of the original texture
uniform sampler2D gradientTexture; // 1D texture for gradient colors
uniform vec2 gradientCenter; // Center of the conical gradient in texture coordinates
uniform float gradientTextureLength; // Number of colors in the gradient (length of the texture)
uniform int frameCount; // Uniform to animate the gradient based on frame count
uniform float rotationSpeed; // Speed of rotation
uniform vec3 targetColor; // RGB color to match
uniform float tolerance; // Tolerance for color matching

void main() {
    // Fetch the original texture color
    vec2 flippedTexCoord = vec2(v_texCoord.x, 1.0 - v_texCoord.y);
    vec4 texColor = texture2D(textureID, flippedTexCoord);


    vec4 originalTexColor = texture2D(originalTextureID, flippedTexCoord);

  // Check if the pixel color in the original texture matches the target color within the tolerance
  if (originalTexColor.r >= targetColor.r && originalTexColor.r <= targetColor.r + tolerance &&
      originalTexColor.g >= targetColor.g && originalTexColor.g <= targetColor.g + tolerance &&
      originalTexColor.b >= targetColor.b && originalTexColor.b <= targetColor.b + tolerance) {

        // Calculate relative position from the gradient center
        vec2 relativePosition = flippedTexCoord - gradientCenter;

        // Calculate the angle in radians from the gradient center
        float angle = atan(relativePosition.y, relativePosition.x);
        
        // Adjust the angle based on the frame count and rotation speed
        float adjustedAngle = angle + float(frameCount) * rotationSpeed;
        
        // Normalize the adjusted angle to be between 0 and 1
        float normalizedAngle = mod(adjustedAngle + 3.14159265, 2.0 * 3.14159265) / (2.0 * 3.14159265);

        // Calculate the color index based on the normalized angle
        float index = normalizedAngle * gradientTextureLength;
        float normalizedIndex = mod(floor(index) + 0.5, gradientTextureLength) / gradientTextureLength;

        // Fetch the gradient color from the texture
        vec4 gradientColor = texture2D(gradientTexture, vec2(normalizedIndex, 0.5));

        // Combine the gradient color with the original texture color's alpha
        gl_FragColor = vec4(gradientColor.rgb, texColor.a);
    } else {
        // Retain the original color if not matching the target RGB color
        gl_FragColor = texColor;
    }
}
