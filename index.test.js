const postcss = require('postcss');

const plugin = require('./');

async function run(input, output, opts = {}) {
  let result = await postcss([plugin(opts)]).process(input, {from: undefined});
  expect(result.css).toEqual(output);
  expect(result.warnings()).toHaveLength(0);
}

it('handles converting ::progress-bar', async () => {
  await run(
    `progress::progress-bar {
border: 2px solid blue
}`,
    `progress {
border: 2px solid blue
}
progress::-webkit-progress-bar {
border: 2px solid blue
}`, {});
});

it('handles converting ::progress-bar with "strict" to true', async () => {
  await run(
    `progress::progress-bar {
border: 2px solid blue
}`,
    `progress::-webkit-progress-bar {
border: 2px solid blue
}`, {strict: true});
});

it('handles converting ::progress-bar with "strict" to false', async () => {
  await run(
    `progress::progress-bar {
border: 2px solid blue
}`,
    `progress {
border: 2px solid blue
}
progress::-webkit-progress-bar {
border: 2px solid blue
}`, {strict: false});
});

it('handles converting ::progress-value', async () => {
  await run(
    `progress::progress-value {
background-color: red
}`,
    `progress::-webkit-progress-value {
background-color: red
}
progress::-moz-progress-bar {
background-color: red
}`, {});
});
