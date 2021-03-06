# contrast-color [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> Determines the best contrast color to use. Give it a background color and it returns a foreground color (black or white by default but customizable).

## FYI

- [YIQ](https://en.wikipedia.org/wiki/YIQ#:~:text=YIQ%20is%20the%20color%20space,used%20in%20quadrature%20amplitude%20modulation.)
- [Calculating Color Contrast](https://24ways.org/2010/calculating-color-contrast/)

## Demo ([try it for yourself](https://codepen.io/buster/pen/PoGXdze))
![](contrastColor.gif)

## Installation

```sh
$ npm install contrast-color
```

## Usage

```js
// Use via class instance
const ContrastColor = require('contrast-color');
const cc = new ContrastColor({
  bgColor: "navy",
  fgDarkColor: "navy",
  fgLightColor: "water",
  customNamedColors: {
    water: "#00D0FF",
  },
});

const defaultFgColor = cc.contrastColor();
const hasAquaBgColor = cc.contrastColor({ bgColor: "aqua" });

/* Results
{
  defaultFgColor: '#00D0FF', // water
  hasAquaBgColor: '#000080'  // navy
}
*/

// OR ...

// Use via static method
const { contrastColor } = require('contrast-color');

const hasRedBg = contrastColor({ bgColor: '#f00' });
const hasRedBgWithBlackFg = contrastColor({ bgColor: '#f00', threshold: 76 });
const hasYellowBg = contrastColor({ bgColor: 'yellow' });
const hasWhiteBgWithGreenFg = contrastColor({ fgDarkColor: '#008000' });
const hasBlackBgWithLimeFg = contrastColor({ bgColor: '#000000', fgLightColor: 'lime' });
const hasKitchenSink = contrastColor({ 
  bgColor: '#808080', 
  fgDarkColor: 'dirty', 
  fgLightColor: 'clean', 
  threshold: 129, 
  customNamedColors: { 
    dirty: '#f90', 
    clean: '#ff99ff' 
  } 
});

/* Results:
{
  hasRedBg: '#FFFFFF',              // white
  hasRedBgWithBlackFg: '#000000',   // black
  hasYellowBg: '#000000',           // black
  hasWhiteBgWithGreenFg: '#008000', // green
  hasBlackBgWithLimeFg: '#00FF00',  // lime
  hasKitchenSink: '#ff99ff'         // clean
}
*/
```

## API

### ContrastColor(defaults)

- #### defaults 

  `Optional`: `Object` with parameters to use.

  - ##### bgColor

    - `Optional` : `String` hex or named (e.g.`#ff0000`, `red`)
    - `Default`  : `#FFFFFF`

  - ##### fgDarkColor

    Is returned if `bgColor` is determined to be _light_

    - `Optional` : `String` hex or named (e.g.`#ff0000`, `red`)
    - `Default`  : `#000000`

  - ##### fgLightColor

    Is returned if `bgColor` is determined to be _dark_

    - `Optional` : `String` hex or named (e.g.`#ff0000`, `red`)
    - `Default`  : `#FFFFFF`

  - ##### defaultColor

    Is returned if `bgColor` is determined to be _invalid_

    - `Optional` : `String` hex or named (e.g.`#ff0000`, `red`)
    - `Default`  : `#000000`

  - ##### threshold

    - `Optional` : `Number` (0-255) used to adjust variance
    - `Default`  : `128`

  - ##### customNamedColors

    - `Optional` : `Object` used to override or add named colors (e.g. `{ blue: "#0074D9" }`)


### .contrastColor(options)

- #### options 

  `Requrired`: `Object` with parameters to use.

  - ##### bgColor

    - `Required` : `String` hex or named (e.g.`#ff0000`, `red`)

  - ##### fgDarkColor

    Is returned if `bgColor` is determined to be _light_

    - `Optional` : `String` hex or named (e.g.`#ff0000`, `red`)
    - `Default`  : `#000000`

  - ##### fgLightColor

    Is returned if `bgColor` is determined to be _dark_

    - `Optional` : `String` hex or named (e.g.`#ff0000`, `red`)
    - `Default`  : `#FFFFFF`

  - ##### defaultColor

    Is returned if `bgColor` is determined to be _invalid_

    - `Optional` : `String` hex or named (e.g.`#ff0000`, `red`)
    - `Default`  : `#000000`

  - ##### threshold

    - `Optional` : `Number` (0-255) used to adjust variance
    - `Default`  : `128`

  - ##### customNamedColors

    - `Optional` : `Object` used to override or add named colors (e.g. `{ blue: "#0074D9" }`)


## License

ISC © [Buster Collings]()


[npm-image]: https://badge.fury.io/js/contrast-color.svg
[npm-url]: https://npmjs.org/package/contrast-color
[travis-image]: https://travis-ci.com/busterc/contrast-color.svg?branch=master
[travis-url]: https://travis-ci.com/busterc/contrast-color
[daviddm-image]: https://david-dm.org/busterc/contrast-color.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/busterc/contrast-color
[coveralls-image]: https://coveralls.io/repos/busterc/contrast-color/badge.svg
[coveralls-url]: https://coveralls.io/r/busterc/contrast-color
