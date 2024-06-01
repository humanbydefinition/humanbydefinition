#ifdef GL_ES
precision highp float;
#endif

varying vec2 v_texCoord; // Texture coordinates from vertex shader
uniform sampler2D textureID; // Original texture
uniform sampler2D gradientTexture; // 1D texture for gradient colors
uniform vec3 targetColor; // RGB color to match
uniform float tolerance; // Tolerance for color matching
uniform int frameCount;
uniform float gradientTextureLength; // Number of colors in the gradient
uniform float gradientDirection; // Direction for the gradient shift (+1 for up, -1 for down)
uniform float speed; // Control the speed of the gradient movement
uniform float repeatCount; // Number of times to repeat the gradient around the circle
uniform vec2 center; // Center of the circular gradient

void main() {
  vec2 flippedTexCoord = vec2(v_texCoord.x, 1.0 - v_texCoord.y);
  vec4 texColor = texture2D(textureID, flippedTexCoord);

  if (texColor.r >= targetColor.r && texColor.r <= targetColor.r + tolerance &&
      texColor.g >= targetColor.g && texColor.g <= targetColor.g + tolerance &&
      texColor.b >= targetColor.b && texColor.b <= targetColor.b + tolerance) {

    // Calculate distance from the fragment to the center
    vec2 pos = gl_FragCoord.xy - center;
    float distance = length(pos);

    // Calculate angle from the center to the fragment
    float angle = atan(pos.y, pos.x);
    if (angle < 0.0) angle += 2.0 * 3.141592653589793; // Ensure angle is in [0, 2*PI]

    // Scale angle to repeat the gradient
    angle *= repeatCount / (2.0 * 3.141592653589793);
    angle = mod(angle, 1.0);

    // Adjust index calculation to incorporate speed
    float index = mod(distance + float(frameCount) * gradientDirection * speed, gradientTextureLength);
    index = floor(index);
    float texelPosition = (index + angle * gradientTextureLength) / gradientTextureLength;

    vec4 gradientColor = texture2D(gradientTexture, vec2(texelPosition, 0.5));
    gl_FragColor = vec4(gradientColor.rgb, texColor.a);
  } else {
    gl_FragColor = texColor;
  }
}
