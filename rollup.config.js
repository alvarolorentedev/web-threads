import babel from 'rollup-plugin-babel'
import { uglify } from 'rollup-plugin-uglify'
import { minify } from 'uglify-es'

export default {
    input: "lib/web-threads.js",
    plugins: [
        babel(),
        uglify({},minify)
    ],
    output: [
    {
        name: "web-threads",
        format: "cjs",
        file: "dist/web-threads.js",
    }]
}
