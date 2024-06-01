#ifdef GL_ES
precision mediump float;
#endif
  
precision highp float;

varying vec2 v_texCoord;

uniform sampler2D tex;
uniform float time;
uniform float frequency;
uniform float amplitude;

void main() {
  vec2 uv = vec2(1.0) - v_texCoord;
  uv.x = uv.x * -1.0;


  float sineWave = sin(uv.y * frequency + time) * amplitude;

  vec2 distort = vec2(sineWave, sineWave);

  vec4 texColor = texture2D(tex, mod(uv + distort, 1.0));

  gl_FragColor = texColor;
}