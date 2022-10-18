import babel from 'rollup-plugin-babel'

export default {
    input: "lib/web-threads.js",
    plugins: [
        babel()
    ],
    output: [
    {
        name: "web-threads",
        format: "cjs",
        file: "dist/web-threads.js",
    }]
}
