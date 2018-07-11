# webpack-http-push-server-plugin

## webpack config
```javascript
 plugins: [
    new WebpackHttpPushServerPlugin({
        dir: '.',
        receiver: 'http://127.0.0.1:8899/reciver', // server reciver url
        to: '/home/work/{your project}/'
    })
]
```
## server reciver

1. Copy webpack-http-push-server-plugin/src/app.js to your server
2. npm i express && fs-extra && body-parser
3. node app.js
