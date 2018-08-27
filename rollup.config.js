import babel from 'rollup-plugin-babel'
import { uglify } from 'rollup-plugin-uglify'
import { minify } from 'uglify-es'

export default {
    input: "lib/web-threads.js",
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
        uglify({},minify)
    ],
    output: [{
        name: "web-threads",
        format: "amd",
        file: "dist/web-threads-amd.js",
    },
    {
        name: "web-threads",
        format: "cjs",
        file: "dist/web-threads-cjs.js",
    },
    {
        name: "web-threads",
        format: "esm",
        file: "dist/web-threads-esm.js",
    },
    {
        name: "webThreads",
        format: "iife",
        file: "dist/web-threads-iife.js",
    },
    {
        name: "web-threads",
        format: "umd",
        file: "dist/web-threads-umd.js",
    }]
}
