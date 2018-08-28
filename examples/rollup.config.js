import babel from 'rollup-plugin-babel'

export default {
    input: "./examples/index.js",
    plugins: [
        babel({
            "presets": [
                [
                    "env",
                    {
                        "modules": false
                    }
                ]
            ],
            "babelrc": false,
        }),
    ],
    output: [{
        name: "index",
        format: "cjs",
        file: "examples/index-cjs.js",
    }]
}
