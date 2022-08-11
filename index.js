const http = require('http');
const path = require('path');
const fs = require('fs');

const PORT = 8080;

function fileName(url) {
    //We remove the first character ('/') 
    let fileName = url.slice(1);
    switch (url) {
        case '/':
            fileName = 'index.html';
            break;
        case '/about':
            fileName = 'about.html';
            break;
        case '/contact-me':
            fileName = 'contact-me.html';
            break;
    } 
    return fileName;
}

const server = http.createServer((req, res) => {
    //Handle request here ...
    const reqUrl = req.url;
    console.log(fileName(reqUrl));
    res.end('Hello World!');
})

server.listen(PORT, () => console.log(`Server is listening on ${PORT} ...`));