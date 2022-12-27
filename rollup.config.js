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
    // onwarn,
    plugins: [
        // libStylePlugin({ extensions: ['.css'] }),
        postcss({
            extract: false,
            inject: false
        }),
        typescript(),
        html({
            include: "src/**/*.html",
        }),
    ]
};
