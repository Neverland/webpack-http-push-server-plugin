/**
 * @file index
 * @author ienix(enix@foxmail.com)
 * 
 * @since 2018-7-9
 */

import FS from 'fs';
import PATH from 'path';
import UTIL from 'util';

import chokidar from 'chokidar';
import request from 'request';

export default
class HttpPushServerPlugin {
    constructor(option = {}) {
        let defaultOption = {
            to: '',
            dir: ''
        };

        this.option = Object.assign({}, defaultOption, option);

        this.rootDir = PATH.join(process.cwd(), option.dir);

        if (!FS.existsSync(this.rootDir)) {
            throw new Error('[fatal] The target `dir` is not exists!');
        }

        this.watcher = null;

        this.createWatcher();
    }
    createWatcher() {
        this.watcher = chokidar.watch(this.option.dir, {
            persistent: true,
            ignored: /(^|[\/\\])\../,
            ignoreInitial: false,
            followSymlinks: true,
            cwd: '.',
            disableGlobbing: false,
        
            usePolling: true,
            interval: 100,
            binaryInterval: 300,
            alwaysStat: false,
            depth: 99,
            awaitWriteFinish: {
                stabilityThreshold: 2000,
                pollInterval: 100
            },
        
            ignorePermissionErrors: false,
            atomic: true // or a custom 'atomicity delay', in milliseconds (default 100)
        });
    }
    apply(compiler) {
        this.watcher
            .on('change', path => this.handler(path));
    }
    async handler(path) {
        let filePath = PATH.join(this.rootDir, path);
        let readFile = UTIL.promisify(FS.readFile);
        let payload = {};

        try {
            let content = await readFile(filePath, {encoding: 'utf8'});

            payload = {
                content,
                path,
                resovlePath: PATH.join(this.option.to, path)
            }
        }
        catch (e) {
            this.notifyError(e);
        }

        this.pushServer(payload);
    }
    pushServer(payload) {

        request.post({
            body: payload,
            url: this.option.receiver,
            json: true,
            timeout: 1500,
            headers: {
                'Content-Type': 'application/json'
            },
        },
             (error, response, body) => {
                if (error) {
                    return this.notifyError(error);
                }

                console.log(`[${body}] - [%s] Push file %s`, (new Date).toLocaleString(), payload.path);
            });
    }
    notifyError(e) {
        throw new Error(e);
    }
}
