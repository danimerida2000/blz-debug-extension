/** @type {import('@babel/core').TransformOptions} */
export default {
    presets: [
        [
            '@babel/preset-env',
            {
                useBuiltIns: 'usage',
                corejs: 3,
                targets: {
                    browsers: ['> 0.25%', 'not dead', 'not ie 11', 'not op_mini all'],
                },
            },
        ],
        '@babel/preset-typescript',
    ],
    plugins: ['@babel/plugin-transform-optional-chaining'],
};
