// const Person = require('./person');
// const person1 = new Person('shrey',20);
// person1.greetings();

// const Logger = require('./logger');
// const logger = new Logger();

// logger.on('message',data => console.log('Called Listener',data));

// logger.log('hello');

const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req,res) => {
    // if(req.url === '/')
    // {
    //     fs.readFile(path.join(__dirname,'public','index.html'),
    //     (err,content) => {
    //         if(err) throw err;
    //         res.writeHead(200, {'Content-Type': 'text/html'});
    //         res.end(content);
    //     });
    // }

    // if(req.url === '/about')
    // {
    //     fs.readFile(path.join(__dirname,'public','about.html'),
    //     (err,content) => {
    //         if(err) throw err;
    //         res.writeHead(200, {'Content-Type': 'text/html'});
    //         res.end(content);
    //     });
    // }
    // // incase we are fetching API instead of html
    // if(req.url === '/api/users')
    // {
    //     const users = [
    //         {name: 'Shrey Mehrotra', age: 20},
    //         {name: 'abc ', age: 40}
    //     ];
    //     res.writeHead(200, {'Content-Type': 'application/json'});
    //     res.end(JSON.stringify(users));
    // }
    let filePath = path.join(
        __dirname,
        'public',
        req.url === '/' ? 'index.html' : req.url
        );
    
    // extension name
    let extname = path.extname(filePath);

    // initial content type
    let contentType = 'text/html';

    // check extension and set content type
    switch(extname) {
        case '.js' :
            contentType = 'text/javascript';
            break;
        case '.css' :
            contentType = 'text/css';
            break;
        case '.json' :
            contentType = 'application/json';
            break;
        case '.jpg' :
            contentType = 'image/jpg';
            break;
        case '.png' :
            contentType = 'image/png';
            break;
    }

    // read file
    fs.readFile(filePath, (err,content) => {
        if(err){
            if(err.code == 'ENOENT'){
                // page not found
                fs.readFile(path.join(__dirname,'public','404.html'), (err, content) => {
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.end(content,'utf8');
                })
            }
            else{
                // Some server error
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        }
        else{
            // success
            res.writeHead(200, {'Content-Type': contentType});
            res.end(content,'utf8');
        }
    })
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));

