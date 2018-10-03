const http = require('http');
const tlfi = require('./tlfi.json');

const server = http.createServer((req, res) => {
    let url = randomProperty(tlfi);
    res.writeHead(302, {
        'Location': encodeURI(url)
    });
    res.end();
});

const port = process.env.PORT || 3000;
server.listen(port);

let randomProperty = (obj) => {
    var keys = Object.keys(obj)
    return obj[keys[keys.length * Math.random() << 0]];
};
