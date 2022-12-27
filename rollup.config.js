import typescript from 'rollup-plugin-typescript2';
import html from 'rollup-plugin-html';


export default {
    input: './src/main.ts',
    output: {
        file: './dist/main.js',
        format: 'es'
    },
    plugins: [
        typescript(),
        html({
            include: "src/**/*.html",
        }),
    ]
};
