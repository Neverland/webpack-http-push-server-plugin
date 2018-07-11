/**
 * @file rollup
 * @author ienix(enix@foxmail.com)
 * 
 * @since 2018-7-9
 */

 /**
 * @file rollup.config
 * @author ienix(enix@foxmail.com)
 *
 * @since 2017/7/17
 */

import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import async from 'rollup-plugin-async';

export default {
    input: 'src/index.js',
    plugins: [
        babel({
            include: 'src/index.js',
            runtimeHelpers: false
        }),
        commonjs(),
        async()
    ],
    output: {
        file: 'dist/index.js',
        format: 'umd',
        name: 'webpack-http-push-server-plugin',
        globals: {
            chokidar: 'chokidar'
        }
    },
    external: [
        'chokidar',
        'fs',
        'path'
    ]
};


