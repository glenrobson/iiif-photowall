// babel.config.js
/*module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
};*/

module.exports = {
    plugins: ['babel-plugin-styled-components'],
    presets: [
        [
            '@babel/preset-env',
            { "modules":"commonjs"}]]

};
