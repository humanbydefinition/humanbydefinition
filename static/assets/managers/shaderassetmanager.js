/**
 * ShaderManager class for managing shaders.
 * @class
 */
class SimulationShaderAssetManager {

  /**
   * AssetManager constructor.
   * @param {string} path - The base path for the shader files.
   */
  constructor(path) {
    this.shaderPaths = {
      "ascii": {
        "frag": path + '/ascii/shader.frag'
      },
      "kaleidoscope": {
        "frag": path + '/kaleidoscope/shader.frag'
      },
      "distortion": {
        "frag": path + '/distortion/shader.frag'
      },
      "grayscale": {
        "frag": path + '/grayscale/shader.frag'
      },
      "colorpalette": {
        "frag": path + '/colorpalette/shader.frag'
      },
      "inversion": {
        "frag": path + '/inversion/shader.frag'
      },
      "brightness": {
        "frag": path + '/brightness/shader.frag'
      },
      "angle": {
        "frag": path + '/angle/shader.frag'
      },
      "chromaticaberration": {
        "frag": path + '/chromaticaberration/shader.frag'
      },
      "move": {
        "frag": path + '/move/shader.frag'
      },
    }

    this.shaders = {};
  }
}

/**
* ShaderManager class for managing shaders.
* @class
*/
class GradientShaderAssetManager {

  /**
   * AssetManager constructor.
   * @param {string} path - The base path for the shader files.
   */
  constructor(path) {
    this.shaderPaths = {
      "linear": {
        "frag": path + '/linear/shader.frag'
      },
      "zigzag": {
        "frag": path + '/zigzag/shader.frag'
      },
      "spiral": {
        "frag": path + '/spiral/shader.frag'
      },
      "radial": {
        "frag": path + '/radial/shader.frag'
      },
      "conical": {
        "frag": path + '/conical/shader.frag'
      },
      "wavelet": {
        "frag": path + '/wavelet/shader.frag'
      },
      "perlinnoise": {
        "frag": path + '/perlinnoise/shader.frag'
      },
      "border": {
        "frag": path + '/border/shader.frag'
      },
      "interference": {
        "frag": path + '/interference/shader.frag'
      },
      "arc": {
        "frag": path + '/arc/shader.frag'
      },
    }

    this.shaders = {};
  }
}