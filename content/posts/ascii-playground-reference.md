---
author: "humanbydefinition"
title: "ascii playground reference"
date: "2024-05-26"
description: "a reference for the ascii playground tool, providing insights into its usage and features."
tags: ["ascii", "p5js", "glsl", "tools", "shaders"]
categories: ["ascii", "p5js", "glsl", "tools", "shaders"]
series: [""]
aliases: [""]
ShowToc: true
TocOpen: false
---

## general information
the [`ascii playground`](/playground/) is a tool that allows you to create ascii art in your browser utilizing [`p5.js`](https://p5js.org/) and [`GLSL`](https://developer.mozilla.org/en-US/docs/Games/Techniques/3D_on_the_web/GLSL_Shaders) shaders. it features a wide variety of simulations, effect shaders and gradient shaders to play around with. the ascii shader is the final step in the process, where the colors of the gradient buffer are translated to the unique ascii characters that exist in the defined character sets. the ascii output is highly customizable, allowing you to adjust the font, font size, color mode, color, grid size and more. the tool is designed to be flexible and customizable, so you can create a wide variety of ascii art styles. 

the tool is accessible through an extensive [`Tweakpane`](https://tweakpane.github.io/docs/) overlay, which allows you to control and customize the parameters of the tool during run-time. the tool also features the ability to record your canvas using [`p5.Capture`](https://github.com/tapioca24/p5.capture), so you can save your creations as videos or images.

**note**: as of now, the tool is not mobile-friendly *yet*, but it might be in the future.

---

## basic features

- track and limit the frame rate to your liking
- reset the whole sketch and its components to its initial state `frameCount = 1` with a given random seed for reproducibility
- define the maximum number of layers to create gradient shaders for
- export and import your progress as a json file
    - the exported file contains all settings, but not your uploaded files _(images, videos, fonts, ..)_
        - exception to this are the uploaded character sets and the uploaded color palettes, which are preserved in the exported file
- capture the current frame as an image (`.png` or `.jpg`)
- record the current sketch as a video (`.webm`, `.gif`, `.png` or `.jpg`)
    - the frame rate is currently statically set to 60 fps

---

## credits

the following libraries were used to create the ascii playground:
- [`p5.js`](https://p5js.org/) - a javascript library for creative coding and visualization
- [`Tweakpane`](https://tweakpane.github.io/docs/) - a compact overlay for fine-tuning parameters and monitoring value changes
    - [`Tweakpane Chromatic Plugin`](https://github.com/brunoimbrizi/tweakpane-plugin-chromatic) - a Tweakpane plugin for visually displaying color palettes
    - [`Tweakpane Essentials Plugin`](https://github.com/tweakpane/plugin-essentials) - A Tweakpane plugin for adding various controls, like the interval input or the fps graph
    - [`Tweakpane Rotation Plugin`](https://github.com/0b5vr/tweakpane-plugin-rotation) - A Tweakpane plugin for adding a 3D rotation input
    - [`Tweakpane File Import Plugin`](https://github.com/LuchoTurtle/tweakpane-plugin-file-import) - A Tweakpane plugin for importing files
    - [`Tweakpane Infodump Plugin`](https://github.com/doersino/tweakpane-plugin-infodump) - A Tweakpane plugin for displaying infodumps
- [`p5.Capture`](https://github.com/tapioca24/p5.capture) - a library for capturing frames from the canvas

<br/>

the following assets are used in the ascii playground:

- [`UrsaFont`](https://ursafrank.itch.io/ursafont) - a textmode font by [`UrsaFrank`](https://ursafrank.itch.io/) on [`itch.io`](https://itch.io/)
    - *(licensed under the CC0 1.0 Universal License)* - [source](https://creativecommons.org/publicdomain/zero/1.0/deed.en)
- [`Ugandan Knuckles`](https://sketchfab.com/3d-models/ugandan-knuckles-d6d71193eaf7498e81d84ec10eb2b576) - a 3D model by [`wardd`](https://sketchfab.com/wardd) on [`sketchfab.com`](https://sketchfab.com/)
    - *(licensed under the Attribution 4.0 License)* - [source](https://creativecommons.org/licenses/by/4.0/)
- [`Light Blue Abstract Tunnel`](https://www.pexels.com/video/light-blue-abstract-tunnel-5680034/) - a video by [`Rostislav Uzunov`](https://www.pexels.com/@rostislav/) on [`pexels.com`](https://www.pexels.com/)
    - *(licensed under the Pexels License)* - [source](https://www.pexels.com/license/)
- [`Black and White Photo of a Brutalist High-Rise Building`](https://www.pexels.com/photo/black-and-white-photo-of-a-brutalist-high-rise-building-17209382/) - an image by [`Ali Imran`](https://www.pexels.com/@ali-imran-602455422/) on [`pexels.com`](https://www.pexels.com/)
    - *(licensed under the Pexels License)* - [source](https://www.pexels.com/license/)

---

## change log

> {{< collapse summary="**2024-06-01**" >}}
- initial release of the ascii playground 🎉
> {{< /collapse >}}

---

## simulations
theoretically, an infinite number of simulations can be added to the ascii playground. all defined simulations share a common [`WEBGL`](https://p5js.org/reference/#/p5/WEBGL) graphic buffer. the execution order is determined by the position of the simulations in the list. the simulation displayed at the top of the overlay is executed last, making it the topmost layer.

> {{< collapse summary="**shared settings**" >}}
the following settings are shared across all simulations:
- `remove` - remove the simulation from the list
- `move` - move the simulation up or down in the list
- `active` - toggle the simulation on or off
- `scale` - the scale of the simulation
- `rotation` - the rotation of the simulation
- `x` - the x position of the simulation _(based around the center of the simulation)_
- `y` - the y position of the simulation _(based around the center of the simulation)_
- `z` - the z position of the simulation _(based around the center of the simulation)_
> {{< /collapse >}}

---

### imageviewer
the imageviewer allows you to upload an image to the p5.js sketch for display.

> {{< collapse summary="**settings**" >}}

- `image` - the image to be displayed _(in `.jpg` or `.png` format)_

> {{< /collapse >}}

---

### textureviewer
the textureviewer allows you to upload a fragment shader to the `p5.js` sketch, which is rendered onto a plane that fills the window.

> {{< collapse summary="**settings**" >}}
- `frag shader` - the fragment shader to be rendered onto the plane
    - the fragment shader being uploaded needs to be in a `.frag` format
    - `p5.js` only supports `GLSL ES 1.0`, so make sure your fragment shader is compatible with this version
> {{< /collapse >}}


> {{< collapse summary="**uniforms**" >}}
the following uniforms are available to the shader:
- `time` - `frameCount * 0.01` is passed to the shader
- `resolution` - the `windowWidth` and `windowHeight` are passed to the shader
- `seed` - a random value between 0 and 1 is passed to the shader. get a new random value by resetting the sketch.
> {{< /collapse >}}

> {{< collapse summary="**fragment shader example**" >}}
the following [`simplex noise`](https://en.wikipedia.org/wiki/Simplex_noise#:~:text=Simplex%20noise%20is%20the%20result,and%20a%20lower%20computational%20overhead.) shader is used as a default when adding a textureviewer to the ascii playground:
```glsl
#ifdef GL_ES
precision mediump float;
#endif

// Uniforms
uniform vec2 resolution;
uniform float time;
uniform float seed;

vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                                             -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);

    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;

    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ));

    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
        dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;

    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;

    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );

    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
}

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    uv.y -= time; // Subtract time to the y coordinate to create upward movement
    float f = snoise(uv + seed);
    gl_FragColor = vec4(vec3(f), 1.0);
}
```
> {{< /collapse >}}

---

### videoviewer
the videoviewer allows you to upload a video to the p5.js sketch for display.

> {{< collapse summary="**settings**" >}}
- `video` - the video to be displayed
> {{< /collapse >}}

---

### textviewer2d
the textviewer2d allows you to display text on the p5.js sketch.

> {{< collapse summary="**settings**" >}}
- `text` - the text to be displayed
- `font` - the font of the text _(allowed formats: .ttf, .otf)_
- `font size` - the size of the text
- `fill color` - the color of the text
- `stroke color` - the color of the text's stroke
- `stroke weight` - the weight of the text's stroke
> {{< /collapse >}}

---

### webcamviewer
the webcamviewer allows you to display the webcam feed on the p5.js sketch.

---

### modelviewer
the modelviewer allows you to upload an `.obj` model, including a texture, to the p5.js sketch for display.

> {{< collapse summary="**settings**" >}}
- `model` - the model to be displayed _(in `.obj` format)_
- `texture` - the texture to be displayed on the model _(in `.jpg` or `.png` format)_
> {{< /collapse >}}

---


## pre effect shaders
the pre effect shaders input is the graphic buffer, that contains the result from all defined simulations. the result of the pre effect shaders is directly to the window or passed to the ascii shader, based on the given settings.

theoretically, an infinite number of pre effect shaders can be added to the ascii playground. all defined pre effect shaders are applied to the graphic buffer in sequence. the execution order is determined by the position of the pre effect shaders in the list. the pre effect shader displayed at the top of the overlay is executed last, making it the topmost layer.

> {{< collapse summary="**shared settings**" >}}
the following settings are shared across all pre effect shaders:
- `remove` - remove the shader from the list
- `move` - move the shader up or down in the list
- `active` - toggle the shader on or off
> {{< /collapse >}}

---

### kaleidoscope
the kaleidoscope shader mirrors the graphic buffer in a kaleidoscopic manner. the number of mirrors and the angle of the mirrors can be adjusted.

> {{< collapse summary="**settings**" >}}
- `segments` - the number of segments in the kaleidoscope
- `angle` - the angle of the mirrors in the kaleidoscope
> {{< /collapse >}}

---

### distortion
the distortion shader distorts the graphic buffer based on a sine function. the frequency and amplitude of the sine function can be adjusted.

> {{< collapse summary="**settings**" >}}
- `frequency` - the frequency of the sine functions
- `amplitude` - the amplitude of the sine functions
> {{< /collapse >}}

---

### grayscale
the grayscale shader converts the graphic buffer to grayscale.

---

### invert
the invert shader inverts the colors of the graphic buffer.

---

### colorpalette
the colorpalette shader maps the colors of the graphic buffer to a defined color palette.

> {{< collapse summary="**settings**" >}}
- `color palette` - the color palette used for the color mapping
    - the color palette being uploaded needs to be in a `.hex` format, with each color being separated by a newline character. the uploaded file should have the following structure:
        ```
        ffffff
        000000
        ff0000
        00ff00
        0000ff
        ```
- **tip**: visit [`https://lospec.com/palette-list`](https://lospec.com/palette-list) for a wide variety of awesome color palettes to quickly download in `.hex` format
> {{< /collapse >}}

---

### brightness
the brightness shader adjusts the brightness of the graphic buffer.

> {{< collapse summary="**settings**" >}}
- `brightness` - the brightness of the graphic buffer
> {{< /collapse >}}

---

### angle
the angle shader rotates the graphic buffer by a defined angle.

> {{< collapse summary="**settings**" >}}
- `angle` - the angle of rotation
> {{< /collapse >}}

---

### chromatic aberration
the chromatic aberration shader separates the color channels of the graphic buffer and displaces them based on a defined offset.

> {{< collapse summary="**settings**" >}}
- `amount` - the amount of displacement
- `angle` - the angle of displacement
> {{< /collapse >}}

--- 

### move
the move shader displaces the graphic buffer based on a defined offset.

> {{< collapse summary="**settings**" >}}
- `direction` - the direction of displacement
- `speed` - the speed of displacement
> {{< /collapse >}}

---

## gradient shaders
the gradient shaders input is the graphic buffer, that contains the result from all defined pre effect shaders. this buffer is grayscaled before being passed to the gradient shaders. 

the result of the gradient shaders is saved in a separate buffer that is passed separately to the ascii shader, containing the colors that are translated to the unique ascii characters that exist in the defined character sets.

for the number of grayscale layers set in the overlay, a random gradient shader is created. the randomness can be adjusted by the user in certain ways. each randomly generated gradient shader is applied to a certain grayscale range, based on the number of max layers set in the overlay.

if `reset` is clicked on this tab, the whole sketch is reset to its initial state `frameCount = 1` with the current random seed for reproducibility.

> {{< collapse summary="**shared settings**" >}}
the following settings are shared across all gradient shaders:
- `enabled` - toggle the shader on or off
> {{< /collapse >}}

---

### conical gradient
the conical gradient shader creates a conical gradient based on a defined center and rotation speed. the number of cones is based on the number of characters in the randomly assigned character set.

> {{< collapse summary="**settings**" >}}
- `center x` - the x position of the center of the conical gradient
- `center y` - the y position of the center of the conical gradient
- `rotation speed` - the speed of rotation
> {{< /collapse >}}

---

### interference gradient
the interference gradient shader creates an interference pattern based on two sources, each with a defined frequency, amplitude, and position. the speed of the pattern and the number of waves are also adjustable.

> {{< collapse summary="**settings**" >}}
- `amplitude` - the amplitude of the interference pattern
- `speed` - the speed of the interference pattern
- `source1 x` - the x position of the first source of the interference pattern
- `source1 y` - the y position of the first source of the interference pattern
- `source2 x` - the x position of the second source of the interference pattern
- `source2 y` - the y position of the second source of the interference pattern
- `frequency1` - the frequency of the first source of the interference pattern
- `frequency2` - the frequency of the second source of the interference pattern
> {{< /collapse >}}

---

### linear gradient
the linear gradient shader creates a linear gradient based on a defined direction, angle and speed. 

> {{< collapse summary="**settings**" >}}
- `direction` - the direction of the linear gradient
- `angle` - the angle of the linear gradient
- `speed` - the speed of the linear gradient
> {{< /collapse >}}

---

### simplex noise gradient
the simplex noise gradient shader creates a simplex noise pattern based on a defined scale, speed and direction.

> {{< collapse summary="**settings**" >}}
- `noise scale` - the scale of the simplex noise pattern
- `speed` - the speed of the simplex noise pattern
- `direction` - the direction of the simplex noise pattern
> {{< /collapse >}}

---

### radial gradient
the radial gradient shader creates a radial gradient based on a defined center, direction and radius.

> {{< collapse summary="**settings**" >}}
- `center x` - the x position of the center of the radial gradient
- `center y` - the y position of the center of the radial gradient
- `direction` - the direction of the radial gradient _(inwards or outwards)_
- `radius` - the radius of the radial gradient
> {{< /collapse >}}

---

### spiral gradient
the spiral gradient shader creates a spiral gradient based on a defined center, direction, speed and density.

> {{< collapse summary="**settings**" >}}
- `center x` - the x position of the center of the spiral gradient
- `center y` - the y position of the center of the spiral gradient
- `direction` - the direction of the spiral gradient _(clockwise or counterclockwise)_
- `speed` - the speed of the spiral gradient
- `density` - the density of the spiral gradient
> {{< /collapse >}}

---

### wavelet gradient
the wavelet gradient shader creates a wavelet pattern based on a defined center, frequency, angle, direction and speed.

> {{< collapse summary="**settings**" >}}
- `center x` - the x position of the center of the wavelet gradient
- `center y` - the y position of the center of the wavelet gradient
- `frequency` - the frequency of the wavelet gradient
- `angle` - the angle of the wavelet gradient
- `direction` - the direction of the wavelet gradient
- `speed` - the speed of the wavelet gradient
> {{< /collapse >}}

---

### zigzag gradient
the zigzag gradient shader creates a zigzag pattern based on a defined direction, angle and speed.

> {{< collapse summary="**settings**" >}}
- `direction` - the direction of the zigzag gradient
- `angle` - the angle of the zigzag gradient
- `speed` - the speed of the zigzag gradient
> {{< /collapse >}}

---

## ascii shader
the ascii shaders input is the graphic buffer, that contains the result from all defined pre effect shaders. the result of the ascii shader is directly drawn to the window if the shader is active. post effect shaders might be _coming soon™_.

Seperately to the graphic buffer, the ascii shader receives the gradient buffer, that contains the colors that are translated to the unique ascii characters that exist in the defined character sets.

> {{< collapse summary="**settings**" >}}

- `active` - toggle the shader on or off
- `invert` - invert the colors of the ascii characters
- `charsets` - the character sets used for the ascii shader
    - the character set file being uploaded is expected to have the following `.json` structure:
        ```json
        [
            {
                "name": "numbers",
                "characterset": "0123456789"
            },
            {
                "name": "lowercaseLetters",
                "characterset": "abcdefghijklmnopqrstuvwxyz"
            }, 
            // add as many character sets as you like! 
            // The "name"-property isn't necessary theoretically, 
            // but "characterset" is needed!
        ]
        ```
- `font` - the font of the ascii characters _(allowed formats: .ttf, .otf)_
    - for a list of fonts that have been tested and work well with the ascii shader, visit [`https://github.com/humanbydefinition/p5js-ascii-renderer`](https://github.com/humanbydefinition/p5js-ascii-renderer?tab=readme-ov-file#assets)
- `font size` - the size of the ascii characters
- `char color mode` - the color mode of the ascii characters 
    - available modes:
        - `sampled` - the color of the ascii characters is sampled from the graphic buffer
        - `fixed` - the color of the ascii characters is based on the defined char color
- `bg color mode` - the color mode of the background 
    - available modes:
        - `sampled` - the color of the background is sampled from the graphic buffer
        - `fixed` - the color of the background is based on the defined bg color
- `char color` - the color of the ascii characters
- `bg color` - the color of the background
- `grid columns` - the number of columns in the ascii grid
- `grid rows` - the number of rows in the ascii grid

> {{< /collapse >}}

---






