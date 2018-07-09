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

export default {
    input: 'index.js',
    plugins: [
        babel({
            include: 'index.js',
            runtimeHelpers: false
        })
    ],
    name: 'webpack-http-push-server-plugin',
    output: {
        file: 'dist/index.js',
        format: 'umd',
    },
    external: [

    ],
    globals: {

    },
};
