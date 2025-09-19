import packageJson from "./package.json" with {type: "json"}
export default {
    input: "dist/index.js",
    output: {
        file: `out/log4water-${packageJson.version}.js`,
        format: 'cjs'
    },
    plugins: []
};
