var path    = require('path');
var os      = require('os');
var fs      = require('fs');
var spawn   = require('child_process').spawn;
var exec    = require('child_process').exec;
var express = require('express');

var conf    = require("argsparser").parse();

var config = {
    documentRoot    : conf['-root'] || process.cwd(),
    port            : conf['-port'] || 7777
};
config.cmd = JSON.parse(fs.readFileSync(path.join(config.documentRoot,'cmd.json'),'utf-8')).cmd;

process.on('uncaughtException', function(err) {
    console.error('Caught exception: ', err);
});

var pidPath = path.join(os.tmpDir(), '.pipe2browser');
fs.writeFile(pidPath, process.pid);

process.on('SIGTERM', function() {
    fs.unlink(pidPath, function() {
        process.exit(0);
    });
});

process.title = 'pipe2browser';
var app = express();
app.use(app.router);

pipe2browser(app,config);

app.listen(config.port);

console.log('################################################');
console.log('server (pid: ' + process.pid + ') started! please visit http://127.0.0.1:' 
    + config.port + ' \ndocumentRoot is: ' + config.documentRoot);
console.log('################################################');

function pipe2browser(app, config) {
    app.get('/', function(req, res) {
        res.writeHead(200, {
            'Content-Type': 'text/html;charset=utf-8'
        });
        res.write('<script>window._timer_ = setInterval(function(){try{document.body.scrollTop = document.body.offsetHeight;}catch(e){}},20);</script><ul>', 'utf-8');
        res.write('<li style="color:blue;"> excute ' + config.cmd + ' ... </li>', 'utf-8');

        console.log(config.cmd);

        exec(config.cmd, function(error, stdout, stderr) {
            if (error) {
                stderr.toString().split('\n').forEach(function(line) {
                    line && res.write('<li style="color:red;">' + line + '</li>', 'utf-8');
                });
                res.end('</ul><script>clearInterval(window._timer_); document.body.scrollTop = document.body.offsetHeight;</script>', 'utf-8');
                throw error;
            }

            stdout.toString().split('\n').forEach(function(line) {
                line && res.write('<li style="color:green;">' + line + '</li>', 'utf-8');
            });
            res.end('</ul><script>clearInterval(window._timer_); document.body.scrollTop = document.body.offsetHeight;</script>', 'utf-8');
        });
    });
}