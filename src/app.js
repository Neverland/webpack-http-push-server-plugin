/**
 * @file index
 * @author ienix(enix@foxmail.com)
 * 
 * @since 2018-7-10
 */

const FS = require('fs');
const PATH = require('path');
const FSE = require('fs-extra');

let express = require('express');
let bodyParser = require('body-parser');

let app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/*+json' }));

app
    .post('/reciver', (request, response) => {
        let sourceData = [];
        request
            .setEncoding('utf8')
            .on('data', data => {
                sourceData.push(data);
            })
            .on('end', () => {
                let result = sourceData.join('');

                try {
                    result = JSON.parse(result);
                }
                catch (e) {
                    console.log(e, '`Parse JSON error`');
                    return response.sendStatus(500);
                }

                try {
                    let {content = '', path = '', resovlePath = ''} = result;
                    let dirPath = PATH.dirname(resovlePath);
                    let filePath = PATH.join(resovlePath);

                    if (!FS.existsSync(dirPath)) {
                        FSE.ensureDirSync(dirPath);
                    }

                    FS.writeFileSync(filePath, content, {encoding: 'utf8', flag: 'w'});

                    console.log('[OK] - The `%s` write success!', filePath);
                }
                catch(e) {
                    console.log(e, '`Write file error`');
                    return response.sendStatus(500);
                }

                response.sendStatus(200);
            });
    })
    .get('/reciver', (request, response) => {
        response.send('hello world!')
    });

app.listen(8899, () => {  
    console.log('Example app listening at 8899');
});
