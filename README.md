# postcss-progress-bar

[PostCSS] plugin for styling progress element.

[PostCSS]: https://github.com/postcss/postcss

```css
/* Before */
progress::progress-bar {
  border: 2px solid blue
}

progress::progress-value {
  background-color: red
}
```

```css
/* After */
progress {
  border: 2px solid blue
}

progress::-webkit-progress-bar {
  border: 2px solid blue
}

progress::-webkit-progress-value {
  background-color: red
}

progress::-moz-progress-bar {
  background-color: red
}
```

## Supported selectors

`::progress-bar` Styles the entire bar a `<progress>` element.

`::progress-value` Styles the filled-in portion of the bar of a `<progress>` element.

## Usage

**Step 1:** Install plugin:

```sh
npm install --save-dev postcss postcss-progress
# or
yarn add --save-dev postcss postcss-progress
```

**Step 2:** Check you project for existed PostCSS config: `postcss.config.js`
in the project root, `"postcss"` section in `package.json`
or `postcss` in bundle config.

If you do not use PostCSS, add it according to [official docs]
and set this plugin in settings.

**Step 3:** Add the plugin to plugins list:

```diff
module.exports = {
  plugins: [
+   require('postcss-progress-bar'),
    require('autoprefixer')
  ]
}
```

## Options

### `strict`

Type: `Boolean`

Default: `false`

Copies any rules with `::progress-bar` pseudo-elements to parent selector.

> If you want to select the unfinished part of `<progress>` in Mozilla, please select the `<progress>` directly.
>
> See: https://developer.mozilla.org/en-US/docs/Web/CSS/::-moz-progress-bar

`false`

```js
/* postcss.config.js */
module.exports = {
  plugins: [
    require('postcss-progress-bar')({strict: false})
  ]
}
```

```css
/* Before */
progress::progress-bar {
  border: 2px solid blue
}

/* After */
progress {
  border: 2px solid blue
}

progress::-webkit-progress-bar {
  border: 2px solid blue
}
```

`true`

```js
/* postcss.config.js */
module.exports = {
  plugins: [
    require('postcss-progress-bar')({strict: true})
  ]
}
```

```css
/* Before */
progress::progress-bar {
  border: 2px solid blue
}

/* After */
progress::-webkit-progress-bar {
  border: 2px solid blue
}
```

[official docs]: https://github.com/postcss/postcss#usage
