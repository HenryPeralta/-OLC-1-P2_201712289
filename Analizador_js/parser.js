var fs = require('fs');
var parser = require('./analisadorlexico');

fs.readFile('./entrada.txt', (err, data) =>{
    if (err) throw err;
    parser.parse(data.toString());
    console.log(parser.lista_tokens);
});




