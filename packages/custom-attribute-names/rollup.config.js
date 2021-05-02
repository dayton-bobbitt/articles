import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
    input: "src/my-component.js",
    output: {
        file: "dist/my-component.js",
        format: "es",
    },
    plugins: [
        nodeResolve(),
    ],
}