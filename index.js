const http = require('http');
const path = require('path');
const fs = require('fs');

const PORT = 8080;

function relativeFilePath(url) {
    //We remove the first character ('/') 
    let relativePath = url.slice(1);
    switch (url) {
        case '/':
            relativePath = 'index.html';
            break;
        case '/about':
            relativePath = 'about.html';
            break;
        case '/contact-me':
            relativePath = 'contact-me.html';
            break;
    } 
    return relativePath;
}

function filePath(relativeFilePath) {
    const PUBLIC_FOLDER = 'public';
    return path.join(__dirname, PUBLIC_FOLDER, relativeFilePath);
}

const server = http.createServer((req, res) => {
    //Handle request here ...
    const reqUrl = req.url;
    const fPath = filePath(relativeFilePath(reqUrl));
    const PAGE_NOT_FOUND = filePath('404.html');
    fs.readFile(fPath, (err, content) => {
        if (err) {
            //error handling ...
            if (err.code === "ENOENT") 
                //Page not found
                fs.readFile(PAGE_NOT_FOUND, (err, content) => {
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.end(content);
                });
            //Some other error
            else res.end(`server error: ${err.code}`);
        } else {
            //success
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(content);
        }
    });
})

server.listen(PORT, () => console.log(`Server is listening on ${PORT} ...`));