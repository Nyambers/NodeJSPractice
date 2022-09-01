const http = require('http');

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req,res) => {
    console.log(req.headers);

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('Hello, Achievers!');
    res.end('<h1>Hello World!</h1>');
})
server.listen(port, hostname, () => {
    console.log(`Check http://${hostname}:${port}`);
})