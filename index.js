/**
 * @file index
 * @author ienix(enix@foxmail.com)
 * 
 * @since 2018-7-9
 */

import fs from 'fs';

class HttpPushServerPlugin {
    constructor(option = {}) {
        let defaultOption = {
            to: '',
            dir: '',
            token: ''
        };

        option = Object.assign({}, defaultOption, option);

        this.init();
    }
    init() {
        
    }
}
