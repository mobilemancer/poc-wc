import typescript from 'rollup-plugin-typescript2';
import html from 'rollup-plugin-html';
import { libStylePlugin, onwarn } from "rollup-plugin-lib-style"
import postcss from 'rollup-plugin-postcss';

export default {
    input: './src/main.ts',
    output: {
        file: './dist/main.js',
        format: 'es'
    },
    plugins: [
        postcss({
            extract: false,
            inject: false
        }),
        typescript({ exclude: "**/*.test.ts" }),
        html({
            include: "src/**/*.html",
        }),
    ]
};
