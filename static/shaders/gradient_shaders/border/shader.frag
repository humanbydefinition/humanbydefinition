#ifdef GL_ES
precision highp float;
#endif

varying vec2 v_texCoord; // Texture coordinates from vertex shader
uniform sampler2D textureID; // Original texture

// Define border color uniforms for each side and diagonal
uniform vec3 topBorderColor;
uniform vec3 bottomBorderColor;
uniform vec3 leftBorderColor;
uniform vec3 rightBorderColor;
uniform vec3 topLeftDiagonalBorderColor;
uniform vec3 topRightDiagonalBorderColor;
uniform vec3 bottomLeftDiagonalBorderColor;
uniform vec3 bottomRightDiagonalBorderColor;

void main() {
  // Retrieve the texture color at the current fragment
  vec4 texColor = texture2D(textureID, v_texCoord);

  // Determine if the current fragment is on a border
  if (texColor.rgb != vec3(0.0, 0.0, 0.0)) {
    // Detecting borders by checking adjacent pixels
    vec4 upPixel = texture2D(textureID, v_texCoord + vec2(0.0, 0.01));
    vec4 downPixel = texture2D(textureID, v_texCoord - vec2(0.0, 0.01));
    vec4 leftPixel = texture2D(textureID, v_texCoord - vec2(0.01, 0.0));
    vec4 rightPixel = texture2D(textureID, v_texCoord + vec2(0.01, 0.0));

    // Applying border colors based on the neighboring pixels
    if (upPixel.rgb == vec3(0.0, 0.0, 0.0))
        gl_FragColor = vec4(topBorderColor, 1.0);
    else if (downPixel.rgb == vec3(0.0, 0.0, 0.0))
        gl_FragColor = vec4(bottomBorderColor, 1.0);
    else if (leftPixel.rgb == vec3(0.0, 0.0, 0.0))
        gl_FragColor = vec4(leftBorderColor, 1.0);
    else if (rightPixel.rgb == vec3(0.0, 0.0, 0.0))
        gl_FragColor = vec4(rightBorderColor, 1.0);
    else
        gl_FragColor = texColor; // Normal texture color
  } else {
    gl_FragColor = texColor; // Normal texture color for non-border areas
  }
}
