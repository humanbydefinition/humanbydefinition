#ifdef GL_ES
precision highp float;
#endif

varying vec2 v_texCoord; // Texture coordinates from vertex shader
uniform sampler2D textureID; // Original texture
uniform sampler2D originalTextureID; // Unmodified version of the original texture
uniform sampler2D gradientTexture; // 1D texture for gradient colors
uniform vec3 targetColor; // RGB color to match
uniform float tolerance; // Tolerance for color matching
uniform float waveFrequency; // Center frequency of the wavelet
uniform float waveSpeed; // Controls the speed of the wavelet animation
uniform float angle; // Wavelet orientation in radians
uniform int frameCount; // Uniform to animate the gradient based on frame count

void main() {
    vec2 flippedTexCoord = vec2(v_texCoord.x, 1.0 - v_texCoord.y);
    vec4 texColor = texture2D(textureID, flippedTexCoord);

    vec4 originalTexColor = texture2D(originalTextureID, flippedTexCoord);

  // Check if the pixel color in the original texture matches the target color within the tolerance
  if (originalTexColor.r >= targetColor.r && originalTexColor.r <= targetColor.r + tolerance &&
      originalTexColor.g >= targetColor.g && originalTexColor.g <= targetColor.g + tolerance &&
      originalTexColor.b >= targetColor.b && originalTexColor.b <= targetColor.b + tolerance) {

        // Calculate relative position from the center
        vec2 relativePosition = flippedTexCoord - vec2(0.5, 0.5); // Center at texture middle

        // Apply rotation matrix for orientation
        float xr = relativePosition.x * cos(angle) + relativePosition.y * sin(angle);
        float yr = -relativePosition.x * sin(angle) + relativePosition.y * cos(angle);

        // Adjust xr by adding an animation offset based on the frame count and wave speed
        float adjustedXr = xr + float(frameCount) * waveSpeed;

        // Apply Morlet wavelet formula (real part)
        float waveletValue = cos(waveFrequency * adjustedXr) * exp(-0.5 * (xr * xr + yr * yr));

        // Normalize wavelet value to the [0, 1] range
        float normalizedWaveValue = clamp((waveletValue + 1.0) / 2.0, 0.0, 1.0);

        // Fetch the gradient color based on the normalized wave value
        vec4 gradientColor = texture2D(gradientTexture, vec2(normalizedWaveValue, 0.5));

        // Combine gradient color with original alpha
        gl_FragColor = vec4(gradientColor.rgb, texColor.a);
    } else {
        gl_FragColor = texColor;
    }
}
