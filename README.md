# Canvas Image Slider

A simple image slider built with HTML Canvas.

## Instructions

### Running the app

Download the contents of this repo to your machine and open the `dist/index.html` file in your browser. Given all assets are pre-compiled, you shouldn't need to run a server to see the slider in action.

Tested with latest versions Chrome and Edge.

### Slides data

The slider populates its slides from the data provided in `src/slides.js` and it expects a collection of objects with the following schema:

```ts
{
  height: number;
  id: string;
  url: string;
  width: number;
}
```

All attributes are mandatory in order for slider to work as expected. 

Images used in this example were taken from [https://thecatapi.com/](https://thecatapi.com/).

### Development mode; Building a release

This project was bootstrapped with `yarn` but it's not mandatory.

To install dependencies simply run `yarn`.

To start the app in dev mode (w/ watch mode) run `yarn start`.

To precompile all assets for a new release under `dist/` run `yarn build`.